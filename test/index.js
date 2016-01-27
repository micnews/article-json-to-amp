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
        <br></br>
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
