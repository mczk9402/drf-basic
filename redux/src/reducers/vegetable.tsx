import { SELL_VEGETABLE } from "./actionTypes";

const vegetable = (state: any = [], action: any) => {
  switch (action.type) {
    case SELL_VEGETABLE:
      return {
        ...state,
        numOfVegetable: state.numOfVegetable - 1,
      };

    default:
      return state;
  }
  return <div>meat</div>;
};

export default vegetable;
