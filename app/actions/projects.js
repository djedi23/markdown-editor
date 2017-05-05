export const PRJ_CREATE = 'PRJ_CREATE';

export const createProject = (project) => ({ ...project, type: PRJ_CREATE });
