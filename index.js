'use strict';

var md = require('markdown-it')('commonmark');
const path = require('path')
const fs = require('hexo-fs')
const STYLE_PATH = path.resolve(__dirname, './style.css')

hexo.extend.filter.register('before_post_render', function (data) {
  const style_content = fs.readFileSync(STYLE_PATH).toString()

  let strRegExp = '(?<=^\n)(^!!! *)(note|info|todo|warning|attention|caution|failure|missing|fail|error)(.*\n)((^ {4}.*\n|^\n)+)';
  let admonitionRegExp = new RegExp(strRegExp, 'gmi');

  let strData;
  if (admonitionRegExp.test(data.content)) {

    strData = data.content.replace(admonitionRegExp, function (matchStr, p1, p2, p3, p4) {

      p4 = p4.split(/\n|\r|\r\n/);
      let admonitionContent = '';
      for (const v of p4) {
        admonitionContent += v.trim() + '\n';
      }

      if (p3.replace(/\s+/g, '') === '""') {
        return '<style>' + style_content + '</style>\n\n' + 
               '<div class="admonition ' + p2.toLowerCase() + '">' + md.render(admonitionContent) + '</div>\n\n';
      } else {
        p3 = p3.trim() === '' ? p2 : p3.replace(/(^ |")|("| $)/g, '');
        return '<style>' + style_content + '</style>\n\n' +  
               '<div class="admonition ' + p2.toLowerCase() + '"><p class="admonition-title">' + p3 + '</p>' + md.render(admonitionContent) + '</div>\n\n';
      }
    });
    data.content = strData;
  }

  return data;
});
