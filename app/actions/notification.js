export const NOTIFICATION = 'NOTIFICATION';


export const notify  = (msg, _type) => ({
  type: NOTIFICATION,
  msg,
  _type
});
