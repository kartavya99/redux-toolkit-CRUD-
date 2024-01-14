import React, { useEffect, useState } from "react";
import { Product } from "./features/products/Products";
import { Cart } from "./features/cart/Cart";
import { ChakraProvider, Heading, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncCart } from "./features/cart/cartSlice";

import "./App.css";

function App() {
  const [showCart, setShowCart] = useState(false);
  const items = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncCart());
  }, [dispatch]);

  return (
    <ChakraProvider>
      <div className="App">
        <Heading as="h1" size="4xl" noOfLines={1}>
          Home Page{" "}
          <Button
            direction="row"
            spacing={4}
            align="center"
            colorScheme="twitter"
            onClick={() => setShowCart(!showCart)}
          >
            Show Cart [{items.length}]
          </Button>
        </Heading>

        {showCart ? <Cart /> : <Product />}
      </div>
    </ChakraProvider>
  );
}

export default App;
