import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type PostDocument = HydratedDocument<Post>;

@Schema({ versionKey: false, timestamps: true })
export class Post {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  @Prop({
    required: true,
  })
  author: string;
}
const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.index({
  createdAt: -1,
});
export { PostSchema };
