import AdminPanel from "../views/adminPanel/Main";
import Dashboard from "../views/dashboard/Main";
import ErrorPage from "../views/errorPage/Main";
import Help from "../views/help/Main";
import Login from "../views/login/Main";
import ManageUsers from "../views/manageUsers/Main";
import OrderManagement from "../views/orderManagement/Main";
import Pricing from "../views/plan/Main";
import ProductList from "../views/productList/Main";
import Products from "../views/products/Main";
import Register from "../views/register/Main";
import SalesOrderList from "../views/salesOrderList/Main";
import TransactionHistory from "../views/transactionHistory/Main";
import createSalesOrder from "../views/createSalesOrder/Main";
import profile from "../views/profile/Main";
import review from "../views/review/Main";
import salesOrder from "../views/salesOrder/Main";
import vendor from "../views/vendor/Main";

const authProtectedRoutes = [
  { path: "/", component: Dashboard, role: "customer" },
  { path: "/dashboard", component: Dashboard, role: "customer" },
  { path: "/order-management", component: OrderManagement, role: "customer" },
  { path: "/transaction-history", component: TransactionHistory, role: "customer" },
  { path: "/product-list", component: ProductList, role: "customer" },
  { path: "/sales-order-list", component: SalesOrderList, role: "customer" },
  { path: "/create-sales-order", component: createSalesOrder, role: "customer" },
  // createSalesOrder with reordering
  { path: "/create-sales-order/reorder", component: createSalesOrder, role: "customer" },
  { path: "/help", component: Help, role: "customer" },

  //Admin Routes
  { path: "/admin-panel", component: AdminPanel, role: "admin" },
  { path: "/manage-users", component: ManageUsers, role: "admin" },
  { path: "/plans", component: Pricing, role: "admin" },
  // Products
  { path: "/products", component: Products, role: "admin" },
  {
    path: "/sales-order",
    component: salesOrder,
    role: "admin"
  },
  {
    path: "/contacts",
    component: review,
    role: "admin"
  },
  {
    path: "/vendors",
    component: vendor,
    role: "admin"
  },
  {
    path: "/CustomerProfile",
    component: profile,
    role: "customer"
  },
  {
    path: "/VendorProfile",
    component: profile,
    role: "admin"
  },
  {
    path: "/AdminProfile",
    component: profile,
    role: "admin"
  }
];

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/error-page", component: ErrorPage },
  { path: "*", component: ErrorPage }
];

export { authProtectedRoutes, publicRoutes };
