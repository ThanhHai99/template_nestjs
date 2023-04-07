import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, ObjectId, SchemaType, SchemaTypes } from 'mongoose'
import { uuid } from 'uuidv4'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: false, _id: false, virtuals: false })
export class User {
  @Prop({ type: SchemaTypes.String, required: true, trim: true, unique: true, default: uuid() })
  id: string

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
