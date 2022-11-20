import { useReducer } from "react";
import "./App.css";
import { SELL_MEAT, SELL_VEGETABLE } from "./reducers/actionTypes";
import rootReducer from "./reducers";

function App() {
  const initialState = {
    meat: {
      numOfMeat: 30,
    },
    vegetable: {
      numOfVegetable: 25,
    },
  };

  const [state, dispatch] = useReducer(rootReducer, initialState);

  console.log(state.meat.numOfMeat, state.vegetable.numOfVegetable);

  return (
    <div
      className="App"
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        maxWidth: "620px",
        margin: "0 auto",
        textAlign: "left",
        gap: "12px 8px",
      }}
    >
      <button onClick={() => dispatch({ type: SELL_MEAT })}>sell meat</button>
      <span>Todays Meat {state.meat.numOfMeat}</span>
      <button onClick={() => dispatch({ type: SELL_VEGETABLE })}>
        sell vegetable
      </button>
      <span>Todays Meat {state.vegetable.numOfVegetable}</span>
    </div>
  );
}

export default App;
