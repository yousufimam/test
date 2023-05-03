import { LOGIN_USER, LOGIN_WITH_AZURE, LOGOUT_USER } from "./actionTypes";
import { Login, LogintoAzure, postAzureLogin } from "../../helpers/backend_helper";
import {
  apiError,
  azureLoginResponseError,
  azureLoginResponseSuccess,
  loginSuccess,
  loginWithAzureError,
  loginWithAzureSuccess
} from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";

import toastr from "toastr";

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(Login, {
      email: user.email,
      password: user.password
    });

    if (response?.accessToken) {
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
      history("/dashboard");
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* loginWithAzure({ payload: history }) {
  try {
    const response = yield call(LogintoAzure);
    if (response?.errorCode === "user_cancelled") {
      yield put(loginWithAzureError(response));
    } else if (response?.errorCode === "interaction_in_progress") {
      yield put(loginWithAzureError(response));
    } else {
      yield put(loginWithAzureSuccess(response));

      const backendResponse = yield call(postAzureLogin, response);


      if (backendResponse?.accessToken && backendResponse?.azure_data) {
        localStorage.setItem("authUser", JSON.stringify(backendResponse));
        history("/admin-panel");
      } else if (backendResponse?.message) {
        toastr.error(backendResponse.message, "Error");
      }
    }
  } catch (error) {
    yield put(loginWithAzureError(error));
  }
}

function* logoutUser({ payload }) {
  try {
    yield localStorage.removeItem("authUser");
    yield payload("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
  yield takeEvery(LOGIN_WITH_AZURE, loginWithAzure);
}

export default authSaga;
