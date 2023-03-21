// import {createStore , compose , applyMiddleware}  from 'redux'
// import reducers from './reducers'
// import thunk from 'redux-thunk'
// const store = createStore(reducers, {} , compose(applyMiddleware(thunk)));

// export default store;


import { configureStore } from '@reduxjs/toolkit'
import MainSlice from './Slices/MainSlice'
  
 

export const store = configureStore({
  reducer: {
    auth:MainSlice
  },
})
