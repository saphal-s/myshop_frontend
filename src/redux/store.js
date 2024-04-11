import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import CategroyReducer from "./features/categorySlice";
import ProductReducer from "./features/productSlice";
import BannerReducer from "./features/bannerSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    category: CategroyReducer,
    product: ProductReducer,
    banner: BannerReducer,
  },
});
