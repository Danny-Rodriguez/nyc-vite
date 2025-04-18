import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Reviews from "../components/Reviews";
import reviewsData from "../data/reviews.json";

function Product({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  let reviewData;

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      let products;
      let productData;
      await fetch("/products.json")
        .then((res) => res.json())
        .then((data) => (products = data));

      for (let i = 0; i < products.length; i++) {
        if (products[i].id === parseInt(id)) {
          productData = products[i];
        }
      }
      setProduct(productData);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  for (let i = 0; i < reviewsData.length; i++) {
    if (reviewsData[i].id === parseInt(id)) {
      reviewData = reviewsData[i];
    }
  }

  console.log("reviewData", reviewData);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };
  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6 productArea">
          <img
            className="productImg"
            src={product.image}
            alt={product.title}
            height="400px"
            width="auto"
          />
        </div>
        <div className="col-md-6 ">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead fw-bolder">
            Rating {product.rating && product.rating.rate}
            &nbsp;<i className="fa fa-star" style={{ color: "#facc15" }}></i>
          </p>
          <h3 className="display-6 fw-bold my-4">${product.price}</h3>
          <p className="lead">{product.description}</p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </NavLink>
        </div>
        <Reviews product={product?.rating?.rate} rData={reviewData} />
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
}

export default Product;
