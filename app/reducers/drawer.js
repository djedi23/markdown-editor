import { DRAWER_TOGGLE_NEW_FILE, DRAWER_TOGGLE_OPEN, DRAWER_TOGGLE_PIN } from '../actions/drawer';

export default function drawer(state = { open: false, pinned: false, newFile: false }, action) {
  switch (action.type) {
  case DRAWER_TOGGLE_OPEN:
    return { ...state, open: !state.open };
  case DRAWER_TOGGLE_PIN:
    return { ...state, pinned: !state.pinned };
  case DRAWER_TOGGLE_NEW_FILE:
    return { ...state, newFile: !state.newFile };
  default:
    return state;
  }
}
