var md = require('markdown-it')('commonmark');

hexo.extend.filter.register('before_post_render', function (data) {
  let strRegExp = '(?<=^\n)(^!!! *)(note|info|todo|warning|attention|caution|failure|missing|fail|error)(.*\n)((^ {4}.*\n|^\n)+)';
  let admonitionRegExp = new RegExp(strRegExp, 'gmi');

  let strData;
  if (admonitionRegExp.test(data.content)) {

    strData = data.content.replace(admonitionRegExp, function (matchStr, p1, p2, p3, p4) {

      p4 = p4.split(/\n|\r|\r\n/);

      let admonitionContent = '';
      for (const v of p4) {
        admonitionContent += v.trim();
        admonitionContent += '\n';
      }

      if (p3.replace(/\s+/g, '') === '""' || p3.replace(/\s+/g, '') === '') {
        return '<div class="admonition ' + p2.toLowerCase() + '">' + md.render(admonitionContent) + '</div>\n\n';
      } else {
        p3 = p3.trim() === '' ? p2 : p3.replace(/(^ |")|("| $)/g, '');
        return '<div class="admonition ' + p2.toLowerCase() + '"><p class="admonition-title">' + p3 + '</p>' + md.render(admonitionContent) + '</div>\n\n';
      }
    });
    data.content = strData;
  }

  return data;
});
