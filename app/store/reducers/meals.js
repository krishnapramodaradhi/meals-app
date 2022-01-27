import { MEALS } from '../../data/dummy-data';
import { SET_FILTERS, TOGGLE_FAVOURITE } from '../actions/meals';

const INITIAL_STATE = {
  meals: MEALS,
  filteredMeals: MEALS,
  favMeals: [],
};

const mealsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      const existingMeal = state.favMeals.findIndex(
        (meal) => meal.id === action.mealId
      );
      if (existingMeal >= 0) {
        return {
          ...state,
          favMeals: state.favMeals.filter((meal) => meal.id !== action.mealId),
        };
      } else {
        const addedMeal = state.meals.find((meal) => meal.id === action.mealId);
        return {
          ...state,
          favMeals: [...state.favMeals, addedMeal],
        };
      }
    case SET_FILTERS:
      const appliedFilters = action.filters;
      const filteredMeals = state.meals.filter((meal) => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) return false;
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) return false;
        if (appliedFilters.vegan && !meal.isVegan) return false;
        if (appliedFilters.vegetarian && !meal.isVegetarian) return false;
        return true;
      });
      return { ...state, filteredMeals };
    default:
      return state;
  }
};

export default mealsReducer;
