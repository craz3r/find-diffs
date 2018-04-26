import _ from 'lodash';

const generateAst = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKyes = Object.keys(after);

  return _.union(beforeKeys, afterKyes).reduce((acc, key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (typeof before[key] === 'object' && typeof after[key] === 'object') {
        return { ...acc, [key]: { type: 'complex', children: generateAst(before[key], after[key]) } };
      }
      if (before[key] === after[key]) return { ...acc, [key]: { type: 'immutable', value: before[key] } };
      return { ...acc, [key]: { type: 'changed', value: { old: before[key], new: after[key] } } };
    } else if (_.has(before, key)) return { ...acc, [key]: { type: 'deleted', value: before[key] } };
    return { ...acc, [key]: { type: 'added', value: after[key] } };
  }, {});
};


export default generateAst;
