import React, { useEffect } from "react"
import { render } from "react-dom"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

require("babel-core/register")
require("babel-polyfill")


render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
)
