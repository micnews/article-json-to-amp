import { element } from 'deku';
import text from '../text';

function render ({ props }) {
  const { items } = props;
  return <figcaption>{text(items)}</figcaption>;
}

export default { render };
