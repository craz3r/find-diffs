import _ from 'lodash';

const render = (ast) => {
  const iter = (astTree, acc) => {
    const keys = Object.keys(astTree);
    return keys.filter(key => astTree[key].type !== 'unchanged').map((key) => {
      const {
        oldValue = '', newValue = '', type, children = {},
      } = astTree[key];

      const joinProp = [...acc, `${key}`].join('');

      const addedPrefix = _.isObject(newValue) ? '' : 'value: ';
      const stringOldVal = _.isObject(oldValue) ? 'complex value' : oldValue;
      const stringNewVal = _.isObject(newValue) ? 'complex value' : newValue;

      const strings = {
        complex: iter(children, [...acc, `${key}.`]),
        changed: `Property ${joinProp} was updated. From ${stringOldVal} to ${stringNewVal}`,
        deleted: `Property ${joinProp} was removed`,
        added: `Property ${joinProp} was added with ${addedPrefix}${stringNewVal}`,
      };

      return strings[type];
    }).join('\n');
  };

  return `${iter(ast, '')}\n`;
};

export default render;
