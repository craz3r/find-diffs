import diffRender from './diff-render';
import plainRender from './plain-render';

const renders = {
  plain: plainRender,
  diff: diffRender,
  json: JSON.stringify,
};

export default format => (data) => {
  const parse = renders[format];
  if (!parse) {
    throw new Error(`unkown parameter: ${format}`);
  }
  return parse(data);
};
