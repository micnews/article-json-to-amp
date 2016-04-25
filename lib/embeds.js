import { requireHack } from './deku';
const element = requireHack('magic-virtual-element');

function renderImage (props) {
  const width = props.width || 0;
  const height = props.height || 0;
  const src = props.src;

  if (!src || !width || !height) {
    return '';
  }

  return <amp-img width={width} height={height} layout='responsive' src={src}></amp-img>;
}

function renderYoutube (props) {
  const youtubeId = props.youtubeId;

  return (<amp-youtube
    data-videoid={youtubeId}
    layout='responsive'
    width={480} height={270}></amp-youtube>);
}

function renderFacebook (props) {
  const { url, embedAs } = props;

  if (embedAs === 'post') {
    return (<amp-facebook width={486} height={657}
      layout='responsive' data-embed-as='post'
      data-href={url}></amp-facebook>);
  }

  if (embedAs === 'video') {
    return (<amp-facebook width={480} height={270}
      layout='responsive' data-embed-as='video'
      data-href={url}></amp-facebook>);
  }

  return '';
}

function renderTwitter (props) {
  const { id } = props;

  return (<amp-twitter width={486} height={657}
    layout='responsive'
    data-tweetid={id}
    data-cards='hidden'>
  </amp-twitter>);
}

function renderVine (props) {
  const { id } = props;
  return <amp-vine width='400' height='250' layout='responsive' data-vineid={id}></amp-vine>;
}

function renderInstagram (props) {
  const { id } = props;

  return (<amp-instagram
    data-shortcode={id}
    width={400}
    height={400}
    layout='responsive'>
  </amp-instagram>);
}

function renderCustom (props) {
  const { src, width, height, secure } = props;

  // AMP doesn't allow relative-url iframes,
  // always embed them as https
  const secureSrc = src.slice(0, 2) === '//'
    ? ('https:' + src) : src;

  if (secure) {
    /* eslint-disable */
    return (<amp-iframe
      width={width}
      height={height}
      layout='responsive'
      frameborder={0}
      src={secureSrc}>
    </amp-iframe>);
    /* eslint-enable */
  }

  /* replace with the link ? */
  // return <a href={src} target='_blank'>Load content in new window</a>;

  return '';
}

const types = {
  image: renderImage,
  youtube: renderYoutube,
  facebook: renderFacebook,
  twitter: renderTwitter,
  vine: renderVine,
  instagram: renderInstagram,
  custom: renderCustom
};

export default types;
