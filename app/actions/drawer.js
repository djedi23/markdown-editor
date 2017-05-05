export const DRAWER_TOGGLE_OPEN = 'DRAWER_TOGGLE_OPEN';
export const DRAWER_TOGGLE_PIN = 'DRAWER_TOGGLE_PIN';

export const DRAWER_TOGGLE_NEW_FILE = 'DRAWER_TOGGLE_NEW_FILE';

export const drawerToggle = () => ({
  type: DRAWER_TOGGLE_OPEN
});
export const drawerPinToggle = () => ({
  type: DRAWER_TOGGLE_PIN
});
export const drawerNewFileToggle = () => ({
  type: DRAWER_TOGGLE_NEW_FILE
});
