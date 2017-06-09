import { format } from 'util';
import serialize from 'serialize-javascript';
import Head from './head';

export default (markup, initialState, options) => {
  const { assets, webpackDevServerPort: port } = options;
  const { title, titleTemplate, metas, links, ga } = Head.rewind() || {};

  function asset(filename) {
    if (process.env.NODE_ENV === 'production') return assets[filename];
    return `http://localhost:${port}/${filename}`;
  }

  const engineScript = `<script>var __DATA__= ${serialize(initialState, {
    isJSON: true
  })};</script>`;

  const metaTags = (metas || [])
    .map(meta => {
      if (meta.charset) {
        return `<meta charset="${meta.charset}"/>`;
      } else if (meta.name) {
        return `<meta name="${meta.name}" content="${meta.content}"/>`;
      } else if (meta.httpEquiv) {
        return `<meta http-equiv="${meta.httpEquiv}" content="${meta.content}"/>`;
      } else if (meta.property) {
        return `<meta property="${meta.property}" content="${meta.content}"/>`;
      }
    })
    .join('');

  const linkTags = (links || [])
    .map(link => {
      if (link.type) {
        return `<link rel="${link.rel}" href="${link.href}" type="${link.type}"/>`;
      } else if (link.hreflang) {
        return `<link rel="${link.rel}" href="${link.href}" hreflang="${link.hreflang}"/>`;
      } else {
        return `<link rel="${link.rel}" href="${link.href}" />`;
      }
    })
    .join('');

  let htmlTitle = title;

  if (titleTemplate && title) {
    htmlTitle = format(titleTemplate, title);
  } else {
    htmlTitle = ''; // todo
  }

  let gaScript = '';

  if (ga && process.env.NODE_ENV === 'production') {
    gaScript = `
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', '${ga}', 'auto');
    </script>
    `;
  }

  const html = `
<!doctype html>
<html>
  <head>
    <title>${htmlTitle}</title>
    ${metaTags}
    ${linkTags}
    <link rel="stylesheet" href="${asset('client.css')}" type="text/css" />
  </head>
  <body>
    <div id="__cxx__">${markup}</div>
    ${engineScript}
    <script src="${asset('manifest.js')}"></script>
    <script src="${asset('vendors.js')}"></script>
    <script src="${asset('client.js')}"></script>
    ${gaScript}
  </body>
</html>`;

  return html;
};
