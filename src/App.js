import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Header from "./Components/Header/Header";
import Shop from "./Components/Shop/Shop";
import ProductPage from "./Components/ProductPage/ProductPage";
import NotFound from "./Components/NotFound/NotFound";

import "./style.css";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <div className="mainContainer">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/Products" component={Shop} />
              <Route exact path="/Products/:id" component={ProductPage} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
