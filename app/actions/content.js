import { readFileAsync, writeFileAsync } from '../fs';

export const CONTENT_SET = 'CONTENT_SET';
export const CONTENT_LOAD = 'CONTENT_LOAD';
export const CONTENT_SAVE = 'CONTENT_SAVE';

export const loadContent = (file) =>
  async (dispatch) => {
    const content = await readFileAsync(file);
    dispatch({
      type: CONTENT_LOAD,
      file,
      content: content.toString()
    });
  };
export const setContent = (content) =>
  ({
    type: CONTENT_SET,
    content
  });

export const saveContent = (file, content) =>
  async (dispatch) => {
    await writeFileAsync(file, content);

    dispatch({
      type: CONTENT_SAVE,
      content,
      file
    });
  };
