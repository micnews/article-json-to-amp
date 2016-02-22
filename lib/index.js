import { string, element } from 'deku';
import setupArticle from 'article-json-html-render';
import embeds from './embeds';

const Article = setupArticle({ embeds });

module.exports = items => string.render(<Article items={items || []} />)
  .replace(/<br><\/br>/g, '<br/>'); // fix double br bug
