import { element } from 'deku';

function wrapHref (node, el) {
  return node.href ? <a href={node.href}>{el}</a> : el;
}

function wrapBold (node, el) {
  return node.bold ? <b>{el}</b> : el;
}

function wrapItalic (node, el) {
  return node.italic ? <i>{el}</i> : el;
}

function renderItem (item) {
  if (item.type === 'text') {
    return wrapHref(item, wrapBold(item,
      wrapItalic(item, String(item.content || ''))));
  }

  if (item.type === 'linebreak') {
    return <br/>;
  }

  return '';
}

function render ({ props }) {
  const { items } = props;
  return <p>{items.map(renderItem)}</p>;
}

export default { render };
