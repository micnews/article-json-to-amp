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

function renderItem (node) {
  if (!node) {
    return null;
  }

  if (node.type === 'text') {
    return wrapHref(node, wrapBold(node,
      wrapItalic(node, String(node.content || ''))));
  }

  return null;
}

export default function (paragraph) {
  const items = paragraph.children
    ? paragraph.children.map(renderItem)
    : [];

  return <p>{items}</p>;
}
