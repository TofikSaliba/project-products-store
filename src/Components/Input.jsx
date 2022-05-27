import React from "react";

class Input extends React.Component {
  state = { value: "" };

  handleChange = ({ target }) => {
    this.setState({ value: target.value });
    this.props.callBack(target.value, this.props.id);
  };

  componentDidUpdate = () => {
    if (this.props.submitted) {
      this.setState({ value: "" });
    }
  };

  render() {
    return (
      <>
        <input
          id={this.props.id}
          onChange={this.handleChange}
          type={this.props.type}
          placeholder={this.props.holder}
          value={this.state.value}
          required={this.props.required}
        />
      </>
    );
  }
}

export default Input;
