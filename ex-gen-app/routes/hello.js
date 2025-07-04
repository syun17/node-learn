const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('hello', { title: 'Hello', content: 'これはサブタイトルです' });
});

module.exports = router;
