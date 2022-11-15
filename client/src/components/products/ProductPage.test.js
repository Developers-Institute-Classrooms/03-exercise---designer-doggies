import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductPage from "./ProductPage";
import {
  productsPageOneMock,
  productsPageTwoMock,
} from "../../mocks/handlers.js";

const setup = () => render(<ProductPage />);

beforeEach(async () => {
  // await waitForElementToBeRemoved(() => screen.queryByTitle(/loading/i));
});

describe("ProductPage", () => {
  test("Expect the combo box sort to render", () => {
    setup();
    const combo = screen.getByRole("combobox", { name: "Sort" });
    expect(combo).toBeInTheDocument();
  });

  test("Expect the combo box order to render", () => {
    setup();

    const combo = screen.getByRole("combobox", { name: "Order" });
    expect(combo).toBeInTheDocument();
  });

  test("WHEN the user changes the sort order of the products page THEN the order of dogs will change appropriately", async () => {
    setup();

    const products1 = productsPageOneMock.products;
    await waitFor(() => {
      products1.forEach(product => {
        expect(
          screen.getByText(product.name)
        ).toBeInTheDocument();
      })
    });

    userEvent.selectOptions(
      screen.getByRole('combobox', { name: "Sort" }),
      screen.getByRole('option', {name: 'Description'}),
    );
    const products2 = productsPageTwoMock.products;

    await waitFor(() => {
      products2.forEach(product => {
        expect(
          screen.getByText(product.name)
        ).toBeInTheDocument();
      })
    });
  })
});
