import MiddleBlock from "../../components/MiddleBlock";
import { useState, useEffect } from "react";
import axios from "axios";

const Category = (props) => {
  const { id } = props.location.state;

  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://myindianthings-backend.herokuapp.com/categories/${id}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get(
        `https://myindianthings-backend.herokuapp.com/products?category=${id}`
      )
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        {category.name}
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        We provide variety
      </p>
      <MiddleBlock data={products} url="/product" />
    </>
  );
};

export default Category;
