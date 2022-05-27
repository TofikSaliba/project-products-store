import { NavLink } from "react-router-dom";

const ProductCard = ({
  id,
  proName,
  img,
  category,
  material,
  price,
  handleDelete,
}) => {
  return (
    <div className="card">
      <div className="name">{proName}</div>
      <img src={img} alt={proName} />
      <div className="detail">
        <span className="label">Category: </span>
        <span>&nbsp;{category}</span>
      </div>
      <div>
        <span className="label">Material: </span>
        <span>{material}</span>
      </div>
      <div className="detail">
        <span className="label">Price: </span>
        <span>&nbsp;{price.split(".")[0] + "$"}</span>
      </div>
      <div className="btnsContainer">
        <NavLink to={`/Products/${id}`}>
          <button>More detail</button>
        </NavLink>
        <button onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </div>
  );
};

export default ProductCard;
