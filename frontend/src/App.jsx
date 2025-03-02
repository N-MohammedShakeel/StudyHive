// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./Router";

const App = () => {
  return (
    <Router>
      <RouterConfig />
    </Router>
  );
};

export default App;
