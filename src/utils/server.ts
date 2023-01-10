import express from 'express'
import {Express} from 'express-serve-static-core'

export interface IConfigService {
  getConfig(): any;
}

export async function createServer(configService: IConfigService): Promise<Express> {

  const server = express()
  //TODO would be good to use router here, but it's only one path, so...
  server.get('/config', async (req, res) => {
    try {
      const config = await configService.getConfig()
      res.status(200).json(config)
    } catch (error) {
      res.status(500).send()
    }
  })
  
  return server
}