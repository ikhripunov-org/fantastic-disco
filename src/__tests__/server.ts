import request from 'supertest'
import {Express} from 'express-serve-static-core'

import {createServer, IConfigService} from '../utils/server'

let server: Express

const config = {
  configKey: "configValue"
}

class TestConfigService implements IConfigService {
  getConfig(): any {
    return config
  }
}

beforeAll(async () => {
  server = await createServer(new TestConfigService())
})

describe('GET /config', () => {
  it('should return 200 if everything is fine', async () => {
    
    const test = await request(server)
      .get(`/config`)
      .expect(200)

    expect(test.body).toEqual(config)
  })
})