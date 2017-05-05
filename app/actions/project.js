export const PRJ_OPEN = 'PRJ_OPEN';
export const PRJ_CLOSE = 'PRJ_CLOSE';

export const openProject = (project) => ({ project, type: PRJ_OPEN });
export const _closeProject = () => ({ type: PRJ_CLOSE });
