const mysql = require('mysql');
const db = require('../lib/db.js');
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

router.get('/create', (req, res, next) => {
  var title = '작성';
  var list = template.list('topic', req.topics);
  var author_cmbbox = template.author_cmbbox(req.authors);
  var description =
    `
      <h2>게시물 수정</h2>
      <form action="/topic/create" method="post">
        <p>
          <input type="text" name="title" placeholder="title">
        </p>
        <textarea name="description" placeholder="description"></textarea>
        <p>
          ${author_cmbbox}
        </p>
        <p>
          <input type="submit" value="게시">
        </p>
      </form>
    `;
  var addon = template.create_link('topic')
  var html = template.HTML(title, list, description, addon);
  res.send(html);
})

router.post('/create', (req, res, next) => {
  var data = qs.parse(req.body);
  var title = data.title;
  var description = data.description;
  var author_id = data.author_id;
  db.query('insert into topic (title, description, created, author_id) values (?, ?, now(), ?)', [title, description, author_id], (error, result, fields) => {
    res.redirect(`/topic/${result.insertId}`);
  })
})

router.post('/update', (req, res, next) => {
  var data = qs.parse(req.body);
  var id = data.id;
  db.query('select * from topic left join author on topic.author_id = author.id where topic.id = ?', [id], (error, post, fields) => {
    var list = template.list('topic', req.topics);
    var title = post[0].title;
    var article = post[0].description;
    var author_id = post[0].author_id;
    var author_cmbbox = template.author_cmbbox(req.authors, author_id);
    var description =
    `
      <form action="/topic/updating" method="post">
        <input type="hidden" name="id" value="${id}">
        <p>
          <input type="text" name="title" placeholder="title" value="${title}">
        </p>
        <textarea name="description" placeholder="description">${article}</textarea>
        <p>
          ${author_cmbbox}
        </p>
        <p>
          <input type="submit" value="게시">
        </p>
      </form>
    `;
    var addon = template.create_link('topic');
    var html = template.HTML('수정', list, description, addon);
    res.send(html);
  })
})

router.post('/updating', (req, res, next) => {
  var data = qs.parse(req.body);
  var id = data.id;
  var title = data.title;
  var description = data.description;
  var author_id = data.author_id;
  db.query('update topic set title = ?, description = ?, author_id = ? where id = ?', [title, description, author_id, id], (error, result, fields) => {
    res.redirect(`/topic/${id}`);
  })
})

router.post('/delete', (req, res, next) => {
  var data = qs.parse(req.body);
  var id = data.id;
  db.query('delete from topic where id = ?', [id], (error, result, fields) => {
    res.redirect(`/topic`);
  })
})

router.get('/:topicId', (req, res, next) => {
  var id = req.params.topicId;
  db.query('select * from topic left join author on topic.author_id = author.id where topic.id = ?', [id], (error, post, fields) => {
    var title = post[0].title;
    var list = template.list('topic', req.topics);
    var article = post[0].description;
    var created = post[0].created;
    var name = post[0].name;
    var author_id = post[0].author_id;
    var description =
      `
      <h2>${title}</h2>
      <h4>by <a href="/author/${author_id}/topics">${name}</a></h4>
      <h5>${created}</h5>
      <p>${article}</p>
      `;
    var addon = template.create_link('topic') + template.update_link('topic', id) + template.delete_link('topic', id);
    var html = template.HTML(title, list, description, addon);
    res.send(html);
  })
})

router.get('/', (req, res, next) => {
  var title = '게시판'
  var list = template.list('topic', req.topics);
  var description =
    `
      <h2></h2>
      <p></p>
    `;
  var addon = template.create_link('topic')
  var html = template.HTML(title, list, description, addon);
  res.send(html);
})

module.exports = router;
