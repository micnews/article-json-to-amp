import { element } from 'deku';
import Paragraph from './components/paragraph';
import Blockquote from './components/blockquote';
import Embed from './components/embed';
import Header from './components/header';

function renderItem (item) {
  if (item.type === 'paragraph') {
    const hasContent = item.children.filter(item => item.type !== 'linebreak' &&
        (item.content && item.content.trim()) || item.mark).length > 0;

    if (!hasContent) {
      return '';
    }

    return <Paragraph items={item.children} />;
  }

  if (item.type === 'header1') {
    return <Header type={1} items={item.children} />;
  }

  if (item.type === 'header2') {
    return <Header type={2} items={item.children} />;
  }

  if (item.type === 'header3') {
    return <Header type={3} items={item.children} />;
  }

  if (item.type === 'header4') {
    return <Header type={4} items={item.children} />;
  }

  if (item.type === 'header5') {
    return <Header type={5} items={item.children} />;
  }

  if (item.type === 'header6') {
    return <Header type={6} items={item.children} />;
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
