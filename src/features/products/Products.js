import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsync } from "./productsSlice";
import { addAsyncItem } from "../cart/cartSlice";

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";

export function Product() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsync());
  }, [dispatch]);

  return (
    <>
      <SimpleGrid columns={4} spacingX="40px" spacingY="20px" m={4} p={4}>
        {/* <GridItem w="100%" h="50" gap={6} /> */}
        {products.map((product) => (
          <Card maxW="sm" key={product.id} bg="#bcdcf7">
            <CardBody>
              <Image
                boxSize="100px"
                src={product.thumbnail}
                alt={product.title}
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{product.title}</Heading>
                <Text>{product.description}</Text>
                <Text color="black.900" fontSize="2xl">
                  $ {product.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter bg="#4788bf">
              <ButtonGroup spacing="2">
                <Button
                  bg="#edeff2"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => dispatch(addAsyncItem(product))}
                >
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}
