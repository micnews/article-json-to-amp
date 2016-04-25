export function requireHack (p) {
  const doc = global.document;
  delete global.document;
  const v = require(p);
  global.document = doc;
  return v;
}

export const tree = requireHack('deku').tree;
export const renderString = requireHack('deku').renderString;
export const element = requireHack('magic-virtual-element');
