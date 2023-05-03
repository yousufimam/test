import DashboardReducer from "./dashboard/reducer";
import HelpReducer from "./help/reducer";
import LoginReducer from "./login/reducer";
import ManageUsersReducer from "./manageUsers/reducer";
import OrderManagementReducer from "./orderManagement/reducer";
import PlanReducer from "./plan/reducer";
import ProductListReducer from "./productList/reducer";
import SalesOrderListReducer from "./salesOrderList/reducer";
import TransactionHistoryReducer from "./transactionHistory/reducer";
import VendorReducer from "./vendor/reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  OrderManagementReducer,
  TransactionHistoryReducer,
  ProductListReducer,
  SalesOrderListReducer,
  HelpReducer,
  LoginReducer,
  DashboardReducer,
  ManageUsersReducer,
  PlanReducer,
  VendorReducer
});

export default rootReducer;
