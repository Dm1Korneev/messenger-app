import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { DbDocument } from 'Types';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
    email: string;

  @Prop({ required: true, unique: true })
    name: string;

  @Prop()
    avatar: string;

  @Prop()
    hash: string;

  @Prop()
    salt: string;
}

export type UserDocument = DbDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
