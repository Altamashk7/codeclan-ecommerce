import { lazy, useEffect, useState } from "react";
import axios from "axios";
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        Categories
      </h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        We provide variety
      </p>
      <MiddleBlock data={categories} url="/category" />
    </>
  );
};

export default Categories;
