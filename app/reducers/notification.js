import { NOTIFICATION } from '../actions/notification';

export default (state = { msg: '', type: 'info', open: false }, action) => {
  switch (action.type) {
  case NOTIFICATION:
    return { ...state,
      msg: action.msg,
      type: action._type,
      open: true
    };
  case 'NOTIFICATION_HIDE':
    return { ...state,
      open: false };
  default:
    return state;
  }
};
