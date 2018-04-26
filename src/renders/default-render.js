import _ from 'lodash';

const stringify = (val, tab) => {
  if (typeof val === 'object') {
    return `{\n${Object.keys(val).map(key => `${tab}      ${key}: ${val[key]}`)}\n${tab}  }`;
  }
  return `${val}`;
};

const render = (ast) => {
  const iter = (astTree, depth) => {
    const keys = Object.keys(astTree);
    return _.flatten(keys.map((key) => {
      const { type, value = '', children = {} } = astTree[key];
      const tab = '    '.repeat(depth);
      const stringVal = stringify(value, tab);

      const strings = {
        complex: `${tab}  ${key}: {\n${iter(children, depth + 1).join('\n')}\n${tab}  }`,
        immutable: `${tab}  ${key}: ${stringVal}`,
        changed: [`${tab}+ ${key}: ${stringify(value.new, tab)}`, `${tab}- ${key}: ${stringify(value.old, tab)}`],
        added: `${tab}+ ${key}: ${stringVal}`,
        deleted: `${tab}- ${key}: ${stringVal}`,
      };
      return strings[type];
    }));
  };
  return `{\n${iter(ast, 1).join('\n')}\n}\n`;
};

export default render;
