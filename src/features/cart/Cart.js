import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import styles from "./Products.module.css";
import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Text,
  Select,
  Center,
} from "@chakra-ui/react";
import { deleteAsyncItem, updateAsyncItem } from "../cart/cartSlice";

export function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  // console.log(items);

  function handleChange(e, id) {
    console.log(e.target.value);
    dispatch(updateAsyncItem({ id, change: { quantity: +e.target.value } }));
  }

  return (
    <>
      <SimpleGrid columns={4} spacingX="40px" spacingY="20px" m={16} p={8}>
        {items.map((item) => (
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image
              src={item.thumbnail}
              alt={item.title}
              h="150px"
              w="full"
              p="2"
              objectFit="contain"
            />
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              {item.title}
            </Box>
            <Box as="h1" color="gray.600" fontWeight="bold">
              $ {item.price}
            </Box>
            <Flex justify="center" align="center" mt={5}>
              <Text fontSize="3xl" m="2">
                {item.quantity}
              </Text>
              <Select
                size="xs"
                value={item.quantity}
                onChange={(e) => handleChange(e, item.id)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </Select>
            </Flex>
            <Button
              w="full"
              bg="red.500"
              color="white"
              _hover={{ color: "red", bg: "white", border: "1px solid red" }}
              m="2"
              onClick={() => dispatch(deleteAsyncItem(item.id))}
            >
              DELETE
            </Button>
          </Box>
        ))}
      </SimpleGrid>
      <Center h="100px" fontSize="5xl">
        Total Price :{" "}
        {items.reduce((acc, item) => item.price * item.quantity + acc, 0)}
      </Center>
    </>
  );
}
