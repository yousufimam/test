import {
  ADD_NEW_PRODUCT_LIST,
  DELETE_PRODUCT_LIST,
  GET_PRODUCT_LIST,
  UPDATE_PRODUCT_LIST,
  UPLOAD_PRODUCT_IMAGE
} from "./actionTypes";
import {
  addNewProductList,
  deleteProductList,
  getProductList,
  updateProductList,
  uploadProductImageCall
} from "../../helpers/backend_helper";
import {
  addNewProductListFail,
  addNewProductListSuccess,
  deleteProductListFail,
  deleteProductListSuccess,
  getProductListFail,
  getProductListSuccess,
  updateProductListFail,
  updateProductListSuccess,
  uploadProductImageFail,
  uploadProductImageSuccess
} from "./actions";
import { call, put, takeEvery } from "redux-saga/effects";

// ProductList Redux States

//Include Both Helper File with needed methods

function* fetchProductList({ payload: rec }) {
  try {
    const response = yield call(getProductList, rec);
    yield put(getProductListSuccess(response));
  } catch (error) {
    yield put(getProductListFail(error));
  }
}

function* onUpdateProductList({ payload: rec }) {
  try {
    const response = yield call(updateProductList, rec);
    yield put(updateProductListSuccess(response));
  } catch (error) {
    yield put(updateProductListFail(error));
  }
}

function* onAddNewProductList({ payload: rec }) {
  try {
    const response = yield call(addNewProductList, rec);

    yield put(addNewProductListSuccess(response));
  } catch (error) {
    yield put(addNewProductListFail(error));
  }
}

function* onDeleteProductList({ payload: rec }) {
  try {
    const response = yield call(deleteProductList, rec);
    yield put(deleteProductListSuccess(response));
  } catch (error) {
    yield put(deleteProductListFail(error));
  }
}

function* onUploadProductImage({ payload: rec }) {
  try {
    const response = yield call(uploadProductImageCall, rec);
    if (response.data && response.data) {
      yield put(uploadProductImageSuccess(response.data));
    }

    yield put(uploadProductImageSuccess(response.data));
  } catch (error) {
    yield put(uploadProductImageFail(error));
  }
}

function* ProductListSaga() {
  yield takeEvery(GET_PRODUCT_LIST, fetchProductList);
  yield takeEvery(ADD_NEW_PRODUCT_LIST, onAddNewProductList);
  yield takeEvery(UPDATE_PRODUCT_LIST, onUpdateProductList);
  yield takeEvery(DELETE_PRODUCT_LIST, onDeleteProductList);
  yield takeEvery(UPLOAD_PRODUCT_IMAGE, onUploadProductImage);
}

export default ProductListSaga;
