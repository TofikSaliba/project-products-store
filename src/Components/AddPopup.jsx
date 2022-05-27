import React from "react";
import Input from "./Input";

class AddPopup extends React.Component {
  state = {
    newProduct: {},
    inputFields: [
      ["productName", "Product Name", "text"],
      ["material", "Material", "text"],
      ["type", "Type", "text"],
      ["description", "Description", "text"],
      ["category", "Category", "text"],
      ["img", "Image URL", "url"],
      ["color", "Color", "text"],
      ["price", "Price", "number"],
    ],
  };

  getInput = (val, key) => {
    this.setState((prev) => {
      return { newProduct: { ...prev.newProduct, [key]: val } };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addProduct(this.state.newProduct);
    this.props.cancelAdd();
  };

  getInputFields = () => {
    return this.state.inputFields.map((field) => {
      return (
        <Input
          key={field[0]}
          id={field[0]}
          type={field[2]}
          callBack={this.getInput}
          holder={field[1]}
          required={true}
        />
      );
    });
  };

  render() {
    return (
      <div className="addPopup">
        <h1 className="popUpHeader">Add A Product Form</h1>
        <form onSubmit={this.handleSubmit} className="addForm">
          {this.getInputFields()}
          <div className="btnsContainer">
            <button onClick={this.props.cancelAdd}>Cancel</button>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddPopup;
