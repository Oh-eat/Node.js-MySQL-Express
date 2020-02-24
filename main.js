const express = require('express');
const app = express();
const mysql = require('mysql');
const db = require('./lib/db.js');
const template = require('./lib/template.js');
const indexRouter = require('./routes/index.js');
const topicRouter = require('./routes/topic.js');
const authorRouter = require('./routes/author.js');
const port = 3000

app.use('*', (req, res, next) => {
  var body = '';
  req.on('data', (data) => {
    body += data;
  });
  req.on('end', () => {
    req.body = body;
    next();
  });
});

app.use('/topic', topicRouter);
app.use('/author', authorRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
  res.status(404).send('<h1>404 Not Found</h1>')
});

app.use((error, req, res, next) => {
  res.status(500).send('<a href="/"></a>')
});

app.listen(port);
