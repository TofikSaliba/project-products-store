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
          id={pro.id}
          proName={pro.productName}
          img={pro.img}
          category={pro.category}
          material={pro.material}
          price={pro.price}
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
        this.setState(
          (prev) => {
            return {
              productArr: [...prev.productArr, data.data],
              isSpinning: false,
            };
          },
          () =>
            this.filterProducts(
              this.state.filterTerm,
              this.state.selectedFilter
            )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // getUpdated = async (newKind, newPhone, newPrice, id) => {
  //   try {
  //     this.setState({ isSpinning: true });
  //     const catToUpdate = this.state.catsArr.find((cat) => cat.id === id);
  //     const updatedCat = {
  //       ...catToUpdate,
  //       kind: newKind,
  //       phone: newPhone,
  //       price: newPrice,
  //     };
  //     const { data, statusText } = await API.put(`/cats/${id}`, updatedCat);
  //     if (statusText === "OK") {
  //       this.setState((prev) => {
  //         return {
  //           catsArr: prev.catsArr.map((cat) => {
  //             if (cat.id === id) {
  //               return data;
  //             }
  //             return cat;
  //           }),
  //           isSpinning: false,
  //         };
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
        {/* <div className="inputHeader">
          <form onSubmit={this.addCat}>
            <Input
              id="name"
              callBack={this.getInput}
              type="text"
              holder="Name"
              value={this.state.catToAdd.name}
            />
            <Input
              id="img"
              callBack={this.getInput}
              type="url"
              holder="Image Url"
              value={this.state.catToAdd.img}
            />
            <Input
              id="kind"
              callBack={this.getInput}
              type="text"
              holder="Kind"
              value={this.state.catToAdd.kind}
            />
            <Input
              id="price"
              callBack={this.getInput}
              type="number"
              holder="Price"
              value={this.state.catToAdd.price}
            />
            <Input
              id="phone"
              callBack={this.getInput}
              type="tel"
              holder="phone"
              value={this.state.catToAdd.phone}
            />
            <button type="submit" disabled={this.state.addDisabled}>
              Add
            </button>
          </form>
        </div> */}
        {this.state.isSpinning ? (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        ) : (
          <div className="catCards">{this.displayProducts()}</div>
        )}
      </>
    );
  }
}

export default Shop;
