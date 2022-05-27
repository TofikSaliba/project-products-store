import React from "react";

class NotFound extends React.Component {
  componentDidMount = () => {
    this.props.history.push("/404");
  };

  render() {
    return (
      <div className="notFound">
        <h1>Error 404: Page Not Found!</h1>
      </div>
    );
  }
}

export default NotFound;
