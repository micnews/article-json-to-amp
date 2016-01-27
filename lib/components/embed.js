import { element } from 'deku';

function renderImage (props) {
  let width = props.width || 0;
  let height = props.height || 0;
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

function render ({ props }) {
  const { embedType } = props;
  let embed = '';

  if (embedType === 'image') {
    embed = renderImage(props);
  }

  if (embedType === 'youtube') {
    embed = renderYoutube(props);
  }

  return <figure>{embed}</figure>;
}

export default { render };
