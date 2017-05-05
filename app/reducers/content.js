import { CONTENT_LOAD, CONTENT_SAVE, CONTENT_SET } from '../actions/content';

export default function drawer(state = {}, action) {
  switch (action.type) {
  case CONTENT_LOAD:
    return { ...state, file: action.file, content: action.content, modified: false };
  case CONTENT_SET:
    return { ...state, content: action.content, modified: true };
  case CONTENT_SAVE:
    return { ...state, modified: false };
  default:
    return state;
  }
}
