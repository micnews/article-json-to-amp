import { element } from 'deku';
import Paragraph from './paragraph';
import Embed from './embed';

function renderItem (item) {
  if (item.type === 'paragraph') {
    const hasContent = item.children.filter(item => item.type !== 'linebreak' &&
        item.content && item.content.trim()).length > 0;

    if (!hasContent) {
      return '';
    }

    return <Paragraph items={item.children} />;
  }

  if (item.type === 'embed') {
    return <Embed {...item} />;
  }

  return '';
}

function render ({ props }) {
  const { items } = props;
  return <article>{items.map(renderItem)}</article>;
}

export default { render };
