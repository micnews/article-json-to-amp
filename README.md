## article-json-to-amp
Render article in the [AMP](https://github.com/ampproject/amphtml) format

## Usage

```
npm install article-json-to-amp
```

```js
const convertToAmp = require('article-json-to-amp');
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

console.log(convertToAmp(article));
```

outputs:

```html
<article>
  <p>This is the text and <b>some bold text </b><a href="http://example.com">some link</a></p>
  <figure>
    <amp-img width="300" height="150" layout="responsive" src="http://example/image.jpg"></amp-img>
  </figure>
</article>
```

### Rendering HTML articles

HTML article can be parsed into structured format expected by this module using [html-to-article-json](https://github.com/micnews/html-to-article-json).

## License

MIT
