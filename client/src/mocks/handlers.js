import { rest } from "msw";

export const productsPageOneMock = {
  products: [
    {
      id: 1,
      name: "Angel Wings Harness",
      description:
        "The purrrfect accessory to take your kitty to the next level.",
      price: "$10.00",
      discountAmount: "$1.00",
      categoryName: "Costumes",
      imageName: "dog-photo_0000.jpg",
      imageDescription: "Wings harness"
    }
  ],
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 2,
  totalItems: 2,
};

export const productsPageTwoMock = {
  products: [
    {
      id: 2,
      name: "Deluxe Carry Bag Orange",
      description: "Backpack-style carry bag with dome.",
      price: "$20.00",
      discountAmount: "$5.00",
      categoryName: "Accessories",
      imageName: "dog-photo_0001.jpg",
      imageDescription: "Deluxe Carry Bag Orange"
    }
  ],
  currentPage: 2,
  totalPages: 2,
  itemsPerPage: 2,
  totalItems: 2,
};

export const reportsMock = {
  categoryReport: [
    {
      categoryName: "Accessories",
      totalProducts: 20,
      discountedProducts: 2,
    },
  ],
  discountReport: [
    {
      discountType: "fixed amount off",
      totalProducts: 2,
    },
  ],
};

export const handlers = [
  rest.get(`${process.env.REACT_APP_API_URL}/products`, (req, res, ctx) => {
    const query = req.url.searchParams;
    const sortOrder = query.get("sortOrder");
    const direction = query.get("direction");
    // http://localhost:5001/api/products?sortOrder=id&direction=asc
    if (sortOrder === "id" && direction === "asc") {
      return res(ctx.json(productsPageOneMock));
    }
    // http://localhost:5001/api/products?sortOrder=description&direction=asc
    if (sortOrder === "description" && direction === "asc") {
      return res(ctx.json(productsPageTwoMock));
    }
    return res(ctx.json(productsPageOneMock));
  }),
  rest.get(`${process.env.REACT_APP_API_URL}/reports`, (req, res, ctx) => {
    return res(ctx.json(reportsMock));
  }),
];
