import {
  burgerConstructorReducer,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from './burger-constructor';
import { TIngredient } from '../../utils/types';

describe('burgerConstructor slice', () => {
  const bun: TIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 1,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const ingredientA: TIngredient = { ...bun, _id: '2', name: 'A', type: 'main' };
  const ingredientB: TIngredient = { ...bun, _id: '3', name: 'B', type: 'main' };

  it('should handle addIngredient', () => {
    const state = burgerConstructorReducer(undefined, addIngredient(bun));
    expect(state.bun).toEqual(expect.objectContaining({ _id: '1' }));
  });

  it('should remove ingredient', () => {
    const action = addIngredient(ingredientA);
    let state = burgerConstructorReducer(undefined, action);
    state = burgerConstructorReducer(state, removeIngredient(action.payload.id));
    expect(state.ingredients).toHaveLength(0);
  });

  it('should move ingredient up', () => {
    const first = addIngredient(ingredientA);
    const second = addIngredient(ingredientB);
    let state = burgerConstructorReducer(undefined, first);
    state = burgerConstructorReducer(state, second);
    state = burgerConstructorReducer(state, moveIngredientUp(1));
    expect(state.ingredients[0].id).toEqual(second.payload.id);
  });

  it('should move ingredient down', () => {
    const first = addIngredient(ingredientA);
    const second = addIngredient(ingredientB);
    let state = burgerConstructorReducer(undefined, first);
    state = burgerConstructorReducer(state, second);
    state = burgerConstructorReducer(state, moveIngredientDown(0));
    expect(state.ingredients[1].id).toEqual(first.payload.id);
  });
});
