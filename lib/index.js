import { renderString, tree, requireHack } from './deku';
import embeds from './embeds';

const setupArticle = requireHack('article-json-html-render');
const element = requireHack('magic-virtual-element');
const Article = setupArticle({ embeds });

module.exports = items => renderString(tree(<Article items={items || []} />))
  .replace(/<br><\/br>/g, '<br/>'); // fix double br bug
