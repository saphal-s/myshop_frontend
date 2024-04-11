import { useState, useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetError } from "../../../../../redux/features/authSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getCategories } from "../../../../../redux/features/categorySlice";
import {
  getProduct,
  productUpdate,
} from "../../../../../redux/features/productSlice";

const UpdateProduct = () => {
  const [states, setStates] = useState({
    title: "",
    price: "",
    size: "",
    category: "",
    quantity: "",
    shipping: "",
  });
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { error } = useSelector((state) => state.product);
  const { categories } = useSelector((state) => state.category);

  const { loading, product } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!loading && product) {
      setStates({
        title: product.title || "",
        price: product.price || "",
        size: product.size || "",
        category: product.category || "",
        quantity: product.quantity || "",
        shipping: product.shipping || "",
      });
      setDescription(product.description || "");
    }
  }, [loading, product]);

  const handleInputChange = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      productUpdate({
        id: params.id,
        formData: {
          title: states.title,
          price: states.price,
          size: states.size,
          category: selectedCategory ? selectedCategory : states.category?._id,
          quantity: states.quantity,
          shipping: states.shipping,
          description: description,
        },
        navigate,
        toast,
      })
    );
  };
  console.log(states.title);
  useEffect(() => {
    if (params.id) {
      dispatch(getProduct(params.id));
    }
    dispatch(getCategories());
  }, [dispatch, params.id]);

  useEffect(() => {
    error && toast.error(error);
    dispatch(resetError());
  }, [error, dispatch]);

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="product_form">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form_label">
          <label>Product title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={states.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form_label">
          <label>Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={states.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form_label">
          <label>Size</label>
          <input
            type="text"
            name="size"
            id="size"
            value={states.size}
            onChange={handleInputChange}
          />
        </div>
        <div className="form_label">
          <label>Category</label>
          <select
            name="category"
            onChange={handleCategoryChange}
            value={selectedCategory ? selectedCategory : states.category?._id}
          >
            {categories &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
          </select>
        </div>
        <div className="form_label">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={states.quantity}
            onChange={handleInputChange}
          />
        </div>
        <div className="form_label">
          <label>Shipping</label>
          <select
            name="shipping"
            id="shipping"
            onChange={handleInputChange}
            defaultValue={product.shipping}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form_label">
          <label>Description</label>
          <ReactQuill
            theme="snow"
            style={{
              backgroundColor: "#fff",
            }}
            value={description}
            onChange={setDescription}
          />
        </div>
        <div className="submit_button">
          <button>Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
