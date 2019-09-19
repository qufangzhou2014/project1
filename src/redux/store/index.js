import {createStore, applyMiddleware} from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";



const logger = store => next => action => {
    console.log('previous state', store.getState());
    console.log('dispatching', action);
    next(action);
    console.log('next state', store.getState());
  };

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;