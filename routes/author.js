const mysql = require('mysql');
const db = require('../lib/db.js')
const express = require('express');
const router = express.Router();
const template = require('../lib/template.js')
const qs = require('querystring');

router.use('*', (req, res, next) => {
  db.query('select id, title from topic', (error, topics, fields) => {
    if (error){
      next(error);
    };
    req.topics = topics;
    next();
  });
})
router.use('*', (req, res, next) => {
  db.query('select * from author', (error, authors, fields) => {
    if (error){
      next(error);
    };
    req.authors = authors;
    next();
  });
});

router.post('/create', (req, res, next) => {
  var data = qs.parse(req.body);
  var name = data.name;
  var profile = data.profile;
  db.query('insert into author (name, profile) values (?, ?)', [name, profile], (error, result, fields) => {
    if (error){
      next(error);
    };
    res.redirect('/author');
  });
});

router.post('/delete', (req, res, next) => {
  var data = qs.parse(req.body);
  var id = data.id;
  db.query('delete from author where id = ?', [id], (error, result, fields) => {
    if (error){
      next(error);
    };
    res.redirect('/author');
  });
});

router.post('/update', (req, res, next) => {
  var data = qs.parse(req.body);
  var id = data.id;
  db.query('select * from author where id = ?', [id], (error, author, fields) => {
    var title = '수정';
    var author_table = template.author_table(req.authors);
    var description = `<h2>작가 수정</h2>`;
    var name = author[0].name;
    var profile = author[0].profile;
    var addon =
    `
      <form action="/author/updating" method="post">
        <input type="hidden" name="id" value="${id}">
        <p>
          <input type="text" name="name" placeholder="name" value="${name}">
        </p>
          <textarea name="profile" placeholder="profile">${profile}</textarea>
        <p>
          <input type="submit" value="수정">
        </p>
      </form>
    `;
    var html = template.HTML(title, author_table, description, '', addon);
    res.send(html);
  })
});

router.post('/updating', (req, res, next) => {
  var data = qs.parse(req.body);
  var id = data.id;
  var name = data.name;
  var profile = data.profile;
  db.query('update author set name = ?, profile = ? where id = ?', [name, profile, id], (error, result, fields) => {
    res.redirect('/author');
  });
});

router.get('/:authorId/topics', (req, res, next) => {
  var id = req.params.authorId;
  db.query('select id, title, created from topic where author_id = ?', [id], (error, topics, fields) => {
    db.query('select name from author where id = ?', [id], (error, author, fields) => {
      var title = '작가별 게시물';
      var author_table = template.author_table(req.authors);
      var description = `<h2>${author[0].name}의 게시물 목록</h2>`;
      var addon = template.author_topics(topics);
      var html = template.HTML(title, author_table, description, '', addon);
      res.send(html);
    })
  });
});

router.get('/', (req, res, next) => {
  var title = '작가';
  var author_table = template.author_table(req.authors);
  var description = `<h2>새로운 작가</h2>`;
  var addon =
    `
      <form action="/author/create" method="post">
        <p>
          <input type="text" name="name" placeholder="name">
        </p>
        <textarea name="profile" placeholder="profile"></textarea>
        <p>
          <input type="submit" value="추가">
        </p>
      </form>
    `;
  var html = template.HTML(title, author_table, description, '', addon);
  res.send(html);
});

module.exports = router;
