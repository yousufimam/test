import {
  ADD_NEW_SHIPPING_INFO,
  ADD_NEW_USER,
  DELETE_SHIPPING_INFO,
  DELETE_USER,
  GET_ALL_SHIPPING_INFO,
  GET_QUANTITY,
  GET_SHIPPING_INFO,
  GET_SPECIFIC_USER,
  GET_USERS,
  UPDATE_NEW_USER,
  UPDATE_REMAINING_QUANTITY,
  UPDATE_SHIPPING_INFO
} from "./actionTypes";
import {
  AdddShippingInfo,
  UpdateShippingInfo,
  addNewUserCall,
  deleteShippingInfo,
  deleteUserCall,
  getQuantityCall,
  getShippingInfo,
  getShippingInfoList,
  getUsersCall,
  updateRemainingQuantityCall,
  updateUserCall
} from "../../helpers/backend_helper";
import {
  addNewShippingInfoFail,
  addNewShippingInfoSuccess,
  addNewUserFail,
  addNewUserSuccess,
  deleteShippingInfoFail,
  deleteShippingInfoSuccess,
  deleteUserFail,
  deleteUserSuccess,
  getAllShippingInfoFail,
  getAllShippingInfoSuccess,
  getQuantityFail,
  getQuantitySuccess,
  getShippingInfoFail,
  getShippingInfoSuccess,
  getSpecificUserFail,
  getSpecificUserSuccess,
  getUsersFail,
  getUsersSuccess,
  updateRemainingQuantityFail,
  updateRemainingQuantitySuccess,
  updateShippingInfoFail,
  updateShippingInfoSuccess,
  updateUserFail,
  updateUserSuccess
} from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";

function* fetchUsers(action) {
  try {
    const response = yield call(getUsersCall, action.payload);
    yield put(getUsersSuccess(response.data));
  } catch (error) {
    yield put(getUsersFail(error));
  }
}

function* fetchSpecificUser(action) {
  try {
    const response = yield call(getUsersCall, action.payload);
    yield put(getSpecificUserSuccess(response.data));
  } catch (error) {
    yield put(getSpecificUserFail(error));
  }
}

function* onAddNewUser(action) {
  try {
    const response = yield call(addNewUserCall, action.payload);
    if (response.status === 200 && response.data === "User with this email already exists") {
    }
    yield put(addNewUserSuccess(response));
  } catch (error) {
    yield put(addNewUserFail(error));
  }
}

function* onUpdateUser(action) {
  try {
    const response = yield call(updateUserCall, action.payload);
    yield put(updateUserSuccess(response));
  } catch (error) {
    yield put(updateUserFail(error));
  }
}

function* onDeleteUser(action) {
  try {
    const response = yield call(deleteUserCall, action.payload);
    yield put(deleteUserSuccess(response));
  } catch (error) {
    yield put(deleteUserFail(error));
  }
}

function* getQuantity(action) {
  try {
    const response = yield call(getQuantityCall, action.payload);
    yield put(getQuantitySuccess(response?.data?.usersRemaining));
  } catch (error) {
    yield put(getQuantityFail(error));
  }
}

function* updateRemainingQuantity(action) {
  try {
    const response = yield call(updateRemainingQuantityCall, action.payload);
    // 200 is the status code for success

    if (response?.status === 200) {
      yield put(updateRemainingQuantitySuccess(action.payload.quantity));
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put(updateRemainingQuantityFail(error?.response?.data?.message));
    }
    //  yield put(updateRemainingQuantityFail(error));
  }
}

function* updateShippingInfo(action) {
  try {
    const response = yield call(UpdateShippingInfo, action.payload);
    // 200 is the status code for success

    if (response?.status === 200) {
      yield put(updateShippingInfoSuccess(action.payload));
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put(updateShippingInfoFail(error?.response?.data?.message));
    }
    //  yield put(updateRemainingQuantityFail(error));
  }
}

function* addNewShippingInfo(action) {
  try {
    const response = yield call(AdddShippingInfo, action.payload);
    // 200 is the status code for success

    if (response?.status === 200) {
      yield put(addNewShippingInfoSuccess(action.payload));
    }

    if (response?.status === 400) {
      yield put(addNewShippingInfoFail(response?.data?.message));
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put(addNewShippingInfoFail(error?.response?.data?.message));
    }
    //  yield put(updateRemainingQuantityFail(error));
  }
}

function* delShippingInfo(action) {
  try {
    const response = yield call(deleteShippingInfo, action.payload);
    // 200 is the status code for success

    if (response?.status === 200) {
      yield put(deleteShippingInfoSuccess(action.payload));
    }
  } catch (error) {
    if (error?.response?.status === 400) {
      yield put(deleteShippingInfoFail(error?.response?.data?.message));
    }
    //  yield put(updateRemainingQuantityFail(error));
  }
}

function* fetchShippingInfo(action) {
  try {
    const response = yield call(getShippingInfo, action.payload);
    yield put(getShippingInfoSuccess(response?.data));
  } catch (error) {
    yield put(getShippingInfoFail(error));
  }
}

function* fetchAllShippingInfo(action) {
  try {
    const response = yield call(getShippingInfoList, action.payload);
    yield put(getAllShippingInfoSuccess(response?.data));
  } catch (error) {
    yield put(getAllShippingInfoFail(error));
  }
}

function* manageUsersSaga() {
  yield takeEvery(GET_USERS, fetchUsers);
  yield takeEvery(ADD_NEW_USER, onAddNewUser);
  yield takeEvery(UPDATE_NEW_USER, onUpdateUser);
  yield takeEvery(DELETE_USER, onDeleteUser);
  yield takeEvery(GET_QUANTITY, getQuantity);
  yield takeEvery(UPDATE_REMAINING_QUANTITY, updateRemainingQuantity);
  yield takeEvery(GET_SPECIFIC_USER, fetchSpecificUser);
  yield takeEvery(UPDATE_SHIPPING_INFO, updateShippingInfo);
  yield takeEvery(ADD_NEW_SHIPPING_INFO, addNewShippingInfo);
  yield takeEvery(DELETE_SHIPPING_INFO, delShippingInfo);
  yield takeEvery(GET_SHIPPING_INFO, fetchShippingInfo);
  yield takeEvery(GET_ALL_SHIPPING_INFO, fetchAllShippingInfo);
}

export default manageUsersSaga;
