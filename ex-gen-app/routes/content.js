const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('mydb.db');

router.get('/', (req, res, next) => {
    db.serialize(() => {
        db.all('select * from mydata', (err, rows) => {
            if (!err){
                var data = {
                    title: '授業の内容',
                    content: rows
                };
            }
            res.render('content/index', data);
        });
    });
});

router.get('/add', (req, res, next) => {
    var data = {
        title: '授業日報の追加',
        content: '新しい授業日報の追加'
    };
    res.render('content/add', data);
});

router.post('/add', (req, res, next) => {
    const name = req.body.name;
    const month = req.body.month;
    const day = req.body.day;
    const subject = req.body.subject;
    const content = req.body.content;
    db.serialize(() => {
        db.run('insert into mydata (name, month, day, subject, content) values (?, ?, ?, ?, ?)',
            [name, month, day, subject, content]);
    });
    res.redirect('/content');
});

router.get('/edit', (req, res, next) => {
    const id = req.query.id;
    db.serialize(() => {
        const p = 'select * from mydata where id = ?';
        db.get(p, [id], (err, row) => {
            if (!err) {
                var data = {
                    title: '授業日報の編集',
                    content: row
                };
                res.render('content/edit', data);
            }
        });
    });
});

router.post('/edit', (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const month = req.body.month;
    const day = req.body.day;
    const subject = req.body.subject;
    const content = req.body.content;
    db.serialize(() => {
        db.run('update mydata set name = ?, month = ?, day = ?, subject = ?, content = ? where id = ?',
            [name, month, day, subject, content, id]);
    });
    res.redirect('/content');
});

module.exports = router;
