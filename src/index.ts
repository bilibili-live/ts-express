import App from './app'
import { APP_PORT } from './config'
App.listen(APP_PORT, ()=> {
  console.log(`listen to http://localhost:${ APP_PORT }`)
})