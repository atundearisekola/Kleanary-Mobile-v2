//import jwt from 'jsonwebtoken';
import AsyncStorage from '@react-native-community/async-storage';
const jwt_token = 'v4FGLJiAZCPaZsD9Lxh32DaHHBwXkCFRHX838skf';

export const loadState = () => {
  try {
    console.log('load');
    const serializedState = AsyncStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    let state = JSON.parse(serializedState);
    /*
      let token = JSON.parse(serializedState).AuthReducer.access_token;
      jwt.verify(token,jwt_token,function (err,decoded) {
        if (err) {
          console.log(err)
        }
        console.log(decoded.foo)
      })
      */
    return state;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    console.log('save');
    const serializedState = JSON.stringify(state);
    AsyncStorage.setItem('state', serializedState);
  } catch (err) {
    //ignoring write erros
  }
};

export const RemoveState = (state) => {
  try {
    AsyncStorage.removeItem('state');
  } catch (err) {
    //ignoring write erros
  }
};
