import React from "react";

class Select extends React.Component {
  state = { val: this.props.default, options: [] };

  onInputChange(newVal) {
    this.setState({ val: newVal });
    this.props.onSelectChange(newVal);
  }

  componentDidMount = () => {
    const optionsJSX = this.props.optionsArr.map((option) => {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });
    this.setState({ options: optionsJSX });
  };

  render() {
    return (
      <>
        <select
          id="mySelect"
          value={this.state.val}
          onChange={(e) => this.onInputChange(e.target.value)}
        >
          {this.state.options}
        </select>
      </>
    );
  }
}

export default Select;
