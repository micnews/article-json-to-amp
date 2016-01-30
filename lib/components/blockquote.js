import { element } from 'deku';
import blockList from '../block-list';

function render ({ props }) {
  const { items } = props;
  return <blockquote>{blockList(items)}</blockquote>;
}

export default { render };
