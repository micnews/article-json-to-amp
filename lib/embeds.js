import React from 'react';

function renderImage(props) {
  const width = props.width || 0;
  const height = props.height || 0;
  const src = props.src;

  if (!src || !width || !height) {
    return '';
  }

  return <amp-img width={width} height={height} layout='responsive' src={src} />;
}

renderImage.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  src: React.PropTypes.string
};

function renderYoutube(props) {
  const youtubeId = props.youtubeId;

  return (<amp-youtube
    data-videoid={youtubeId}
    layout='responsive'
    width={480} height={270}
  />);
}

renderYoutube.propTypes = {
  youtubeId: React.PropTypes.string
};

function renderFacebook(props) {
  const { url, embedAs } = props;

  if (embedAs === 'post') {
    return (<amp-facebook
      width={486}
      height={657}
      layout='responsive'
      data-embed-as='post'
      data-href={url}
    />);
  }

  if (embedAs === 'video') {
    return (<amp-facebook
      width={480}
      height={270}
      layout='responsive'
      data-embed-as='video'
      data-href={url}
    />);
  }

  return '';
}

renderFacebook.propTypes = {
  url: React.PropTypes.string,
  embedAs: React.PropTypes.string
};

function renderTwitter(props) {
  const { id } = props;

  return (<amp-twitter
    width={486}
    height={657}
    layout='responsive'
    data-tweetid={id}
    data-cards='hidden'
  />);
}

renderTwitter.propTypes = {
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

function renderVine(props) {
  const { id } = props;
  return (<amp-vine
    width='400'
    height='250'
    layout='responsive'
    data-vineid={id}
  />);
}

renderVine.propTypes = {
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

function renderInstagram(props) {
  const { id } = props;

  return (<amp-instagram
    data-shortcode={id}
    width={400}
    height={400}
    layout='responsive'
  />);
}

renderInstagram.propTypes = {
  id: React.PropTypes.string
};

function renderSpotify(props) {
  const { url } = props;

  // AMP adds sandbox attribute to iframes which breaks
  // Spotify large embeds that include the playlist. Only
  // small (Wx80) embeds are supported for now.
  return (<amp-iframe
    width='auto'
    height={80}
    layout='fixed-height'
    frameborder={0}
    src={url}
  />);
}

renderSpotify.propTypes = {
  url: React.PropTypes.string
};

function renderCustom(props) {
  const { src, width, height, secure } = props;

  // AMP doesn't allow relative-url iframes,
  // always embed them as https
  const secureSrc = src.slice(0, 2) === '//'
    ? (`https:${src}`) : src;

  if (secure) {
    return (<amp-iframe
      width={width}
      height={height}
      layout='responsive'
      frameborder={0}
      src={secureSrc}
    />);
  }

  /* replace with the link ? */
  // return <a href={src} target='_blank'>Load content in new window</a>;

  return '';
}

renderCustom.propTypes = {
  src: React.PropTypes.string,
  width: React.PropTypes.number,
  height: React.PropTypes.height,
  secure: React.PropTypes.bool
};

function renderTumblr(props) {
  const { url, text } = props;
  const href = text[0] && text[0].href ? text[0].href : url;

  // There is no other way to show tumblr posts currently
  return (<a
    target='_blank'
    rel='noopener noreferrer'
    className='tumblr-post'
    href={href}
  >{href}</a>);
}

renderTumblr.propTypes = {
  url: React.PropTypes.string,
  text: React.PropTypes.array
};

const types = {
  image: renderImage,
  youtube: renderYoutube,
  facebook: renderFacebook,
  twitter: renderTwitter,
  vine: renderVine,
  instagram: renderInstagram,
  spotify: renderSpotify,
  tumblr: renderTumblr,
  custom: renderCustom
};

export default types;
