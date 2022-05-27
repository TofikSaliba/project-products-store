import React from "react";
import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";
import AddPopup from "./AddPopup";
import { API } from "../API";

class Shop extends React.Component {
  state = {
    productArr: [],
    filteredProducts: [],
    selectedFilter: "productName",
    filterTerm: "",
    productToAdd: { name: "", img: "", kind: "", price: "", phone: "" },
    isSpinning: true,
    adding: false,
  };

  componentDidMount = async () => {
    try {
      const { data } = await API.get("/shoes");
      this.setState({
        productArr: data,
        filteredProducts: data,
        isSpinning: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  displayProducts = () => {
    return this.state.filteredProducts.map((pro) => {
      return (
        <ProductCard
          key={pro.id}
          product={pro}
          handleDelete={this.deleteProduct}
        />
      );
    });
  };

  deleteProduct = async (id) => {
    try {
      this.setState({ isSpinning: true });
      const { statusText } = await API.delete(`/shoes/${id}`);
      if (statusText === "OK") {
        this.deletedProductSetState(id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  deletedProductSetState = (id) => {
    this.setState(
      (prev) => {
        return {
          productArr: prev.productArr.filter((pro) => {
            return pro.id !== id;
          }),
          isSpinning: false,
        };
      },
      () =>
        this.filterProducts(this.state.filterTerm, this.state.selectedFilter)
    );
  };

  filterProducts = (term, selected) => {
    const newFiltered = this.state.productArr.filter((pro) => {
      if (pro[selected].toLowerCase().includes(term.toLowerCase())) {
        return true;
      }
      return false;
    });
    this.setState({
      filteredProducts: newFiltered,
      filterTerm: term,
      selectedFilter: selected,
    });
  };

  cancelAdd = () => {
    this.setState({ adding: false });
  };

  addProduct = async (newProduct) => {
    try {
      this.setState({ isSpinning: true });
      const data = await API.post("/shoes", newProduct);
      if (data.statusText === "Created") {
        this.addProductSetState(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  addProductSetState = (data) => {
    this.setState(
      (prev) => {
        return {
          productArr: [...prev.productArr, data],
          isSpinning: false,
        };
      },
      () =>
        this.filterProducts(this.state.filterTerm, this.state.selectedFilter)
    );
  };

  render() {
    return (
      <>
        {this.state.adding && (
          <AddPopup cancelAdd={this.cancelAdd} addProduct={this.addProduct} />
        )}
        <FilterBar filterProducts={this.filterProducts} />
        <button onClick={() => this.setState({ adding: true })}>
          Add Product
        </button>
        {this.state.isSpinning ? (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="productsCards">{this.displayProducts()}</div>
        )}
      </>
    );
  }
}

export default Shop;
