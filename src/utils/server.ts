import express from 'express'
import {Express} from 'express-serve-static-core'

export async function createServer(): Promise<Express> {

  const server = express()
  server.get('/config', (req, res) => {
    res.send('Hello word!!!')
  })

  return server
}