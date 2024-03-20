import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'antd/dist/antd.min.css';
import { RecoilRoot } from "recoil";
import { ReactFlowProvider } from "reactflow";


ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
   
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
     
    </BrowserRouter>
   
  </RecoilRoot>,
  document.getElementById("root")
);