// * Creating the initial State
export const initialState = {
  basket: [],
  user: null,
};

// * Building a Selector
// * Question mark next to basket helps with optional chaining
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

// * Reducer explains how we're able to displatch the action into the dataLayer
// * When we click the [Add to Basket] button
// * And then how do we pull info from the data layer

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in the basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
