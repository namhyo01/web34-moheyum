import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Prop({
    unique: true,
    required: true,
  })
  userid: string;

  @Prop({
    unique: true,
    required: true,
  })
  nickname: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    default: '',
  })
  profileimg: string;

  @Prop({
    default: '',
  })
  bio: string;

  @Prop({
    default: 0,
  })
  postcount: number;

  @Prop({
    default: 0,
  })
  follower: number;

  @Prop({
    default: 0,
  })
  following: number;

  @Prop({
    default: true,
  })
  state: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
