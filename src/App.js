import React from "react";
import { Product } from "./features/products/Products";
import { ChakraProvider, Heading, Button } from "@chakra-ui/react";

import "./App.css";

function App() {
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
          >
            Get Products
          </Button>
        </Heading>

        <Product />
      </div>
    </ChakraProvider>
  );
}

export default App;
