import { SELL_MEAT } from "./actionTypes";

const meat = (state: any = [], action: any) => {
  switch (action.type) {
    case SELL_MEAT:
      return {
        ...state,
        numOfMeat: state.numOfMeat - 1,
      };
    default:
      return state;
  }
  return <div>meat</div>;
};

export default meat;
