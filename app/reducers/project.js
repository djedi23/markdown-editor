import { PRJ_CLOSE, PRJ_OPEN } from '../actions/project';

export default (state = {}, action) => {
  switch (action.type) {
  case PRJ_OPEN: {
    return { ...action.project };
  }
  case PRJ_CLOSE: {
    return { };
  }
  default:
    return state;
  }
};
