import { PRJ_CREATE } from '../actions/projects';

export default function projects(state = {}, action) {
  switch (action.type) {
  case PRJ_CREATE: {
    const st = { ...state };
    st[action.name] = { name: action.name, path: action.path };
    return st;
  }
  default:
    return state;
  }
}
