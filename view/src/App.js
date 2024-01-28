import React from 'react';
import { Outlet } from "react-router-dom";

import '../public/reset.scss';
import "./App.scss";

function App() {
  return(
    <div className="container">
      <Outlet />
    </div>
  )
}

export default App;