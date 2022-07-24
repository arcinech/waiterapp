import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import tablesReducer from './tablesRedux'
import initialState from './initialState';
import thunk from 'redux-thunk';
import loadingReducer from './loadingRedux';


const subreducers = {
  tables: tablesReducer,
  loading: loadingReducer
};

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;