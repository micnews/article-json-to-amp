import { element } from 'deku';
import text from '../text';

function render ({ props }) {
  const { items, type } = props;
  const inner = text(items);

  switch (type) {
    case 1: return <h1>{inner}</h1>;
    case 2: return <h2>{inner}</h2>;
    case 3: return <h3>{inner}</h3>;
    case 4: return <h4>{inner}</h4>;
    case 5: return <h5>{inner}</h5>;
    case 6: return <h6>{inner}</h6>;
  }

  return '';
}

export default { render };
