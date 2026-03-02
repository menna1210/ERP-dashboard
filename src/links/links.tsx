export const links = [
  {
    id: 1,
    title: "الصفحه الرئيسيه",
    path: "/",
  },
  {
    id: 2,
    title: "ادارة المخازن",
    path: "/inventory",
    Children: [
      { id: 3, title: "One page inventory", path: "/inventory/page-one" },
      { id: 4, title: "Two page inventory", path: "/inventory/page-two" },
      { id: 5, title: "Three page inventory", path: "/inventory/page-three" },
    ],
  },
  {
    id: 3,
    title: "المنتجات",
    path: "/products",
    Children: [
      { id: 6, title: "One page products", path: "/products/page-one" },
      { id: 7, title: "Two page products", path: "/products/page-two" },
      { id: 8, title: "Three page products", path: "/products/page-three" },
    ],
  },
  {
    id: 4,
    title: "نقل المخازن",
    path: "/stock-transfer",
    Children: [
      {
        id: 9,
        title: "One page stock transfer",
        path: "/stock-transfer/page-one",
      },
      {
        id: 10,
        title: "Two page stock transfer",
        path: "/stock-transfer/page-two",
      },
      {
        id: 11,
        title: "Three page stock transfer",
        path: "/stock-transfer/page-three",
      },
    ],
  },
];
