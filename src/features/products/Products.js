import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsync } from "./productsSlice";
// import styles from "./Products.module.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";

export function Product() {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsync());
  }, [dispatch]);

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        <GridItem w="100%" h="50" gap={6} />
        {products.map((product) => (
          <Card maxW="sm">
            <CardBody>
              <Image
                boxSize="150px"
                src={product.thumbnail}
                alt={product.title}
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{product.title}</Heading>
                <Text>{product.description}</Text>
                <Text color="blue.600" fontSize="2xl">
                  ${product.price}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="ghost" colorScheme="blue">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </>
  );
}
