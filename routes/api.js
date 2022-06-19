const express = require('express');

const Datastore = require('nedb');
const nanoid = require('nanoid');
const { URL } = require('url');

const app = express.Router();

app.use(express.json());

const db = new Datastore({
    filename: './tmp.db',
    autoload: true
});

app.use((req, res, next) => {
    console.log('Url', new URL(req.url, `http://${req.headers.host}`));
    console.log('Body', req.body);

    return next();
})

app.post('/store', (req, res, nxt) => {
    return res.json(req.body);
});

app.get('/list', (req, res, nxt) => {
    return db.find({}, (err, docs) => {
        if (err) {
            return nxt();
        } else {
            return res.json(docs);
        }
    });
});

app.get('/:id', (req, res, next) => {
    if(!req.params.id) return next();

    return db.findOne({ slug: req.params.id }, (err, doc) => {
        if (err || !doc) {
            if (err) return res.sendStatus(502)
            return res.sendStatus(400);
        } else {
            return res.redirect(doc['full_url']);
        }
    });
});

app.use((req, res) => {
    return res.sendStatus(418);
});

module.exports = app;