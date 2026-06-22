import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import { connectDB } from './config/db.js'
import noteRoutes from './routes/noteRoutes.js'
import { rateLimiter } from './middleware/rateLimiter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:5173'
  }))
}

app.use(express.json())
app.use(rateLimiter)

connectDB().then(() => {
  app.use('/api/notes', noteRoutes)

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/dist')))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'frontend/dist/index.html'))
    })
  }

  app.listen(PORT, () => {
    console.log('Server started on port ' + PORT)
  })
})