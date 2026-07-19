import {
  FiHome,
  FiPackage,
  FiGrid,
  FiTruck,
  FiShoppingCart,
  FiBarChart2,
  FiUsers,
  FiUser,
} from "react-icons/fi";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: FiHome,
    roles: ["Admin", "Manager", "Cashier", "Viewer"],
  },
  {
    name: "Products",
    path: "/products",
    icon: FiPackage,
    roles: ["Admin", "Manager", "Viewer"],
  },
    {
    name: "Sales",
    path: "/sales",
    icon: FiShoppingCart,
    roles: ["Admin", "Manager", "Cashier"],
  },
  { name: "Purchases",
    path: "/purchases",
    icon: FiPackage,
    roles: ["Admin", "Manager"]

  },

  {
    name: "Suppliers",
    path: "/suppliers",
    icon: FiTruck,
    roles: ["Admin", "Manager"],
  },
  
  {
    name: "Categories",
    path: "/categories",
    icon: FiGrid,
    roles: ["Admin", "Manager"],
  },
  {
    name: "Customers",
    path: "/customers",
    icon: FiTruck,
    roles: ["Admin", "Manager"],
  },

 
  {
    name: "Reports",
    path: "/reports",
    icon: FiBarChart2,
    roles: ["Admin", "Manager"],
  },
  {
    name: "Users",
    path: "/users",
    icon: FiUsers,
    roles: ["Admin"],
  },
  {
    name: "Profile",
    path: "/profile",
    icon: FiUser,
    roles: ["Admin", "Manager", "Cashier", "Viewer"],
  },
  
];

export default navigation;