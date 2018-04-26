const render = (ast) => {
  const iter = (astTree, acc) => {
    const keys = Object.keys(astTree);
    return keys.map((key) => {
      const { value = '', type, children = {} } = astTree[key];

      const joinProp = [...acc, `${key}`].join('');
      const added = typeof value === 'object' ? `Property ${joinProp} was added with complex value\n` : `Property ${joinProp} was added with value: ${value}\n`;

      const strings = {
        complex: iter(children, [...acc, `${key}.`]),
        changed: `Property ${joinProp} was updated. From ${typeof value.old === 'object' ? 'complex value' : value.old} to ${typeof value.new === 'object' ? 'complex value' : value.new}\n`,
        deleted: `Property ${joinProp} was removed\n`,
        added,
        immutable: '',
      };

      return strings[type];
    }).join('');
  };

  return iter(ast, '');
};

export default render;
