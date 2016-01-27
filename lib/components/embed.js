import { element } from 'deku';
import FigureCaption from './figure-caption';

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

function render ({ props }) {
  const { embedType } = props;
  let embed = '';

  if (embedType === 'image') {
    embed = renderImage(props);
  }

  if (embedType === 'youtube') {
    embed = renderYoutube(props);
  }

  const caption = (props.caption && props.caption.length > 0)
    ? <FigureCaption items={props.caption} /> : '';

  return <figure>{embed}{caption}</figure>;
}

export default { render };
