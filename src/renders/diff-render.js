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
      const {
        type, oldValue = '', newValue = '', children = {},
      } = astTree[key];

      const tab = '    '.repeat(depth);

      const stringOldVal = stringify(oldValue, tab);
      const stringNewVal = stringify(newValue, tab);

      const strings = {
        complex: `${tab}  ${key}: {\n${iter(children, depth + 1).join('\n')}\n${tab}  }`,
        unchanged: `${tab}  ${key}: ${stringOldVal}`,
        changed: [`${tab}+ ${key}: ${stringNewVal}`, `${tab}- ${key}: ${stringOldVal}`],
        added: `${tab}+ ${key}: ${stringNewVal}`,
        deleted: `${tab}- ${key}: ${stringOldVal}`,
      };
      return strings[type];
    }));
  };
  return `{\n${iter(ast, 0).join('\n')}\n}\n`;
};

export default render;
