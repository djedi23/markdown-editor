// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import persistState from 'redux-localstorage';
import rootReducer from '../reducers';

const router = routerMiddleware(hashHistory);

const enhancer = compose(applyMiddleware(thunk, router),
                          persistState('projects'/* , config*/));

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer); // eslint-disable-line
}
