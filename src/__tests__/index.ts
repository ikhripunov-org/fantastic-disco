import request from 'supertest'
import {Express} from 'express-serve-static-core'

import {createServer} from '../utils/server'

let server: Express

beforeAll(async () => {
  server = await createServer()
})

describe('GET /config', () => {
  it('should return 200', (done) => {
    request(server)
      .get(`/config`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        // expect(res.body).toMatchObject({'message': 'Hello, stranger!'})
        done()
      })
  })
})