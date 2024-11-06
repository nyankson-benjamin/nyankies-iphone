export const navLinks = [

  {
    name: "Contact",
    path: "/contact",
  },
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Help",
    path: "/help",
  },
  {
    name: "About",
    path: "/about",
  },

];

export const navLinksAdmin = [
  ...navLinks,
  {
    name: "Admin Dashboard",
    path: "/admin/dashboard",
  },
  {
    name: "Add Product",
    path: "/admin/add-product",
  },
  {
    name: "Edit Product",
    path: "/admin/edit-product",
  },
  {
    name: "Delete Product",
    path: "/admin/delete-product",
  },
  
  {
    name: "Orders",
    path: "/orders",
  },
  {
    name: "Customers",
    path: "/customers",
  },
  {
    name: "Analytics",
    path: "/analytics",
  },
];


export const navAuth = [
    ...navLinks,
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Sign Up",
    path: "/register",
  },
  
];
