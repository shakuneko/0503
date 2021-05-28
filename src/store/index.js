import { createContext } from "react";
import useReducerWithThunk from "use-reducer-thunk";
import products from "../json/products.json"
import Cookie from "js-cookie"
import { 
   SET_PAGE_TITLE,
   SET_NAVBAR_ACTIVEITEM,
   ADD_CART_ITEM,
   REMOVE_CART_ITEM,
   SET_PRODUCT_DETAIL,

   BEGIN_LOGIN_REQUEST,
   SUCCESS_LOGIN_REQUEST,
   FAIL_LOGIN_REQUEST,
   LOGOUT_REQUEST,
   REMEMBER_LOGIN,

   BEGIN_REGISTER_REQUEST,
   SUCCESS_REGISTER_REQUEST,
   FAIL_REGISTER_REQUEST,

   SAVE_SHIPPING_ADDRESS,

   BEGIN_ORDER_CREATE,
   SUCCESS_ORDER_CREATE,
   FAIL_ORDER_CREATE,

   BEGIN_ORDER_DETAIL,
   SUCCESS_ORDER_DETAIL,
   FAIL_ORDER_DETAIL,

   BEGIN_UPDATE_USERINFO,
   SUCCESS_UPDATE_USERINFO,
   FAIL_UPDATE_USERINFO,
 } from "../utils/constants"
 

 export const StoreContext = createContext();
 let cartItems = Cookie.getJSON("cartItems")
 ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
    page: {
       title: "Your Home",
       products,
    },
    navBar: {
      activeItem: "/",
      },
      cartItems,
      productDetail: {
      product: {
         image:[],
         color:[]
      },
      qty: 1,
      col:'None',
      colNum:0
  },
 };
 
 function reducer(state, action) {
    switch (action.type) {
       case SET_PAGE_TITLE:
          return {
             ...state,
             page: {
                ...state.page,
                title: action.payload,
             },
          };
          case SET_NAVBAR_ACTIVEITEM:
            return {
               ...state,
               navBar: {
                  activeItem: action.payload
               }
            };

            case ADD_CART_ITEM:
                const item = action.payload;
                const product = state.cartItems.find((x) => x.id === item.id);
                if (product) {
                   cartItems = state.cartItems.map((x) =>
                      x.id === product.id ? item : x
                   );
                   return { ...state, cartItems };
                }
                cartItems = [...state.cartItems, item];
                return { ...state, cartItems };
             case REMOVE_CART_ITEM:
                cartItems = state.cartItems.filter((x) => x.id !== action.payload);
                return { ...state, cartItems };
               case SET_PRODUCT_DETAIL:
                  return { ...state, productDetail:action.payload };
                  
         case BEGIN_LOGIN_REQUEST:
            return { ...state, userSignin: { ...state.userSignin, loading: true } };
            case SUCCESS_LOGIN_REQUEST:
            return {
               ...state,
               userSignin: {
                  ...state.userSignin,
                  loading: false,
                  userInfo: action.payload,
                  error: "",
               },
            };
            case FAIL_LOGIN_REQUEST:
            return {
               ...state,
               userSignin: {
                  ...state.userSignin,
                  loading: false,
                  userInfo: null,
                  error: action.payload,
               },
            };
            case LOGOUT_REQUEST:
               cartItems = [];
               return {
                  ...state,
                  userSignin: {
                     ...state.userSignin,
                     userInfo: null,
                  },
               };
               case REMEMBER_LOGIN:
               return {
                  ...state,
                  userSignin: {
                     ...state.userSignin,
                     remember: action.payload,
                  },
               };
         
         
         case BEGIN_REGISTER_REQUEST:
            return {
               ...state,
               userRegister: { ...state.userRegister, loading: true },
            };
            case SUCCESS_REGISTER_REQUEST:
            return {
               ...state,
               userRegister: {
                  ...state.userRegister,
                  loading: false,
                  userInfo: action.payload,
                  error: "",
               },
               userSignin: {
                  ...state.userSignin,
                  userInfo: action.payload,
               },
            };
            case FAIL_REGISTER_REQUEST:
            return {
               ...state,
               userRegister: {
                  ...state.userRegister,
                  loading: false,
                  userInfo: null,
                  error: action.payload,
               },
            };
            case SAVE_SHIPPING_ADDRESS:
               console.log('action.payload.shippingAddress = ')
               console.log(action.payload)
               return { ...state, cart: { ...state.cart, shippingAddress: action.payload } };
            case SAVE_PAYMENT_METHOD:
               return { ...state, cart: { ...state.cart, paymentMethod: action.payload } };   
               
            case BEGIN_ORDER_CREATE:
            return {
            ...state,
            orderInfo: {
               ...state.orderInfo,
               loading: true,
               success: false,
               }
            };
         case SUCCESS_ORDER_CREATE:
            return {
            ...state,
            orderInfo: {
               ...state.orderInfo,
               loading: false,
               order: action.payload,
               success: true,
               error: null,
               },
            };
         case FAIL_ORDER_CREATE:
            return {
            ...state,
            orderInfo: {
               ...state.orderInfo,
               loading: false,
               order: { id: "" },
               success: false,
               error: action.payload,
               },
            };

            case BEGIN_ORDER_DETAIL:
               return {
                 ...state,
                 orderDetail: {
                   ...state.orderDetail,
                   loading: true,
                 }
               };
             
             case SUCCESS_ORDER_DETAIL:
               return {
                 ...state,
                 orderDetail: {
                   ...state.orderDetail,
                   loading: false,
                   order: action.payload,
                 },
               };
             case FAIL_ORDER_DETAIL:
               return {
                 ...state,
                 orderDetail: {
                   ...state.orderDetail,
                   loading: false,
                   error: action.payload,
                 },
               };

            case BEGIN_UPDATE_USERINFO:
               return { ...state, userSignin: { ...state.userSignin, loading: true } };
            case SUCCESS_UPDATE_USERINFO:
               return {
               ...state,
               userSignin: {
                  ...state.userSignin,
                  loading: false,
                  userInfo: action.payload,
                  error: "",
               },
               };
            case FAIL_UPDATE_USERINFO:
               return {
               ...state,
               userSignin: {
                  ...state.userSignin,
                  loading: false,
                  error: action.payload,
               },
               };

            default:
            return state;
          }
       }
export function StoreProvider(props) {
   const [state, dispatch] = useReducerWithThunk(
      reducer,
      initialState,
      "example"
    );
    const value = { state, dispatch };

   return (
      <StoreContext.Provider value={value}>
         {props.children}
      </StoreContext.Provider>
   );
 }