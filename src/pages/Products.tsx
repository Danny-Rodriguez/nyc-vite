import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

function Products() {
  const [data, setData] = useState<Product[]>([]);
  const [filter, setFilter] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const componentMounted = useRef(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("/products.json");

      if (componentMounted.current) {
        setData(await response.clone().json());
        setFilter(await response.json());

        setLoading(false);
      }
      return () => {
        componentMounted.current = false;
      };
    };
    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const filterProduct = (cat: string) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="category buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("jewelry")}
          >
            Jewelry
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>
        {filter.map((product, idx) => (
          <div className="col-md-4 col-lg-3 mb-4" key={idx}>
            <div className="card h-100 text-center p-5" key={product.id}>
              <img
                src={product.image}
                className="allProducts card-img-top"
                alt={product.title}
                height="250px"
              />
              <div className="card-body">
                <h5 className="card-title mb-0">
                  {product.title.substring(0, 12)}
                </h5>
                <p className="card-text lead fw-bold">${product.price}</p>
                <NavLink
                  to={`/products/${product.id}`}
                  className="btn btn-outline-dark"
                >
                  Buy Now
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
      <div className="text-center">
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="btn px-5 text-uppercase"
        >
          <i className="bi bi-arrow-up-circle h1"></i>
        </button>
      </div>
    </div>
  );
}

export default Products;
