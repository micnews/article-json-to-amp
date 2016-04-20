import { renderString, tree } from 'deku';
import element from 'magic-virtual-element';
import setupArticle from 'article-json-html-render';
import embeds from './embeds';

const Article = setupArticle({ embeds });

module.exports = items => renderString(tree(<Article items={items || []} />))
  .replace(/<br><\/br>/g, '<br/>'); // fix double br bug
