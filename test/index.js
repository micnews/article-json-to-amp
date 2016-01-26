import test from 'ava';
import tsml from 'tsml';
import toAmp from '../dist';

test('first', t => {
  const data = [{
    type: 'paragraph',
    children: [
      { type: 'text', href: 'http://mic.com', content: 'link' },
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
        normal text<b>bold text</b><i>italic text</i>
      </p>
      <p>other text</p>
    </article>`
  );
});
