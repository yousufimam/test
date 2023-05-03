import { atom } from "recoil";

const sideMenuforAdmin = atom({
  key: "sideMenuforAdmin",
  default: {
    menuforAdmin: [
      {
        icon: "Home",
        pathname: "/admin-panel",
        title: "Admin Panel"
      },
      {
        icon: "Layout",
        pathname: "/manage-users",
        title: "Manage Users"
      },
      {
        icon: "DollarSign",
        pathname: "/plans",
        title: "Plans & Pricing"
      },
      {
        icon: "ShoppingBag",
        pathname: "/products",
        title: "Products"
      },
      {
        icon: "Box",
        pathname: "/sales-order",
        title: "Sales Order"
      },
      {
        icon: "Phone",
        pathname: "/contacts",
        title: "Contacts"
      },
      {
        icon: "Grid",
        pathname: "/vendors",
        title: "Customers"
      }
    ]
  }
});

export { sideMenuforAdmin };
