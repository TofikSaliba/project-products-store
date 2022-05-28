import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { API } from "../../API";
import "./ProductPage.css";

class ProductPage extends Component {
  state = {
    product: null,
    editedProduct: {},
    valid: true,
    editing: false,
    isSpinning: true,
  };

  componentDidMount = async () => {
    try {
      const product = await API.get(`/shoes/${this.props.match.params.id}`);
      this.apiGetPassCheck(product);
    } catch (err) {
      this.setState({ valid: false, product: true, isSpinning: false });
      console.log(err);
    }
  };

  apiGetPassCheck = (product) => {
    if (product.statusText === "OK") {
      this.setState({
        product: product.data,
        editedProduct: product.data,
        isSpinning: false,
      });
    }
  };

  getProductDetails = () => {
    const product = this.state.product;
    const entries = this.filterEntries(product);
    return this.getProductDetailsJSX(product, entries);
  };

  filterEntries = (product) => {
    return Object.entries(product).filter((entry) => {
      return (
        entry[0] !== "id" &&
        entry[0] !== "img" &&
        entry[0] !== "price" &&
        entry[0] !== "productName" &&
        entry[0] !== "description"
      );
    });
  };

  getProductDetailsJSX = (product, entries) => {
    return (
      <>
        {this.getProductName(product)}
        {this.getImg(product)}
        {this.getDescription(product)}
        {this.getFilteredProductJSX(entries)}
        {this.getPrice(product)}
      </>
    );
  };

  getProductName = (product) => {
    return (
      <div className="bolded product-inner-title">
        {this.state.editing ? (
          <input
            onChange={(e) => this.getEditInput(e.target.value, "productName")}
            value={this.state.editedProduct.productName}
            placeholder="New Product Name"
          />
        ) : (
          product.productName
        )}
      </div>
    );
  };

  getImg = (product) => {
    return (
      <>
        <img src={product.img} alt={product.productName} />
        {this.state.editing && (
          <div className="detailField">
            <input
              onChange={(e) => this.getEditInput(e.target.value, "img")}
              value={this.state.editedProduct.img}
              className="imageUrlInput"
              type="url"
              placeholder="New Image URL"
            />
          </div>
        )}
      </>
    );
  };

  getDescription = (product) => {
    return (
      <div>
        <span className="bolded">Description: </span>
        {this.descriptionEditing(product)}
      </div>
    );
  };

  descriptionEditing = (product) => {
    return this.state.editing ? (
      <>
        <br />
        <textarea
          onChange={(e) => this.getEditInput(e.target.value, "description")}
          value={this.state.editedProduct.description}
          placeholder="New Description"
        />
      </>
    ) : (
      product.description
    );
  };

  getFilteredProductJSX = (entries) => {
    return entries.map((entry) => {
      return (
        <div key={entry[0]} className="detailField">
          <span className="bolded">{entry[0]}:&nbsp;</span>
          {this.restOfDetailsEditing(entry)}
        </div>
      );
    });
  };

  restOfDetailsEditing = (entry) => {
    return this.state.editing ? (
      <input
        onChange={(e) => this.getEditInput(e.target.value, entry[0])}
        value={this.state.editedProduct[entry[0]]}
        placeholder={`New ${entry[0]}`}
      />
    ) : (
      entry[1]
    );
  };

  getPrice = (product) => {
    return (
      <div className="detailField">
        <span className="bolded">Price:&nbsp;</span>
        {this.priceEditing(product)}
      </div>
    );
  };

  priceEditing = (product) => {
    return this.state.editing ? (
      <input
        onChange={(e) => this.getEditInput(e.target.value, "price")}
        value={this.state.editedProduct.price.split(".")[0]}
        type="number"
        placeholder="New Price"
      />
    ) : (
      product.price.split(".")[0] + "$"
    );
  };

  startEditing = () => {
    this.setState({ editing: true });
  };

  getEditInput = (value, key) => {
    this.setState((prev) => {
      return { editedProduct: { ...prev.editedProduct, [key]: value } };
    });
  };

  saveEdits = async () => {
    try {
      this.setState({ isSpinning: true });
      const { data, statusText } = await API.put(
        `/shoes/${this.state.product.id}`,
        this.state.editedProduct
      );
      this.checkPutPass(statusText, data);
    } catch (err) {
      console.log(err);
    }
  };

  checkPutPass = (statusText, data) => {
    if (statusText === "OK") {
      this.setState({
        product: data,
        editedProduct: data,
        isSpinning: false,
        editing: false,
      });
    }
  };

  cancelEditing = () => {
    this.setState({ editedProduct: this.state.product, editing: false });
  };

  getEditBtns = () => {
    return (
      <div className="editBtns">
        {this.state.editing ? (
          <>
            <button onClick={this.cancelEditing}>Cancel</button>
            <button onClick={this.saveEdits}>Save</button>
          </>
        ) : (
          <>
            <NavLink to="/products">
              <button>Back</button>
            </NavLink>
            <button onClick={this.startEditing}>Edit</button>
          </>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="productPage">
        {!this.state.valid && (
          <div className="notFound">Product Not Found!</div>
        )}
        {this.state.isSpinning && (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        )}
        {this.state.valid && this.state.product && !this.state.isSpinning && (
          <>
            {this.getProductDetails()}
            {this.getEditBtns()}
          </>
        )}
      </div>
    );
  }
}

export default ProductPage;
