import { element } from 'deku';

function wrapMark (node, el) {
  const markClass = node.markClass || null;
  return node.mark ? <mark class={markClass}>{el}</mark> : el;
}

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
    return wrapMark(item, wrapHref(item, wrapBold(item,
      wrapItalic(item, String(item.content || '')))));
  }

  if (item.type === 'linebreak') {
    return <br/>;
  }

  return '';
}

export default function (items) {
  return items.map(renderItem);
}
