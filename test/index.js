import test from 'ava';
import tsml from 'tsml';
import toAmp from '../dist';

test('paragraphs', t => {
  const data = [{
    type: 'paragraph',
    children: [
      { type: 'text', href: 'http://mic.com', content: 'link' },
      { type: 'linebreak' },
      { type: 'text', content: 'normal text' },
      { type: 'text', bold: true, content: 'bold text' },
      { type: 'text', italic: true, content: 'italic text' }
    ]
  }, {
    type: 'paragraph',
    children: [
      { type: 'text', content: 'other text' }
    ]
  }];

  t.is(toAmp(data), tsml
    `<article>
      <p>
        <a href="http://mic.com">link</a>
        <br/>
        normal text<b>bold text</b><i>italic text</i>
      </p>
      <p>other text</p>
    </article>`
  );
});

test('embeds', t => {
  const data = [{
    type: 'paragraph',
    children: [
      { type: 'text', content: 'normal text' }
    ]
  }, {
    type: 'embed',
    embedType: 'youtube',
    youtubeId: 'abc'
  }, {
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200
  }];

  t.is(toAmp(data), tsml
    `<article>
      <p>normal text</p>
      <figure>
        <amp-youtube data-videoid="abc" layout="responsive" width="480" height="270"></amp-youtube>
      </figure>
      <figure>
        <amp-img width="600" height="200" layout="responsive" src="http://example.com/image.jpg"></amp-img>
      </figure>
    </article>`
  );
});

test('image with caption', t => {
  const data = [{
    type: 'embed',
    embedType: 'image',
    src: 'http://example.com/image.jpg',
    width: 600,
    height: 200,
    caption: [{
      type: 'text',
      content: 'Source: ',
      href: null,
      italic: false,
      bold: false
    }, {
      type: 'text',
      content: 'Author',
      href: 'http://example.com/author',
      italic: false,
      bold: false
    }]
  }];

  t.is(toAmp(data), tsml
    `<article>
      <figure>
        <amp-img width="600" height="200" layout="responsive" src="http://example.com/image.jpg"></amp-img>
        <figcaption>Source: <a href="http://example.com/author">Author</a></figcaption>
      </figure>
    </article>`
  );
});

test('blockquote', t => {
  const data = [{
    type: 'blockquote',
    children: [{
      type: 'paragraph',
      children: [{
        type: 'text',
        content: 'abc'
      }]
    }, {
      type: 'paragraph',
      children: [{
        type: 'text',
        content: 'def',
        bold: true
      }]
    }]
  }];

  t.is(toAmp(data), tsml
    `<article>
      <blockquote>
        <p>abc</p>
        <p><b>def</b></p>
      </blockquote>
    </article>`
  );
});

test('custom secure iframe', t => {
  const data = [{
    type: 'embed',
    embedType: 'custom',
    src: 'https://example.com/frame',
    width: 600,
    height: 200,
    secure: true,
    caption: []
  }];

  t.is(toAmp(data), tsml
    `<article>
      <figure>
        <amp-iframe width="600" height="200" layout="responsive" frameborder="0" src="https://example.com/frame"></amp-iframe>
      </figure>
    </article>`
  );
});

test('custom non-secure iframe', t => {
  const data = [{
    type: 'embed',
    embedType: 'custom',
    src: 'http://example.com/frame',
    width: 600,
    height: 200,
    secure: false,
    caption: []
  }];

  t.is(toAmp(data), `<article><figure></figure></article>`);
});
