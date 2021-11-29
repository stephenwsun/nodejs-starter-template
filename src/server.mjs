import dotenv from 'dotenv/config'
import app from './app.mjs'

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`)
})

