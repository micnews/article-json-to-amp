// Should work with window object defined in node
import './helpers/set-window';
import test from 'ava';
import tsml from 'tsml';
import 'babel-core/register';
import toAmp from '../lib';

test('blocks', t => {
  const data = [{
    type: 'paragraph',
    children: [
      { type: 'text', href: 'http://mic.com', content: 'link' },
      { type: 'linebreak' },
      { type: 'text', content: 'normal text' },
      { type: 'text', bold: true, content: 'bold text' },
      { type: 'text', italic: true, content: 'italic text' },
      { type: 'text', mark: true, content: 'marked text' },
      { type: 'text', mark: true, markClass: 'marker1' }
    ]
  }, {
    type: 'paragraph',
    children: [
      { type: 'text', content: 'other text' }
    ]
  }, {
    type: 'header3',
    children: [
      { type: 'text', content: 'header text' }
    ]
  }, {
    type: 'paragraph',
    children: [
      { type: 'text', mark: true }
    ]
  }];

  t.is(toAmp(data), tsml
    `<article>
      <p>
        <a href="http://mic.com">link</a>
        <br/>
        normal text<b>bold text</b><i>italic text</i>
        <mark>marked text</mark>
        <mark class="marker1"></mark>
      </p>
      <p>other text</p>
      <h3>header text</h3>
      <p><mark></mark></p>
    </article>`
  );
});

test('headers', t => {
  const data = [{
    type: 'header1',
    children: [{ type: 'text', content: 'header1' }]
  }, {
    type: 'header2',
    children: [{ type: 'text', content: 'header2' }]
  }, {
    type: 'header3',
    children: [{ type: 'text', content: 'header3' }]
  }, {
    type: 'header4',
    children: [{ type: 'text', content: 'header4' }]
  }, {
    type: 'header5',
    children: [{ type: 'text', content: 'header5' }]
  }, {
    type: 'header6',
    children: [{ type: 'text', content: 'header6' }]
  }];

  t.is(toAmp(data), tsml
    `<article>
      <h1>header1</h1>
      <h2>header2</h2>
      <h3>header3</h3>
      <h4>header4</h4>
      <h5>header5</h5>
      <h6>header6</h6>
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
  }, {
    type: 'embed',
    embedType: 'spotify',
    url: 'https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf',
    height: 80
  }, {
    type: 'embed',
    embedType: 'spotify',
    url: 'https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf',
    height: 380
  }, {
    type: 'embed',
    caption: [],
    embedType: 'tidal',
    dataId: '123456789',
    dataType: 'v'
  }, {
    type: 'embed',
    caption: [],
    embedType: 'tumblr',
    did: '7c08ba46cb75162284770cdee2a59365891a5e18',
    url: 'https://embed.tumblr.com/embed/post/8_SX4ALNOf1fYyEcjq78YQ/147291233392',
    text: [{
      content: 'http://jencita.tumblr.com/post/147291233392/tswiftdaily-taylor-swift-at-lady-cilento',
      href: 'http://jencita.tumblr.com/post/147291233392/tswiftdaily-taylor-swift-at-lady-cilento'
    }]
  }, {
    type: 'embed',
    caption: [],
    embedType: 'tumblr',
    did: '7c08ba46cb75162284770cdee2a59365891a5e18',
    url: 'https://embed.tumblr.com/embed/post/8_SX4ALNOf1fYyEcjq78YQ/147291233392',
    text: []
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
      <figure>
        <amp-iframe width="auto" height="80" layout="fixed-height" frameborder="0" src="https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf"></amp-iframe>
      </figure>
      <figure>
        <amp-iframe width="auto" height="80" layout="fixed-height" frameborder="0" src="https://embed.spotify.com/?uri=spotify:user:spotify:playlist:3rgsDhGHZxZ9sB9DQWQfuf"></amp-iframe>
      </figure>
      <figure>
        <a target="_blank" class="tidal-embed" href="https://listen.tidal.com/video/123456789">https://listen.tidal.com/video/123456789</a>
      </figure>
      <figure>
        <a target="_blank" class="tumblr-post" href="http://jencita.tumblr.com/post/147291233392/tswiftdaily-taylor-swift-at-lady-cilento">http://jencita.tumblr.com/post/147291233392/tswiftdaily-taylor-swift-at-lady-cilento</a>
      </figure>
      <figure>
        <a target="_blank" class="tumblr-post" href="https://embed.tumblr.com/embed/post/8_SX4ALNOf1fYyEcjq78YQ/147291233392">https://embed.tumblr.com/embed/post/8_SX4ALNOf1fYyEcjq78YQ/147291233392</a>
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

test('custom relative-url secure iframe', t => {
  const data = [{
    type: 'embed',
    embedType: 'custom',
    src: '//example.com/frame',
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

test('ad', t => {
  const data = [{
    type: 'embed',
    embedType: 'ad',
    network: 'doubleclick',
    width: 300,
    height: 250,
    slot: '123456/commander-keen',
    json: {targeting: {aSlot: '0'}},
    dataMultiSize: '300x250'
  }];

  const actual = toAmp(data);
  const expected = tsml`
    <article>
      <figure>
        <amp-ad width="300" height="250" type="doubleclick" data-slot="123456/commander-keen" json='{"targeting":{"aSlot":"0"}}' data-multi-size="300x250"></amp-ad>
      </figure>
    </article>`;

  t.is(actual, expected);
});
