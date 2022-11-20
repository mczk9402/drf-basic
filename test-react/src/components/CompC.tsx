import React, { useContext } from "react";
import { ADD_COUNT, MULTIPLE_COUNT, RESET, useAppContext } from "../App";

export const CompC = () => {
  const { dispatch } = useAppContext();

  return (
    <div>
      <button onClick={() => dispatch(ADD_COUNT)}>Add: + 1</button>
      <button onClick={() => dispatch(MULTIPLE_COUNT)}>multiple: * 3</button>
      <button onClick={() => dispatch(RESET)}>Reset</button>
    </div>
  );
};
