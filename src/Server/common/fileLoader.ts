import multer from 'multer';

import { MAX_AVATAR_SIZE } from '../constants';

export const fileLoader = multer({
  limits: { fileSize: MAX_AVATAR_SIZE },
});
