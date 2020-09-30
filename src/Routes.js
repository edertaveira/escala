import React from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CustomLoading from "./common/CustomLoading";

const loadHome = Loadable({
  loader: () => import("./components/Home"),
  loading: CustomLoading,
});

const Routes = () => {
  return (
    <Router>
      <Route exact path={"/"} component={loadHome} />
    </Router>
  );
};

export default Routes;
