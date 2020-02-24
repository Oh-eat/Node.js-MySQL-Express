module.exports = {
  HTML: (title, list, description, addon1='', addon2='') => {
    return `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>WEB - ${title}</title>
              </head>
              <body>
                <h1><a href="/">WEB</a></h1>
                <a href="/">홈</a>
                <a href="/topic">게시판</a>
                <a href="/author">작가</a>
                ${list}
                ${addon1}
                ${description}
                ${addon2}
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
      table += '<td>별명</td>'
      table += '<td>프로필</td>'
      table += '<td>게시물</td>'
      table += '<td>수정</td>'
      table += '<td>삭제</td>'
      table += '</tr>'
      for (var i in authors) {
        table += '<tr>'
        table += `<td>${authors[i].name}</td>`
        table += `<td>${authors[i].profile}</td>`
        table += `<td><a href="/author/${authors[i].id}/topics">게시물</a></td>`
        table += `<td><form action="/author/update" method="post"><input type="hidden" name="id" value="${authors[i].id}"><input type="submit" value="수정"></form></a></td>`
        table += `<td><form action="/author/delete" method="post"><input type="hidden" name="id" value="${authors[i].id}"><input type="submit" value="삭제"></form></a></td>`
        table += `</tr>`
      };
      return '<table>' + table + '</table>';
  }, author_topics: (topics) => {
    var result = '';
    for (var i in topics){
      result += `<li><p><a href="/topic/${topics[i].id}">${topics[i].title}</a></p><p>${topics[i].created}</p></li>`;
    };
    return '<ol>' + result + '</ol>';
  }, create_link: (type) => {
    return `
      <form action="/${type}/create" class="cud">
        <input type="submit" value="작성">
      </form>
    `;
  }, update_link: (type, id) => {
    return `
      <form action="/${type}/update" method="post" class="cud">
        <input type="hidden", name="id" value="${id}">
        <input type="submit" value="수정">
      </form>
    `;
  }, delete_link: (type, id) => {
    return `
      <form action="/${type}/delete" method="post" class="cud">
        <input type="hidden", name="id" value="${id}">
        <input type="submit" value="삭제">
      </form>
    `;
  }
};
