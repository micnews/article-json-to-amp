import { element } from 'deku';
import Paragraph from './paragraph';

function renderItem (item) {
  if (item.type === 'paragraph') {
    return <Paragraph items={item.children} />;
  }

  return '';
}

function render ({ props }) {
  const { items } = props;
  return <article>{items.map(renderItem)}</article>;
}

export default { render };
