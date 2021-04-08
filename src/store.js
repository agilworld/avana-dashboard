import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import Reactotron from './ReactotronConfig'

const initialState = {};

const middleware = [
    thunk
];

let composeSetup 
if( Reactotron ) {
    composeSetup = compose(
        applyMiddleware(...middleware),
        Reactotron.createEnhancer()
    )
} else {
    composeSetup = compose(
        applyMiddleware(...middleware)
    )
}

const store = createStore(
    rootReducer,
    initialState,
    composeSetup
);

export default store;