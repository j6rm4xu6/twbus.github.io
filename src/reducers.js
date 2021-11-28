import { combineReducers } from 'redux';
import { connect as oriConnect } from 'react-redux';
import busReducer from './components/BusMoudle/reducer';

const reducerDict = {
  busReducer,
};

export const connect = oriConnect;

export default combineReducers(reducerDict);
