import { atom } from "recoil";

const sideMenuforUser = atom({
  key: "sideMenuforUser",
  default: {
    menuforUser: [
      {
        icon: "Home",
        pathname: "/dashboard",
        title: "Dashboard"
      },
      {
        icon: "Layout",
        pathname: "/order-management",
        title: "Order Management"
      },
      {
        icon: "TrendingUp",
        pathname: "/transaction-history",
        title: "Transaction History"
      },
      {
        icon: "List",
        pathname: "/product-list",
        title: "Product List"
      },
      {
        icon: "Framer",
        pathname: "/create-sales-order",
        title: "Create Sales Order"
      },
      {
        icon: "Grid",
        pathname: "/sales-order-list",
        title: "Sales Order List"
      },
      {
        icon: "Phone",
        pathname: "/help",
        title: "Contact"
      }
    ]
  }
});

export { sideMenuforUser };
