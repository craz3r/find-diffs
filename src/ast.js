import _ from 'lodash';

const generateAst = (before, after) => {
  const beforeKeys = Object.keys(before);
  const afterKyes = Object.keys(after);

  return _.union(beforeKeys, afterKyes).reduce((acc, key) => {
    if (_.has(before, key) && _.has(after, key)) {
      if (_.isObject(before[key]) && _.isObject(after[key])) {
        return { ...acc, [key]: { type: 'complex', children: generateAst(before[key], after[key]) } };
      }
      if (before[key] === after[key]) return { ...acc, [key]: { type: 'unchanged', oldValue: before[key], newValue: '' } };
      return { ...acc, [key]: { type: 'changed', oldValue: before[key], newValue: after[key] } };
    } else if (_.has(before, key)) return { ...acc, [key]: { type: 'deleted', oldValue: before[key], newValue: '' } };
    return { ...acc, [key]: { type: 'added', oldValue: '', newValue: after[key] } };
  }, {});
};


export default generateAst;
