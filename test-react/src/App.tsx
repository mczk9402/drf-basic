import "./App.css";
import { BasicReducer } from "./components/BasicReducer";
import { CompB } from "./components/CompB";
import { CompC } from "./components/CompC";
import React, {
  ContextType,
  createContext,
  Dispatch,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
import { Memo } from "./components/Memo";
import CountDisplay from "./components/CountDisplay";
import CountClick from "./components/CountClick";

export const ADD_COUNT = "add_1";
export const MULTIPLE_COUNT = "multiple_3";
export const RESET = "reset";

const initialState = 1;
const reducer = (currentState: number, action: string) => {
  switch (action) {
    case ADD_COUNT:
      return currentState + 1;
    case MULTIPLE_COUNT:
      return currentState * 3;
    case RESET:
      return initialState;
    default:
      return currentState;
  }
};

const createCtx = <T,>() => {
  const ctx = createContext<T | undefined>(undefined);

  const useCtx = () => {
    const c = useContext(ctx);
    if (!c) throw Error("あたいをいれてください");
    return c;
  };

  return [useCtx, ctx.Provider] as const;
};

export const [useAppContext, AppProvider] = createCtx<{
  count: number;
  dispatch: Dispatch<string>;
}>();

function App() {
  const [count, dispatch] = useReducer(reducer, initialState);
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(1);

  const AddCount1 = useCallback(() => {
    console.log("add関数");
    setCount1((prev) => prev + 1);
  }, []);

  const AddCount2 = () => {
    setCount2((prev) => prev + 1);
  };

  return (
    <AppProvider value={{ count, dispatch }}>
      <CountDisplay name="count1" count={count1} />
      <CountClick handleClick={AddCount1}>AddCount1</CountClick>

      <CountDisplay name="count2" count={count2} />
      <CountClick handleClick={AddCount2}>AddCount2</CountClick>
    </AppProvider>
  );
}

export default App;
