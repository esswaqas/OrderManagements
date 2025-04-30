import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoader:false,
    userData: null,
    userID: null,
    NewOrder: null,
    user: null,
    token:null,
    fctoken:null,
    OrderList:null,
    CustomerList:null,
    ProductItemList:null,
    ProductList:null,
    PendingOrderList:null,
    messageType:'',
    messagetitle:'',
    messagebody:'',
    messagecancelbtn:null,
    isvisibleMessage:null
     

}

export const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setisLoader:   (state,action) => {
        state.isLoader=action.payload
    },
  
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
setCustomerList : (state,action) => {
    state.CustomerList=action.payload

    // dispatch({type: "OrderList" , payload : data})
},
setProductItemList: (state,action) => {
    state.ProductItemList=action.payload

    // dispatch({type: "OrderList" , payload : data})
},
setProductList: (state,action) => {
    state.ProductList=action.payload

    // dispatch({type: "OrderList" , payload : data})
},
setPendingOrderList: (state,action) => {
    state.PendingOrderList=action.payload

    // dispatch({type: "OrderList" , payload : data})
},

setmessageType: (state,action) => {
    state.messageType=action.payload

    // dispatch({type: "OrderList" , payload : data})
},
setmessagetitle: (state,action) => {
    state.messagetitle=action.payload

    // dispatch({type: "OrderList" , payload : data})
},
setmessagebody: (state,action) => {
    state.messagebody=action.payload

    // dispatch({type: "OrderList" , payload : data})
},

setmessagecancelbtn: (state,action) => {
    state.messagecancelbtn=action.payload

    // dispatch({type: "OrderList" , payload : data})
},

setisvisibleMessage: (state,action) => {s
    state.isvisibleMessage=action.payload

    // dispatch({type: "OrderList" , payload : data})
},


  },
})

// Action creators are generated for each case reducer function
export const { setisLoader,setUserData, setUserID, setUser ,setJToken,setOrderList,setFCToken,setNewOrder,setCustomerList,setProductItemList,setProductList ,setPendingOrderList,setmessageType,setmessagetitle,setmessagebody,setmessagecancelbtn,setisvisibleMessage} = mainSlice.actions

export default mainSlice.reducer

