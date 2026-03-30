import mongoose from 'mongoose'

export default async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    console.warn('MONGODB_URI is not set. Skipping MongoDB connection for now.')
    return
  }

  try {
    await mongoose.connect(mongoUri)
    console.log('MongoDB connection established.')
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    throw error
  }
}
