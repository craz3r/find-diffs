import _ from 'lodash';

const ast = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKyes = Object.keys(after);

  return _.union(beforeKeys, afterKyes).reduce((acc, key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (typeof before[key] === 'object' && typeof after[key] === 'object') {
        return { ...acc, [key]: { value: ast(before[key], after[key]), children: true } };
      }
      if (before[key] === after[key]) return { ...acc, [key]: { status: 'immutable', value: before[key] } };
      return { ...acc, [key]: { status: 'changed', value: { old: before[key], new: after[key] } } };
    } else if (_.has(before, key)) return { ...acc, [key]: { status: 'deleted', value: before[key] } };
    return { ...acc, [key]: { status: 'added', value: after[key] } };
  }, {});
};


export default ast;
