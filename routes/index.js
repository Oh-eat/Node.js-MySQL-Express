const express = require('express');
const router = express.Router();
const template = require('../lib/template.js')

router.get('*', (req, res, next) => {
  var title = '홈';
  var description =
    `
      <h2>환영합니다</h2>
      <p>Node.js & MySQL & Express</p>
    `;
  var html = template.HTML(title, '', description);
  res.send(html);
})

module.exports = router;
