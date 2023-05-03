import {
  ADD_NEW_SHIPPING_INFO,
  ADD_NEW_SHIPPING_INFO_FAIL,
  ADD_NEW_SHIPPING_INFO_SUCCESS,
  ADD_NEW_USER,
  ADD_NEW_USER_FAIL,
  ADD_NEW_USER_SUCCESS,
  CLEAR_SHIPPING_INFO,
  DELETE_SHIPPING_INFO,
  DELETE_SHIPPING_INFO_FAIL,
  DELETE_SHIPPING_INFO_SUCCESS,
  DELETE_USER,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  GET_ALL_SHIPPING_INFO,
  GET_ALL_SHIPPING_INFO_FAIL,
  GET_ALL_SHIPPING_INFO_SUCCESS,
  GET_QUANTITY,
  GET_QUANTITY_FAIL,
  GET_QUANTITY_SUCCESS,
  GET_SHIPPING_INFO,
  GET_SHIPPING_INFO_FAIL,
  GET_SHIPPING_INFO_SUCCESS,
  GET_SPECIFIC_USER,
  GET_SPECIFIC_USER_FAIL,
  GET_SPECIFIC_USER_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  QUANTITY_CHANGE,
  RESET_ERROR,
  UPDATE_NEW_USER,
  UPDATE_NEW_USER_FAIL,
  UPDATE_NEW_USER_SUCCESS,
  UPDATE_REMAINING_QUANTITY,
  UPDATE_REMAINING_QUANTITY_FAIL,
  UPDATE_REMAINING_QUANTITY_SUCCESS,
  UPDATE_SHIPPING_INFO,
  UPDATE_SHIPPING_INFO_FAIL,
  UPDATE_SHIPPING_INFO_SUCCESS
} from "./actionTypes";

const initialState = {
  users: {},
  user: null,
  loading: false,
  error: null,
  updated: false,
  added: false,
  deleted: false,
  quantity: null,
  errorQuantity: null,
  updatedQuantity: null,
  shippingInfoUpdated: false,
  shippingInfoAdded: false,
  shippingInfoDeleted: false,
  shippingInfoList: []
};

export default function manageUsersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loading: true,
        updated: false,
        added: false
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload
      };
    case GET_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case GET_SPECIFIC_USER:
      return {
        ...state,
        loading: true,
        updated: false,
        added: false
      };

    case GET_SPECIFIC_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };

    case GET_SPECIFIC_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case ADD_NEW_USER:
      return {
        ...state,
        loading: true,
        added: false
      };
    case ADD_NEW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        added: true,
        quantity: state.quantity - 1
      };
    case ADD_NEW_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        added: false
      };
    case UPDATE_NEW_USER:
      return {
        ...state,
        loading: true,
        updated: false
      };
    case UPDATE_NEW_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: true
      };
    case UPDATE_NEW_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        updated: false
      };
    case DELETE_USER:
      return {
        ...state,
        loading: true,
        deleted: false
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        deleted: true,
        quantity: state.quantity + 1
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        deleted: false
      };

    case GET_QUANTITY:
      return {
        ...state,
        loading: true,
        quantity: 0
      };

    case GET_QUANTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        quantity: action.payload
      };

    case GET_QUANTITY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case QUANTITY_CHANGE:
      return {
        ...state,
        quantity: action.payload
      };

    case UPDATE_REMAINING_QUANTITY:
      return {
        ...state,
        errorQuantity: null,
        updatedQuantity: null
        //success: null
      };
    case UPDATE_REMAINING_QUANTITY_SUCCESS:
      return {
        ...state,
        errorQuantity: null,
        updatedQuantity: action.payload
      };

    case UPDATE_REMAINING_QUANTITY_FAIL:
      return {
        ...state,
        errorQuantity: action.payload,
        updatedQuantity: null
      };
    case RESET_ERROR:
      return {
        ...state,
        errorQuantity: null
      };

    case GET_SHIPPING_INFO:
      return {
        ...state,
        loading: true
      };
    case GET_SHIPPING_INFO_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case GET_SHIPPING_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case ADD_NEW_SHIPPING_INFO:
      return {
        ...state,
        loading: true,
        shippingInfoAdded: false
      };
    case ADD_NEW_SHIPPING_INFO_SUCCESS:
      // // add up in array inside local storage
      // let shippingInfoArray = JSON.parse(localStorage.getItem("shippingInfoArray") || "[]");
      // if (shippingInfoArray) {
      //   shippingInfoArray.push(action.payload);
      //   localStorage.setItem("shippingInfoArray", JSON.stringify(shippingInfoArray));
      // }
      return {
        ...state,
        loading: false,
        shippingInfoAdded: true
      };

    case ADD_NEW_SHIPPING_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        shippingInfoAdded: false
      };

    case UPDATE_SHIPPING_INFO:
      return {
        ...state,
        loading: true,
        shippingInfoUpdated: false
      };

    case UPDATE_SHIPPING_INFO_SUCCESS:
      // let shippingInfoArray3 = JSON.parse(localStorage.getItem("shippingInfoArray") || "[]");
      // if (shippingInfoArray3) {
      //   let shippingInfoItemIndex = shippingInfoArray3.findIndex(
      //     (item) => item.userId === action.payload.userId
      //   );
      //   if (shippingInfoItemIndex > -1) {
      //     shippingInfoArray3[shippingInfoItemIndex] = action.payload;
      //     localStorage.setItem("shippingInfoArray", JSON.stringify(shippingInfoArray3));
      //   } else {
      //     shippingInfoArray3.push(action.payload);
      //     localStorage.setItem("shippingInfoArray", JSON.stringify(shippingInfoArray3));
      //   }
      // }

      return {
        ...state,
        loading: false,
        shippingInfoUpdated: true
      };

    case UPDATE_SHIPPING_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        shippingInfoUpdated: false
      };

    case DELETE_SHIPPING_INFO:
      return {
        ...state,
        loading: true,
        shippingInfoDeleted: false
      };

    case DELETE_SHIPPING_INFO_SUCCESS:
      // // delete from array inside local storage
      // let shippingInfoArray2 = JSON.parse(localStorage.getItem("shippingInfoArray") || "[]");
      // if (shippingInfoArray2) {
      //   let shippingInfoItemIndex = shippingInfoArray2.findIndex(
      //     (item) => item.userId === action.payload.userId
      //   );
      //   if (shippingInfoItemIndex > -1) {
      //     shippingInfoArray2.splice(shippingInfoItemIndex, 1);
      //     localStorage.setItem("shippingInfoArray", JSON.stringify(shippingInfoArray2));
      //   }else {
      //     shippingInfoArray2.push(action.payload);
      //     localStorage.setItem("shippingInfoArray", JSON.stringify(shippingInfoArray2));
      //   }
      // }
      return {
        ...state,
        loading: false,
        shippingInfoDeleted: true
      };

    case DELETE_SHIPPING_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        shippingInfoDeleted: false
      };

    case CLEAR_SHIPPING_INFO:
      return {
        ...state,
        shippingInfoUpdated: false,
        shippingInfoAdded: false,
        shippingInfoDeleted: false,
        error: false
      };

    case GET_ALL_SHIPPING_INFO:
      return {
        ...state,
        shippingInfoList: [],
        loading: true
      };

    case GET_ALL_SHIPPING_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        shippingInfoList: action.payload?.shippingInfo
      };

    case GET_ALL_SHIPPING_INFO_FAIL:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
