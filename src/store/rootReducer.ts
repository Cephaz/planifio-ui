import {combineReducers} from '@reduxjs/toolkit';
import loginReducer from '../pages/Login/slice';

const rootReducer = combineReducers({
  login: loginReducer,
});

export default rootReducer;
