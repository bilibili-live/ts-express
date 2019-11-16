import cowsay from 'yosay'
import App from './app'
import { APP_PORT } from './config'

require('colors')

App.listen(APP_PORT, ()=> {
  const log = cowsay(`${ (`listen to` as any).blue } ${ ('http://localhost:' as any).red + (APP_PORT as any).red }`)
  console.log(log)
})