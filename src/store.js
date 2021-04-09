import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [
    thunk
];

composeSetup = compose(
    applyMiddleware(...middleware)
)

const store = createStore(
    rootReducer,
    initialState,
    composeSetup
);

export default store;