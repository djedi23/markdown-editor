import { compact } from 'lodash';
import { FILES_READ_DIR, FILES_TOGGLE_MD } from '../actions/files';

const filterMD = (filter, files) => {
  if (filter) { return compact(files.map((x) => x.directory || x.name.match(/.*\.md$/) ? x : null)); }
  return files;
};

export default function drawer(state = { onlyMD: true }, action) {
  switch (action.type) {
  case FILES_READ_DIR:
    return { ...state,
      dir: action.dir,
      rawfiles: action.files,
      files: filterMD(state.onlyMD, action.files) };
  case FILES_TOGGLE_MD:
    return { ...state, onlyMD: !state.onlyMD, files: filterMD(!state.onlyMD, state.rawfiles) };
  default:
    return state;
  }
}
