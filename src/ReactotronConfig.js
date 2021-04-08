import Reactotron from 'reactotron-react-js'
import { reactotronRedux } from 'reactotron-redux'

const reactotron = process.env.REACT_APP_ENV === 'development' ? Reactotron
  .configure({ name: 'Avana Admin Debugging' }) // we can use plugins here -- more on this later
  .use(reactotronRedux()) 
  .connect() : null

export default reactotron