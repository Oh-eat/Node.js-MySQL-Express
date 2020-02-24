module.exports = {
  HTML: (title, desc) => {
    return `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>WEB - ${title}</title>
                <link rel="stylesheet" href="/style/style.css">
              </head>
              <body>
                <h1 id="header"><a href="/">WEB</a></h1>
                <div id="body">
                  <div id="nav">
                    <a href="/">홈</a>
                    <a href="/topic">게시판</a>
                    <a href="/author">이용자</a>
                  </div>
                  <div id="desc">
                    ${desc}
                  </div>
                </div>
              </body>
            </html>`;
  }, list: (type, items) => {
    var value = (type === 'topic') ? 'title' : 'author';
    var list = '';
    for (var i in items){
      list += `<li><a href="/${type}/${items[i].id}">${items[i][value]}</a></li>`
    };
    return '<ul>' + list + '</ul>';
  }, author_cmbbox: (authors, selected) => {
    var cmbbox = '';
    for (var i in authors){
      cmbbox += `<option value="${authors[i].id}" ${(authors[i].id === selected) ? 'selected' : ''}>${authors[i].name}</option>`
    }
    return '<select name="author_id">' + cmbbox + '</select>'
  }, author_table: (authors) => {
      var table_caption = ['별명', '프로필', '게시물', '수정', '삭제'];
      var table =
        `
          <style>
            table {
              border-collapse: collapse;
            }

            td {
              border: 1px solid black;
            }
          </style>
          <p></p>
        `;
      table += '<tr>'
      for (var i in table_caption){
        table += `<td class="center">${table_caption[i]}</td>`
      };
      table += '</tr>'
      for (var i in authors) {
        table += '<tr>'
        table += `<td>${authors[i].name}</td>`
        table += `<td>${authors[i].profile}</td>`
        table += `<td class="center"><a class="blue" href="/author/${authors[i].id}/topics">보기</a></td>`
        table += `<td class="center"><form action="/author/update" method="post"><input type="hidden" name="id" value="${authors[i].id}"><input type="submit" value="수정"></form></a></td>`
        table += `<td class="center"><form action="/author/delete" method="post"><input type="hidden" name="id" value="${authors[i].id}"><input type="submit" value="삭제"></form></a></td>`
        table += `</tr>`
      };
      return '<table>' + table + '</table>';
  }, author_topics: (topics) => {
    var result = '';
    if (topics.length === 0){
      return '<ul class="italic"><li>게시물 없음</li></ul>'
    } else {
      for (var i in topics){
        result += `<li><p><a class="blue" href="/topic/${topics[i].id}">${topics[i].title}</a></p><p>${topics[i].created}</p></li>`;
      };
      return '<ol>' + result + '</ol>';
    };
  }, create_link: (type) => {
    return `
      <form action="/${type}/create" class="cud">
        <input type="submit" value="작성">
      </form>
    `;
  }, update_link: (type, id='') => {
    return `
      <form action="/${type}/update" method="post" class="cud">
        <input type="hidden", name="id" value="${id}">
        <input type="submit" value="수정">
      </form>
    `;
  }, delete_link: (type, id='') => {
    return `
      <form action="/${type}/delete" method="post" class="cud">
        <input type="hidden", name="id" value="${id}">
        <input type="submit" value="삭제">
      </form>
    `;
  }
};
