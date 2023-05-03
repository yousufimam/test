import { all, fork } from "redux-saga/effects";

import DashboardSaga from "./dashboard/saga";
import HelpSaga from "./help/saga";
import ManageUsersSaga from "./manageUsers/saga";
import OrderManagementSaga from "./orderManagement/saga";
import PlanSaga from "./plan/saga";
import ProductListSaga from "./productList/saga";
import SalesOrderListSaga from "./salesOrderList/saga";
import TransactionHistorySaga from "./transactionHistory/saga";
import authSaga from "./login/saga";
import vendorSaga from "./vendor/saga";

//public

export default function* rootSaga() {
  yield all([
    //public
    fork(OrderManagementSaga),
    fork(TransactionHistorySaga),
    fork(ProductListSaga),
    fork(SalesOrderListSaga),
    fork(HelpSaga),
    fork(authSaga),
    fork(DashboardSaga),
    fork(ManageUsersSaga),
    fork(PlanSaga),
    fork(vendorSaga)
  ]);
}
