import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Reviews from "../components/Reviews";
import reviewsData from "../data/reviews.json";
import type { Product } from "../types/Product";

// Define the props interface for the Product component
interface ProductProps {
  addToCart: (product: Product) => void;
  cart?: Product[];
}

function Product({ addToCart }: ProductProps) {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>({} as Product);
  const [loading, setLoading] = useState(false);
  let reviewData: any;

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      let products: Product[] = [];
      let productData: Product | undefined;

      try {
        const response = await fetch("/products.json");
        products = await response.json();

        // Find the product with matching id
        if (id) {
          productData = products.find((p) => p.id === parseInt(id));
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
      // Only set the product if productData is defined, otherwise use an empty product object
      setProduct(productData || ({} as Product));
      setLoading(false);
    };
    getProduct();
  }, [id]);

  // Find matching review data
  if (id) {
    reviewData = reviewsData.find((review) => review.id === parseInt(id));
  }

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
        <Reviews product={product?.rating?.rate || 0} rData={reviewData} />
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
