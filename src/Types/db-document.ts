import { Document } from 'mongoose';

import { ID } from './base-types';

export type DbDocument<T> = T & Document<ID, null, T & {_id: ID}>;
