import React, { useState, useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";
import SecondHeader from "../components/header/SecondHeader";
import TopNav from "../components/header/TopNav";
import {
  addToCart,
  getProductDetails,
  getRelatedProducts,
} from "../redux/features/productSlice";
import { Tooltip } from "antd";

const ProductDetail = () => {
  const [toolTip, setToolTip] = useState("Click to add.");

  const { details, relatedProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    if (params.id && params.slug) {
      dispatch(getProductDetails({ slug: params.slug, id: params.id }));
    }
    if (params.id) {
      dispatch(getRelatedProducts({ productId: params.id }));
    }
  }, [dispatch, params.id, params.slug]);

  const handleAddToCart = () => {
    dispatch(addToCart(details));
    setToolTip("Product added.");
  };

  return (
    <>
      <TopNav />
      <SecondHeader />
      <div className="detail_container">
        <div className="image_content">
          <div className="left_section">
            <div className="image">
              <img
                src={`${process.env.REACT_APP_API_URL}/${details.image}`}
                alt="product_image"
              />
            </div>
          </div>
          <div className="right_section">
            <h5>{details.title}</h5>
            <p>Rs. {details.price}</p>
            <p>Shipping: {details.shipping}</p>
            <p>Size: {details.size}</p>
            <br />
            <hr />
            <div className="details_buttons">
              <button>Buy Now</button>
              <Tooltip placement="top" title={toolTip}>
                <button onClick={handleAddToCart}>Add to Cart</button>
              </Tooltip>
            </div>
          </div>
        </div>
        <hr />
        <div className="details">{ReactHtmlParser(details.description)}</div>
        <hr />
        <div className="related_product">
          <h4>Related Products</h4>
          <div className="related_products">
            {relatedProducts &&
              relatedProducts.map((p) => <ProductCard key={p._id} p={p} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
