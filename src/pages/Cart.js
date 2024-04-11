import React, { useEffect, useState, useMemo } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import SecondHeader from "../components/header/SecondHeader";
import TopNav from "../components/header/TopNav";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";

import { PayPalButton } from "react-paypal-button-v2";
import { clearCartItems, removeFromCart } from "../redux/features/productSlice";

const Cart = () => {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.product);
  console.log(items);
  const [state, setState] = useState({
    country: "",
    postcode: "",
    address: "",
    phone: "",
  });

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    // Initialize quantities for all products
    const itemsWithQuantities = items.map((item) => ({
      ...item,
      pquantity: 1, // Initial pquantity set to 1
    }));
    setCartItems(itemsWithQuantities);
  }, []);

  // console.log(cartItems);

  const handleIncrement = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].pquantity += 1;
    setCartItems(updatedCartItems);
  };

  const handleDecrement = (index) => {
    const updatedCartItems = [...cartItems];
    // Ensure ppquantity doesn't go below 1
    if (updatedCartItems[index].pquantity > 1) {
      updatedCartItems[index].pquantity -= 1;
      setCartItems(updatedCartItems);
    }
  };

  const handleProductRemove = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item._id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
    dispatch(removeFromCart(productId));
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.pquantity * item.price,
    0
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    setVisible(true);
  };

  const handleInputChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const changeHandler = (value) => {
    setValue(value);
    state.country = value.label;
  };

  const byeNowHandler = () => {
    navigate("/login");
  };

  const successPaymentHandler = async (paymentResult) => {
    if (paymentResult) {
      // Save order to localStorage
      const order = {
        products: cartItems.map((item) => ({
          _id: item._id,
          title: item.title,
          pquantity: item.pquantity,
          image: item.image,
          totalPrice: item.pquantity * item.price,
        })),
        totalAmount: cartItems.reduce(
          (total, item) => total + item.pquantity * item.price,
          0
        ),
      };

      dispatch(
        createOrder({
          formData: {
            products: order.products,
            name: user?.user.name,
            email: user?.user.email,
            country: state.country,
            postcode: state.postcode,
            address: state.address,
            phone: state.phone,
            totalAmount: order.totalAmount,
            orderdBy: user?.user.id,
          },
          toast,
          navigate,
        })
      );
      // localStorage.setItem("order", JSON.stringify(order));
      // Clear cartItems from localStorage
      localStorage.removeItem("cartItems");
      dispatch(clearCartItems());
    } else {
      toast.error("Payment faild!");
    }
  };

  return (
    <>
      <TopNav />
      <SecondHeader />
      <div className="products">
        {cartItems && cartItems.length >= 1 ? (
          <div className="cart_container">
            <div className="cart_products">
              <h2>Cart/{cartItems.length} Products</h2>
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Shipping</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((p, i) => (
                    <tr key={p._id}>
                      <td>
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${p.image}`}
                          alt="product _image"
                          height={80}
                        />
                      </td>
                      <td>{p.title}</td>
                      <td>$ {p.price}</td>
                      <td>
                        <span>{p.pquantity}</span>
                        &nbsp; &nbsp;
                        <FaPlus
                          onClick={() => handleIncrement(i)}
                          className="qicon"
                        />
                        <FaMinus
                          onClick={() => handleDecrement(i)}
                          className="qicon"
                        />
                      </td>
                      <td>{p.shipping}</td>
                      <td>
                        <MdDeleteForever
                          size={24}
                          className="delt"
                          color="red"
                          onClick={() => handleProductRemove(p._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="product_summary">
              <div className="summary_card">
                <h4>Product Summary</h4>
                <hr />
                {cartItems.map((p, i) => (
                  <div key={i}>
                    <p className="summary_title">
                      {p.title} = {p.price} x {p.pquantity} =
                      {p.price * p.pquantity}
                    </p>
                  </div>
                ))}
                <hr />
                <p className="total">Total Amount: $ {totalAmount}</p>

                {user?.user ? (
                  <>
                    <div className="userDetails">
                      <p className="user_title">Fill up details</p>
                      <form>
                        <div className="formLabel">
                          <label>Name</label>
                          <input
                            type="text"
                            value={user?.user.name || ""}
                            onChange={handleInputChange}
                            name="name"
                          />
                        </div>
                        <div className="formLabel">
                          <label>Email</label>
                          <input
                            type="email"
                            value={user?.user.email || ""}
                            onChange={handleInputChange}
                            name="email"
                          />
                        </div>
                        <div className="formLabel">
                          <label>Country</label>
                          <Select
                            options={options}
                            className="select"
                            value={value}
                            onChange={changeHandler}
                            id="conutry"
                            required
                          />
                        </div>
                        <div className="formLabel">
                          <label>Address</label>
                          <input
                            type="text"
                            name="address"
                            value={state.address}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="formLabel">
                          <label>postcode</label>
                          <input
                            type="text"
                            name="postcode"
                            value={state.postcode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="formLabel">
                          <label>Phone</label>
                          <input
                            type="text"
                            name="phone"
                            value={state.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {user?.user ? (
                  <>
                    {visible ? (
                      <PayPalButton
                        className="pbutton"
                        amount={totalAmount}
                        onSuccess={successPaymentHandler}
                        options={{
                          clientId:
                            "ARDGgVaztmCV3q5aiaBP8PmWfJ3iW6e4QQahPf1M9pd-RMjlcgrmohER8uvkO2mfHnLhsb_UAshamFMx",
                          currency: "USD",
                        }}
                      />
                    ) : (
                      <button onClick={handleProceedToPayment}>
                        Proceed to Payment
                      </button>
                    )}
                  </>
                ) : (
                  <button onClick={byeNowHandler}>Buy Now</button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="continue">
            No items in cart.{" "}
            <Link to="/product/all">Please continue to shopping</Link>
          </p>
        )}
      </div>
    </>
  );
};

export default Cart;
