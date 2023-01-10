import {createServer} from './utils/server'
import {ConfigService} from './services/ConfigService'

const configService = new ConfigService()

createServer(configService)
  .then(server => {
    server.listen(3000, () => {
      console.info(`Listening on http://localhost:3000`)
    })
  })
  .catch(err => {
    console.error(`Error: ${err}`)
  })
