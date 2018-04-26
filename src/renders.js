import defaultRender from './renders/default-render';
import plainRender from './renders/plain-render';

const renders = {
  plain: plainRender,
  default: defaultRender,
};

export default format => (data) => {
  const parse = renders[format];
  if (!parse) {
    throw new Error(`unkown parameter: ${format}`);
  }
  return parse(data);
};
