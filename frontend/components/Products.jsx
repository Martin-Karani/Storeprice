import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/Products.module.css";
import Samsung from "../public/samsung.jpeg";
import Empty from "./Empty";

import { AuthContext } from "./context/auth";

function Products({ products }) {
  const { selectedProducts, toggleSelected, setSelectedProducts } =
    useContext(AuthContext);

  const handleChange = (e, productId) => {
    // e.preventDefault();
    if (e.target.checked) {
      let newSelectedProducts = [...selectedProducts];
      newSelectedProducts.unshift({
        name: e.target.name,
        productId: productId,
      });

      setSelectedProducts(newSelectedProducts);
    } else {
      let newSelectedProducts = selectedProducts.filter(
        (product) => !(product.name === e.target.name)
      );

      setSelectedProducts(newSelectedProducts);
    }
  };

  return (
    <div className={styles["products"]}>
      {products && products.length > 0 ? (
        products.map((product) => (
          <div className={styles["products__item"]} key={product._id}>
            <Link href={`/product/${product.name}`}>
              <div>
                <figure className="img-wrapper">
                  <Image src={Samsung} alt={product.name + "image"} />
                </figure>
                <div className={styles["products__item-details"]}>
                  <h3 className={styles["products__item-name"]}>
                    {product.name}
                  </h3>
                  <p className={styles["products__item-specs"]}></p>
                  <p className={styles["products__item-price"]}>
                    KSH {product.lowestPrice}
                  </p>
                </div>
              </div>
            </Link>
            <div className={styles["product-tags"]}>
              {product.tags &&
                product.tags.length > 0 &&
                product.tags.map((tag, index) => (
                  <span className={styles["product-tag"]} key={index}>
                    {tag}
                  </span>
                ))}
            </div>

            {toggleSelected && (
              <label className={styles["compare-selector"]}>
                <input
                  type="checkbox"
                  onClick={(e) => handleChange(e, product._id)}
                  name={product.name}
                />
                <span></span>
              </label>
            )}
          </div>
        ))
      ) : (
        <Empty error="Working on category product" />
      )}
    </div>
  );
}

export default Products;
