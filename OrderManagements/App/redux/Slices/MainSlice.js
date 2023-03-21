import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userData: null,
    userID: null,
    NewOrder: null,
    user: null,
    token:null,
    fctoken:null,
    OrderList:null,
}

export const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
  
 setUserData:   (state,action) => {
    state.userData=action.payload
},
 setNewOrder :  (state,action)=> {
    state.NewOrder=action.payload

    // dispatch({type: "DellerID" , payload : data})
},
 setUserID :  (state,action) => {
    state.userID=action.payload

    // dispatch({type: "UserID" , payload : data})
},
 setUser :  (state,action) => {
    state.user=action.payload

    // dispatch({type: "User" , payload : data})
},
 setJToken:  (state,action) => {
    state.token=action.payload

    // dispatch({type: "Token" , payload : data})
},
 setFCToken: (state,action) => {
    state.fctoken=action.payload

    // dispatch({type: "FcToken" , payload : data})
},
 setOrderList : (state,action) => {
    state.OrderList=action.payload

    // dispatch({type: "OrderList" , payload : data})
},
  },
})

// Action creators are generated for each case reducer function
export const { setUserData, setUserID, setUser ,setJToken,setOrderList,setFCToken,setNewOrder} = mainSlice.actions

export default mainSlice.reducer

