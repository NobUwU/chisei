import mongoose from 'mongoose'
const options = {
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true,
}
export const connection = mongoose.connect(`${process.env.MONGO_CONNECT_URL}`, options)
