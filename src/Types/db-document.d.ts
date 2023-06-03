import { Document } from 'mongoose';

import { ID } from './base-types';

type ApplyStringIDsForField<T> =
  0 extends (1 & T) ? T :// any
    T extends object[] ? ID[] : // Array
      T extends object ? ID : // Subdocument
        T;

type ApplyStringIDsForDocument<T> = {
    [K in keyof T]: ApplyStringIDsForField<T[K]>;
  };

class DbDocumentClass<T> extends Document<ID, null, ApplyStringIDsForDocument<T> & {_id: ID}> {
  _id!: ID;

  save(options: SaveOptions, callback: Callback<this>): void;

  save(callback: Callback<this>): void;

  save(options?: SaveOptions): Promise<this>;
}

export type DbDocument<T> = DbDocumentClass<T> & T

