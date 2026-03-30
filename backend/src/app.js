import cors from 'cors'
import express from 'express'
import apiRoutes from './routes/index.js'

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  })
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend is ready for future features.' })
})

app.use('/api', apiRoutes)

export default app
