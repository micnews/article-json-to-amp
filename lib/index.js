import { string, element } from 'deku';
import Article from './components/article';

module.exports = items => string.render(<Article items={items || []} />)
  .replace(/<br><\/br>/g, '<br/>'); // fix double br bug
