import React from "react";
import Input from "./Input";
import Select from "./Select";

class FilterBar extends React.Component {
  state = {
    value: "",
    selected: "productName",
    options: ["productName", "category", "material", "price"],
  };

  handleInput = (value, id) => {
    this.setState({ value: value });
    this.props.filterProducts(value, this.state.selected);
  };

  getSelectVal = (newSelected) => {
    this.setState({ selected: newSelected });
    this.props.filterProducts(this.state.value, newSelected);
  };

  render() {
    return (
      <div className="filterBox">
        <Input
          id="filter"
          callBack={this.handleInput}
          type="text"
          holder="Filter Products"
          required={false}
          submitted={false}
        />
        <Select
          onSelectChange={this.getSelectVal}
          optionsArr={this.state.options}
        />
      </div>
    );
  }
}

export default FilterBar;
