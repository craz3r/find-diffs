import _ from 'lodash';

const view = (prop, node) => {
  const { value, type } = node;
  const joinProp = prop.join('');

  const added = typeof value === 'object' ? `Property ${joinProp} was added with complex value\n` : `Property ${joinProp} was added with value: ${value}\n`;

  const strings = {
    changed: `Property ${joinProp} was updated. From ${typeof value.old === 'object' ? 'complex value' : value.old} to ${typeof value.new === 'object' ? 'complex value' : value.new}\n`,
    deleted: `Property ${joinProp} was removed\n`,
    added,
    immutable: '',
  };
  return strings[type];
};

const render = (ast) => {
  const iter = (astTree, acc) => {
    const keys = Object.keys(astTree);
    return keys.map((key) => {
      if (_.has(astTree[key], 'children')) return iter(astTree[key].children, [...acc, `${key}.`]);
      return view([...acc, `${key}`], astTree[key]);
    }).join('');
  };

  return iter(ast, '');
};

export default render;
