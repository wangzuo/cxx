import serialize from 'serialize-javascript';
import Head from './head';

export default (markup, initial, assets) => {
  const head = Head.renderStatic();
  const data = serialize(initial, { isJSON: true });

  const html = `<!doctype html>
  <html>
    <head>
      ${head.title.toString()}
      ${head.meta.toString()}
      ${head.link.toString()}
      ${assets['client.css']
        ? `<link rel="stylesheet" href="${assets[
            'client.css'
          ]}" type="text/css" />`
        : ''}
      </head>
    <body ${head.bodyAttributes.toString()}>
      <div id="__cxx__">${markup}</div>
      <script>var __DATA__= ${data};</script>
      ${assets['manifest.js']
        ? `<script src="${assets['manifest.js']}"></script>`
        : ''}
      ${assets['vendors.js']
        ? `<script src="${assets['vendors.js']}"></script>`
        : ''}
      ${assets['client.js']
        ? `<script src="${assets['client.js']}"></script>`
        : ''}
      ${head.script.toString()}
    </body>
  </html>`;

  return html;
};
