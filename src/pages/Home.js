import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import Banner from "../components/header/Banner";
import SecondHeader from "../components/header/SecondHeader";
import TopNav from "../components/header/TopNav";
import { getProducts } from "../redux/features/productSlice";

const Home = () => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <TopNav />
      <SecondHeader />
      <Banner />
      <div className="title">
        <h3>All Latest Products</h3>
      </div>

      <div className="product_container">
        {products &&
          products.slice(0, 4).map((p) => <ProductCard key={p._id} p={p} />)}
      </div>
    </>
  );
};

export default Home;
