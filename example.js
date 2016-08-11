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
    src: 'http://example/image.jpg',
    width: 300,
    height: 150
  }
];

console.log(convertToAmp(article)); // eslint-disable-line
