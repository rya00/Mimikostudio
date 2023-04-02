import React from "react";

function ProductCardRating({ value, color }) {
    console.log(value);
  return (
    <div className="rating">
      <span>{value === null ? '0' : value}</span>

      <span>
        <i
          style={{ color }}
          className="fas fa-star"
        ></i>
      </span>
    </div>
  );
}

export default ProductCardRating;
