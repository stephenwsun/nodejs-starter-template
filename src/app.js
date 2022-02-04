import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import './database'

const app = express()

app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 50000,
  })
)
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))

app.all('*', (req, res) => {
  res.status(404).send({
    msg: 'Not Found',
  })
})

export default app
