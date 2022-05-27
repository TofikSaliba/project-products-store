import { NavLink } from "react-router-dom";

const ProductCard = ({ product, handleDelete }) => {
  return (
    <div className="card">
      <div className="name">{product.productName}</div>
      <img src={product.img} alt={product.productName} />
      <div className="detail">
        <span className="label">Category: </span>
        <span>&nbsp;{product.category}</span>
      </div>
      <div>
        <span className="label">Material: </span>
        <span>{product.material}</span>
      </div>
      <div className="detail">
        <span className="label">Price: </span>
        <span>&nbsp;{product.price.split(".")[0] + "$"}</span>
      </div>
      <div className="btnsContainer">
        <NavLink to={`/Products/${product.id}`}>
          <button>More detail</button>
        </NavLink>
        <button onClick={() => handleDelete(product.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;
