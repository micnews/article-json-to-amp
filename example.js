/* eslint-disable */
const convertToAmp = require('./');

const article = [
  {
    type: 'paragraph',
    children: [
      {
        type: 'text',
        content: 'This is the text and '
      },
      {
        type: 'text',
        bold: true,
        content: 'some bold text '
      },
      {
        type: 'text',
        href: 'http://example.com',
        content: 'some link'
      }
    ]
  },
  {
    type: 'embed',
    embedType: 'image',
    src: 'http://files.mic.com/site-pages/texas/hero.jpg',
    width: 300,
    height: 150
  },
  {
    type: 'embed',
    embedType: 'tumblr',
    did: '7c08ba46cb75162284770cdee2a59365891a5e18',
    url: 'https://embed.tumblr.com/embed/post/8_SX4ALNOf1fYyEcjq78YQ/147291233392',
    text: []
  }
];

const amp = `
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <link rel="canonical" href="hello-world.html" >
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    ${convertToAmp(article)}
  </body>
</html>
`;

console.log(amp);
