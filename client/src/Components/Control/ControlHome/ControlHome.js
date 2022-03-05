import React, { useState } from "react";
import useControlHomeLogic from "./ControlHomeLogic";

const ControlHome = () => {
  const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount"))

  const { controlLevel } = useControlHomeLogic(currentAccount)
  
  return <div>Control Home</div>;
}
export default ControlHome;