import { element } from 'deku';
import renderParagraph from './render-paragraph';

export default function (tree) {
  return tree
    .filter(node => node.type === 'paragraph')
    .map(renderParagraph);
}
