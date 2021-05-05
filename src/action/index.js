import {
  SET_PAGE_CONTENT,
  SET_NAVBAR_ACTIVEITEM,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  SET_PRODUCT_DETAIL,
} from "../utils/constants";

import products from "../json/products.json";

export const addCartItem = (dispatch, product, qty,color) => {
  const item = {
    id: product.id,
    name: product.name,
    image: product.image,
    price: product.price,
    author:product.author,
    color:product.color,
    countInStock: product.countInStock,
    qty,
    color,
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


export const setProductDetail = (dispatch, productId, qty,color) => {
  const product = products.find(
    x => x.id === productId
  );
  
  if(qty === 0 )
  dispatch({
    type: SET_PRODUCT_DETAIL,
    payload: {
      product,
      color,
    }
  })
  else
  dispatch({
    type: SET_PRODUCT_DETAIL,
    payload: {
      product,
      qty,
      color,
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