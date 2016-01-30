import { element } from 'deku';
import Paragraph from './components/paragraph';
import Blockquote from './components/blockquote';
import Embed from './components/embed';

function renderItem (item) {
  if (item.type === 'paragraph') {
    const hasContent = item.children.filter(item => item.type !== 'linebreak' &&
        item.content && item.content.trim()).length > 0;

    if (!hasContent) {
      return '';
    }

    return <Paragraph items={item.children} />;
  }

  if (item.type === 'blockquote') {
    return <Blockquote items={item.children} />;
  }

  if (item.type === 'embed') {
    return <Embed {...item} />;
  }

  return '';
}

export default items => items.map(renderItem);
