import { render, screen, waitFor } from "@testing-library/react";
import Lists from "./Lists";
import ListContext from "../context/ListContext";
import ItemsContext from "../context/ItemContext";
import { BrowserRouter } from "react-router-dom";

test("When no lists items, display 'loading' on the UI ", async () => {
  const wrapper = ({ children }) => (
    <BrowserRouter>
      <ListContext.Provider
        value={{
          loading: true,
          error: "",
          lists: [],
          fetchLists: jest.fn(),
        }}
      >
        <ItemsContext.Provider
          value={{
            items: [],
            loading: true,
            error: "",
          }}
        >
          {children}
        </ItemsContext.Provider>
      </ListContext.Provider>
    </BrowserRouter>
  );

  render(<Lists />, { wrapper });
  expect(await screen.findByText(/Loading.../i)).toBeInTheDocument;
});

test("The Lists Component Should Render a List ", async () => {
  const wrapper = ({ children }) => (
    <BrowserRouter>
      <ListContext.Provider
        value={{
          loading: false,
          error: "",
          lists: [
            { id: 1, title: "Test list item 3" },
            { id: 2, title: "Test list item 2" },
          ],
          fetchLists: jest.fn(),
        }}
      >
        <ItemsContext.Provider
          value={{
            items: [],
            loading: true,
            error: "",
            fetchItems: jest.fn(),
          }}
        >
          {children}
        </ItemsContext.Provider>
      </ListContext.Provider>
    </BrowserRouter>
  );

  render(<Lists />, { wrapper });
  expect(await screen.queryByText(/Loading.../i)).not.toBeInTheDocument;
  expect(await screen.getAllByRole("link").length).toBe(2);
});

test("does the useEffect datafetching logic works when there is no data ? ", async () => {
  const mockUseEffect = jest.fn();
  const wrapper = ({ children }) => (
    <BrowserRouter>
      <ListContext.Provider
        value={{
          loading: true,
          error: "",
          lists: [],
          fetchLists: mockUseEffect,
        }}
      >
        <ItemsContext.Provider
          value={{
            items: [],
            loading: true,
            error: "",
            fetchItems: jest.fn(),
          }}
        >
          {children}
        </ItemsContext.Provider>
      </ListContext.Provider>
    </BrowserRouter>
  );

  render(<Lists />, { wrapper });
  expect(await screen.queryByText(/Loading.../i)).toBeInTheDocument;
  await waitFor(() => expect(mockUseEffect).toHaveBeenCalledTimes(1));
});
