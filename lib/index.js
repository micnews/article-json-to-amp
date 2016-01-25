import { string, element } from 'deku';
import renderArticle from './render-article';

module.exports = tree => string.render(<article>{renderArticle(tree)}</article>);
