import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Hello from "./components/Hello";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import TableIndex from "./components/tableIndex";
import React from "react";
import Navigator from "./components/navigator";
import Modify3in from "./components/mod3in";
import ChangePassword from "./components/chngPW";

function App() {
  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Navigator scopeInUp={"index"} />
        <Route path="/" exact={true} component={Hello} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/scope3in" component={TableIndex} />
        <Route path="/mod3in" component={Modify3in} />
        <Route path="/chngPW" component={ChangePassword} />
      </BrowserRouter>
    </div>
  );
}

export default App;
