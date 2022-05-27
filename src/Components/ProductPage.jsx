import React, { Component } from "react";
import { API } from "../API";

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
      if (product.statusText === "OK") {
        this.setState({
          product: product.data,
          editedProduct: product.data,
          isSpinning: false,
        });
      }
    } catch (err) {
      this.setState({ valid: false, product: true, isSpinning: false });
      console.log(err);
    }
  };

  getProductDetails = () => {
    const product = this.state.product;
    const entries = this.filterEntries(product);
    return this.getProductDetailsJSX(product, entries);
  };

  getProductDetailsJSX = (product, entries) => {
    return (
      <>
        {this.nameAndImageEditOrNot(product)}
        {this.getDescription(product)}
        {this.getFilteredProductJSX(entries)}
        <div className="detailField">
          <span className="bolded">Price: </span>
          {this.state.editing ? (
            <input
              onChange={(e) => this.getEditInput(e.target.value, "price")}
              value={this.state.editedProduct.price.split(".")[0]}
              type="number"
              placeholder="New Price"
            />
          ) : (
            product.price.split(".")[0] + "$"
          )}
        </div>
      </>
    );
  };

  getDescription = (product) => {
    return (
      <div>
        <span className="bolded">Description: </span>
        {this.state.editing ? (
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
        )}
      </div>
    );
  };

  nameAndImageEditOrNot = (product) => {
    return (
      <>
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
        <img src={product.img} alt={product.productName} />
        {this.state.editing && (
          <input
            onChange={(e) => this.getEditInput(e.target.value, "img")}
            value={this.state.editedProduct.img}
            className="imageUrlInput"
            type="url"
            placeholder="New Image URL"
          />
        )}
      </>
    );
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

  getFilteredProductJSX = (entries) => {
    return entries.map((entry) => {
      return (
        <div key={entry[0]} className="detailField">
          <span className="bolded">{entry[0]}: </span>
          {this.state.editing ? (
            <input
              onChange={(e) => this.getEditInput(e.target.value, entry[0])}
              value={this.state.editedProduct[entry[0]]}
              placeholder={`New ${entry[0]}`}
            />
          ) : (
            entry[1]
          )}
        </div>
      );
    });
  };

  startEditing = () => {
    this.setState({ editing: true });
  };

  cancelEditing = () => {
    this.setState({ editedProduct: this.state.product, editing: false });
  };

  getEditInput = (value, key) => {
    this.setState((prev) => {
      return { editedProduct: { ...prev.editedProduct, [key]: value } };
    });
    console.log(key, value);
  };

  saveEdits = async () => {
    try {
      this.setState({ isSpinning: true });
      const { data, statusText } = await API.put(
        `/shoes/${this.state.product.id}`,
        this.state.editedProduct
      );
      if (statusText === "OK") {
        this.setState({
          product: data,
          editedProduct: data,
          isSpinning: false,
          editing: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  getEditBtns = () => {
    return (
      <div className="editBtns">
        {this.state.editing ? (
          <>
            <button onClick={this.saveEdits}>Save</button>
            <button onClick={this.cancelEditing}>Cancel</button>
          </>
        ) : (
          <button onClick={this.startEditing}>Edit</button>
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
