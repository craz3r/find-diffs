import _ from 'lodash';

const stringify = (val, tab) => {
  if (typeof val === 'object') {
    return `{\n${Object.keys(val).map(key => `${tab}      ${key}: ${val[key]}`)}\n${tab}  }`;
  }
  return `${val}`;
};

const view = (node, key, tab) => {
  const { status, value } = node;
  const stringVal = stringify(value, tab);
  const strings = {
    immutable: `  ${key}: ${stringVal}`,
    changed: `+ ${key}: ${stringify(value.new, tab)}\n${tab}- ${key}: ${stringify(value.old, tab)}`,
    added: `+ ${key}: ${stringVal}`,
    deleted: `- ${key}: ${stringVal}`,
  };
  return strings[status];
};

const render = (ast) => {
  const iter = (astTree, depth) => {
    const keys = Object.keys(astTree);
    const tab = '    '.repeat(depth);

    return keys.map((key) => {
      if (_.has(astTree[key], 'children')) {
        return `${tab}  ${key}: {\n${iter(astTree[key].value, depth + 1)}\n${tab}  }`;
      }
      return `${tab}${view(astTree[key], key, tab)}`;
    }).join('\n');
  };
  return `{\n${iter(ast, 1)}\n}\n`;
};

export default render;
