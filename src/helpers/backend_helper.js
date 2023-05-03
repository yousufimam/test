import * as url from "./url_helper";

import { del, get, patch, post, postformData, postwithnotoken, put } from "./api_helper";

import { PublicClientApplication } from "@azure/msal-browser";
import axios from "axios";
import { config } from "../../Config";

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then((response) => {
      if (response.status >= 200 || response.status <= 299) return response.data;
      throw response.data;
    })
    .catch((err) => {
      var message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message = "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// get OrderManagement
const getOrderManagement = async (params) => await get(url.GET_ORDER_MANAGEMENT + params);

//add OrderManagement
const addNewOrderManagement = (payload) => post(url.ADD_ORDER_MANAGEMENT, payload);

//update OrderManagement
const updateOrderManagement = (payload) =>
  put(url.UPDATE_ORDER_MANAGEMENT + "/" + payload.code, payload);

// delete OrderManagement
const deleteOrderManagement = (payload) => del(url.DELETE_ORDER_MANAGEMENT + "/" + payload.code);

// get TransactionHistory
const getTransactionHistory = async (params) => await get(url.GET_PAYMENT_DETAILS + params);

//add OrderManagement
const addNewTransactionHistory = (payload) => post(url.ADD_PAYMENT_DETAILS, payload);

//update OrderManagement
const updateTransactionHistory = (payload) =>
  put(url.UPDATE_PAYMENT_DETAILS + "/" + payload.code, payload);

// delete OrderManagement
const deleteTransactionHistory = (payload) => del(url.DELETE_PAYMENT_DETAILS + "/" + payload.code);

// get ProductList
const getProductList = async (params) => await get(url.GET_PRODUCT_LIST + params);

//add OrderManagement
const addNewProductList = (payload) => post(url.ADD_PRODUCT_LIST, payload);

//update OrderManagement
const updateProductList = async (payload) =>
  await patch(url.UPDATE_PRODUCT_LIST + "/" + payload.param, payload.data);

// delete OrderManagement
const deleteProductList = async (payload) => await del(url.DELETE_PRODUCT_LIST + "/" + payload);

// get SalesOrderList
const getSalesOrderList = async (params) => await get(url.GET_ORDER_MANAGEMENT + params);

//add SalesOrderList
const addNewSalesOrderList = (payload) => post(url.ADD_ORDER_MANAGEMENT, payload);

//update SalesOrderList
const updateSalesOrderList = (payload) =>
  put(url.UPDATE_ORDER_MANAGEMENT + "/" + payload.code, payload);

// delete SalesOrderList
const deleteSalesOrderList = (payload) => del(url.DELETE_ORDER_MANAGEMENT + "/" + payload);

const addNewContact = (payload) => post(url.ADD_CONTACT, payload);

const getContactList = async (payload) => await get(url.ADD_CONTACT + payload);

const getContactDetails = async (payload) => await get(url.GET_SPECIFIC_CONTACT + "/" + payload);

// Auth Login
const Login = (payload) => postwithnotoken(url.LOGIN, payload);

// get all Orders to Export
const getAllOrders = async () => await get(url.EXPORT_ALL_ORDERS);

// get all transaction to Export
const getAllTransaction = async () => await get(url.EXPORT_ALL_TRANSACTION);

// get Total Orders
const TotalOrders = async () => await get(url.TOTAL_ORDERS);

// get Open Orders
const OpenOrders = async () => await get(url.OPEN_ORDERS);

// get Cancel Orders
const CancelOrders = async () => await get(url.CANCEL_ORDERS);

// get Total Orders Payment
const TotalOrdersPayment = async () => await get(url.TOTAL_ORDER_PAYMENT);

// get Total Orders
const MonthTopProducts = async () => await get(url.MONTH_TOP_PRODUCTS);

const SalesOrderReportHistory = async () => await get(url.SALES_ORDER_REPORT_HISTORY);

const MonthlyOrderReport = async () => await get(url.MONTH_ORDER_REPORT);

const postAzureLogin = async (payload) => await postwithnotoken(url.AZURE_LOGIN, payload);

const LogintoAzure = async () => {
  const PCInstance = new PublicClientApplication({
    auth: {
      clientId: config.appId,
      authority: config.authority,
      redirectUri: config.redirectUri
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true
    }
  });

  const authCodeRequest = {
    scopes: config.scopes,
    redirectUri: config.redirectUri
  };

  return await PCInstance.loginPopup(authCodeRequest)
    .then((response) => response)
    .catch((error) => error);
};

const getUsersCall = async (params) => await get(url.USERS + params);

const updateUserCall = (payload) => patch(url.USERS + "/" + payload.code, payload.data);

const deleteUserCall = (payload) => del(url.USERS + "/" + payload);

const addNewUserCall = (payload) => post(url.USERS, payload);

const uploadImages = (data) => {
  const formData = new FormData();
  data.forEach((file) => {
    formData.append("contactImages", file);
  });

  return postformData(url.UPLOAD_IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then((res) => res)
    .catch((err) => err);
};

const getQuantityCall = async () => await get(url.QUANTITY);

const getPlanCall = async () => await get(url.PLAN);

const updatePlanCall = (payload) => patch(url.UPDATE_PLAN, payload);

const updateRemainingQuantityCall = (payload) => patch(url.UPDATE_REMAINING_QUANTITY, payload);

const uploadProductImageCall = (payload) => {
  const formData = new FormData();
  payload.forEach((file) => {
    formData.append("productImage", file);
  });
  // formData.append("productImage", payload);
  return postformData(url.ADD_PRODUCT_IMAGE, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then((res) => res)
    .catch((err) => err);
};

const updateSalesOrderStatus = async (payload) =>
  await patch(url.UPDATE_SALES_ORDER_STATUS + payload);

const getVendorList = async (params) => await get(url.GET_VENDOR_LIST + params);

const UpdateShippingInfo = async (payload) =>
  await patch(
    url.SHIPPING_INFO + "/" + payload.userId + "/shippingInfo/" + payload.specificInfoId,
    payload.data
  );

const deleteShippingInfo = async (payload) =>
  await del(url.SHIPPING_INFO + "/" + payload.userId + "/shippingInfo/" + payload.specificInfoId);

const AdddShippingInfo = async (payload) =>
  await post(url.SHIPPING_INFO + "/" + payload.userId + "/shippingInfo", payload.data);

const getShippingInfo = async (payload) =>
  await get(url.SHIPPING_INFO + "/" + payload.userId + "/shippingInfo/" + payload.specificInfoId);

const getShippingInfoList = async (payload) =>
  await get(url.SHIPPING_INFO + "/" + payload.userId + "/shippingInfo/");

// /:userId/shippingInfo/:specificInfoId";

export {
  getOrderManagement,
  addNewOrderManagement,
  updateOrderManagement,
  deleteOrderManagement,
  getTransactionHistory,
  addNewTransactionHistory,
  updateTransactionHistory,
  deleteTransactionHistory,
  getProductList,
  addNewProductList,
  updateProductList,
  deleteProductList,
  getSalesOrderList,
  addNewSalesOrderList,
  updateSalesOrderList,
  deleteSalesOrderList,
  addNewContact,
  Login,
  getAllOrders,
  getAllTransaction,
  TotalOrders,
  OpenOrders,
  CancelOrders,
  TotalOrdersPayment,
  MonthTopProducts,
  SalesOrderReportHistory,
  MonthlyOrderReport,
  postAzureLogin,
  LogintoAzure,
  getUsersCall,
  updateUserCall,
  deleteUserCall,
  addNewUserCall,
  uploadImages,
  getQuantityCall,
  getPlanCall,
  updatePlanCall,
  updateRemainingQuantityCall,
  uploadProductImageCall,
  updateSalesOrderStatus,
  getContactList,
  getContactDetails,
  getVendorList,
  UpdateShippingInfo,
  deleteShippingInfo,
  AdddShippingInfo,
  getShippingInfo,
  getShippingInfoList
};
