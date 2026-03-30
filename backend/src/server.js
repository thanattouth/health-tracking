import dotenv from 'dotenv'
import app from './app.js'
import connectDatabase from './config/db.js'

dotenv.config()

const port = process.env.PORT || 5000

async function startServer() {
  await connectDatabase()

  app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start backend server:', error)
  process.exit(1)
})
