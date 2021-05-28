import {
  SET_PAGE_CONTENT,
  SET_NAVBAR_ACTIVEITEM,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SET_PRODUCT_DETAIL,

  BEGIN_LOGIN_REQUEST,
  SUCCESS_LOGIN_REQUEST,
  FAIL_LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REMEMBER_LOGIN,
} from "../utils/constants";

import products from "../json/products.json";


import {
  signInWithEmailPassword,
  checkLoginApi,
} from "../api";

export const addCartItem = (dispatch, product, qty,col,colNum) => {
  const item = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    author:product.author,
    countInStock: product.countInStock,
    qty,
    col,
    colNum
  };
  dispatch({
    type: ADD_CART_ITEM,
    payload: item,
  });
};

export const removeCartItem = (dispatch, productId) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: productId,
  });
};


export const setProductDetail = (dispatch, productId, qty,col,colNum) => {
  const product = products.find(
    x => x.id === productId
  );
  
  if(qty === 0 && product.countInStock >0)
      qty = 1;
      if(col==="")col="None";

  dispatch({
    type: SET_PRODUCT_DETAIL,
    payload: {
      product,
      qty,
      col,
      colNum
    }
  })
}


export const pageContentsSet = (dispatch, title, products) => {
  dispatch({
    type: SET_PAGE_CONTENT,
    payload: { title, products },
  });
};

export const activeNavItemSet = (dispatch, activeNavItem) => {
  dispatch({
    type: SET_NAVBAR_ACTIVEITEM,
    payload: activeNavItem,
  });
};


export const loginToFirebase = async (dispatch, userInfo) => {
  dispatch({ type: BEGIN_LOGIN_REQUEST });
  try {
    const user = await signInWithEmailPassword(userInfo.email, userInfo.password);
    dispatch({
      type: SUCCESS_LOGIN_REQUEST,
      payload: user.user.providerData[0],
    })
    return user;
  } catch (e) {
    dispatch({
      type: FAIL_LOGIN_REQUEST,
      payload: e.message
    })
    console.log(e)
    return null;
  }
}

export const rememberLoginUser = (dispatch, remember) => {
  dispatch({
    type: REMEMBER_LOGIN,
    payload: remember,
  })
}

export const checkLogin = (dispatch) => {
  const isLogin = checkLoginApi();
  if(!isLogin) {
    localStorage.removeItem('orderInfo')
    dispatch({ type: LOGOUT_REQUEST });    
  }
  return isLogin;
}