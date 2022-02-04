import { model, Schema } from 'mongoose'

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'users'

const userSchema = new Schema({
  firstName: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    maxlength: 25,
  },
  lastName: {
    type: Schema.Types.String,
    required: true,
    trim: true,
    maxlength: 25,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    trim: true,
    select: false,
  },
  status: {
    type: Schema.Types.Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
    select: false,
  },
  updatedAt: {
    type: Date,
    required: true,
    select: false,
  },
})

export default UserModel = model(DOCUMENT_NAME, userSchema, COLLECTION_NAME)
