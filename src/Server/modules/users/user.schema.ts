import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

export type UserDocument = User & Document<string>;

export const UserSchema = SchemaFactory.createForClass(User);
