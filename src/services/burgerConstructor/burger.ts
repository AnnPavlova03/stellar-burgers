import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { getIngredients } from './actions';

interface BurgerState {
  burger: TIngredient[];
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  listIngredients: string[];
  status: boolean;
}
type MoveIngredient = {
  fromIndex: number;
  toIndex: number;
};

const initialState: BurgerState = {
  burger: [],
  constructorItems: {
    bun: null,
    ingredients: []
  },
  listIngredients: [],
  status: false
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      // чем такой вариант реализации добавления элемента приемлимей или лучше чем вариант снизу файла?
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    handleMoveElement: (state, action: PayloadAction<MoveIngredient>) => {
      const ingredients = [...state.constructorItems.ingredients];
      const { fromIndex, toIndex } = action.payload;
      ingredients.splice(toIndex, 0, ingredients.splice(fromIndex, 1)[0]);
      state.constructorItems.ingredients = ingredients;
    },
    setListIngredients: (state) => {
      const bunId = state.constructorItems.bun?._id;
      const ingredientsIds = state.constructorItems.ingredients.map(
        (item) => item._id
      );
      if (bunId) {
        state.listIngredients = [bunId, ...ingredientsIds, bunId];
      }
    },
    clearListIngredients: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  },

  selectors: {
    getBurgerIngredients: (state) => state.burger,
    getConstructorItems: (state) => state.constructorItems,
    getIngredientList: (state) => state.listIngredients,
    statusLoading: (state) => state.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.burger = action.payload;
        state.status = false;
      });
  }
});
export const {
  addIngredient,
  removeIngredient,
  handleMoveElement,
  setListIngredients,
  clearListIngredients
} = burgerConstructorSlice.actions;
export const {
  getBurgerIngredients,
  getConstructorItems,
  getIngredientList,
  statusLoading
} = burgerConstructorSlice.selectors;

// addIngredient: (action, state) => {
//   if (action.payload.type === 'bun') {
//     state.constructorItems.bun = action.payload;
//   } else {
//     const newIngredient = {
//       ...action.payload,
//       id: Math.random().toString()
//     };

//     state.constructorItems.ingredients.push(newIngredient);
//   }
// };
