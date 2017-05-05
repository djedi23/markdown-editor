import { closeAsync, lstatAsync, mkdirAsync, openAsync, readdirAsync } from '../fs';
import { join, relative as relativePath } from 'path';
import git from 'git-utils';

export const FILES_READ_DIR = 'FILES_READ_DIR';
export const FILES_TOGGLE_MD = 'FILES_TOGGLE_MD';
export const FILES_NEW_FILE = 'FILES_NEW_FILE';

const stat = (repository, basedir, dir, file) => new Promise(async (resolve) => {
  const stats = await lstatAsync(`${dir}/${file}`);
  const relative = relativePath(basedir, join(dir, file));
  const status = repository.getStatus(relative);
  resolve({ ...stats,
    directory: stats.isDirectory(),
    name: file,
    status,
    relative,
    isStatusModified: repository.isStatusModified(status),
    isStatusNew: repository.isStatusNew(status),
  });
});


export const fileReadDir = (basedir = './', dir = './') =>
  async (dispatch) => {
    const repository = git.open(dir);
    // const status = repository.getStatus();
    // console.log( status);
    const files = await Promise.all(['..', ...await readdirAsync(dir)].map((file) => stat(repository, basedir, dir, file)));

    dispatch({
      type: FILES_READ_DIR,
      dir,
      files
    });
  };

export const fileCreateFile = (basedir, dir, file) =>
  async (dispatch) => {
    const fd = await openAsync(`${dir}/${file}`, 'a');
    await closeAsync(fd);
    const repository = git.open(dir);
    const files = await Promise.all(['..', ...await readdirAsync(dir)].map((file) => stat(repository, basedir, dir, file)));
    dispatch({
      type: FILES_READ_DIR,
      dir,
      files
    });
  };
export const fileCreateDirectory = (basedir, dir, file) =>
  async (dispatch) => {
    await mkdirAsync(`${dir}/${file}`);
    const repository = git.open(dir);
    const files = await Promise.all(['..', ...await readdirAsync(dir)].map((file) => stat(repository, basedir, dir, file)));
    dispatch({
      type: FILES_READ_DIR,
      dir,
      files
    });
  };


export const fileToggleMD = () =>
  ({
    type: FILES_TOGGLE_MD,
  });
