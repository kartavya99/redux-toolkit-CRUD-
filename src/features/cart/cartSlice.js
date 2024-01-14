import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchItems, addItem, updateItem, deleteItem } from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const fetchAsyncCart = createAsyncThunk("cart/fetchItems", async () => {
  const response = await fetchItems();
  return response.data;
});

export const addAsyncItem = createAsyncThunk("cart/addItem", async (item) => {
  const { id, title, brand, thumbnail, price } = item;
  const response = await addItem({
    id,
    title,
    brand,
    thumbnail,
    price,
    quantity: 1,
  });
  return response.data;
});

export const deleteAsyncItem = createAsyncThunk(
  "cart/deleteItem",
  async (id) => {
    const response = await deleteItem(id);
    return response.data;
  }
);

export const updateAsyncItem = createAsyncThunk(
  "cart/updateItem",
  async ({ id, change }) => {
    const response = await updateItem(id, change);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsyncCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(addAsyncItem.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(deleteAsyncItem.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(updateAsyncItem.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      });
  },
});

// export const {} = cartSlice.actions;

export default cartSlice.reducer;
