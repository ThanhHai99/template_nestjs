import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, SchemaTypes } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: false, versionKey: false })
export class User {
  @Prop({ type: SchemaTypes.String, required: true, trim: true, unique: true })
  username: string

  @Prop({ type: SchemaTypes.String, required: true })
  password: number

  @Prop({ type: SchemaTypes.Date, required: true, default: Date.now })
  created_at: Date

  @Prop({ type: SchemaTypes.Date, required: true, default: Date.now })
  updated_at: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
