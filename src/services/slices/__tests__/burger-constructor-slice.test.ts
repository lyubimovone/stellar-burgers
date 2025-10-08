import {
  burgerConstructorReducer,
  initialState,
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../burger-сonstructor-slice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const mockMain: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const mockSauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

describe('burgerConstructor slice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('addBun', () => {
    it('должен добавить булку в конструктор', () => {
      const action = addBun(mockBun);
      const state = burgerConstructorReducer(initialState, action);

      expect(state.bun).toEqual(mockBun);
      expect(state.ingredients).toEqual([]);
    });

    it('должен заменить существующую булку новой', () => {
      const newBun: TIngredient = {
        ...mockBun,
        _id: 'new-bun-id',
        name: 'Новая булка'
      };

      const stateWithBun = burgerConstructorReducer(
        initialState,
        addBun(mockBun)
      );
      const state = burgerConstructorReducer(stateWithBun, addBun(newBun));

      expect(state.bun).toEqual(newBun);
    });
  });

  describe('addIngredient', () => {
    it('должен добавить ингредиент в конструктор', () => {
      const action = addIngredient(mockMain);
      const state = burgerConstructorReducer(initialState, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toEqual({
        ...mockMain,
        id: 'test-uuid-1'
      });
    });

    it('должен добавить несколько ингредиентов в конструктор', () => {
      const action1 = addIngredient(mockMain);
      const action2 = addIngredient(mockSauce);

      const state1 = burgerConstructorReducer(initialState, action1);
      const state2 = burgerConstructorReducer(state1, action2);

      expect(state2.ingredients).toHaveLength(2);
      expect(state2.ingredients[0]).toEqual({
        ...mockMain,
        id: 'test-uuid-1'
      });
      expect(state2.ingredients[1]).toEqual({
        ...mockSauce,
        id: 'test-uuid-2'
      });
    });
  });

  describe('removeIngredient', () => {
    it('должен удалить ингредиент из конструктора', () => {
      const stateWithIngredients = burgerConstructorReducer(
        burgerConstructorReducer(initialState, addIngredient(mockMain)),
        addIngredient(mockSauce)
      );

      const ingredientId = stateWithIngredients.ingredients[0].id;
      const action = removeIngredient(ingredientId);
      const state = burgerConstructorReducer(stateWithIngredients, action);

      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]._id).toBe(mockSauce._id);
    });

    it('должен не изменить состояние при удалении несуществующего ингредиента', () => {
      const stateWithIngredients = burgerConstructorReducer(
        initialState,
        addIngredient(mockMain)
      );
      const action = removeIngredient('non-existent-id');
      const state = burgerConstructorReducer(stateWithIngredients, action);

      expect(state).toEqual(stateWithIngredients);
    });
  });

  describe('moveIngredient', () => {
    it('должен изменить порядок ингредиентов в конструкторе', () => {
      const stateWithIngredients = burgerConstructorReducer(
        burgerConstructorReducer(
          burgerConstructorReducer(initialState, addIngredient(mockMain)),
          addIngredient(mockSauce)
        ),
        addIngredient(mockMain)
      );

      const action = moveIngredient({ fromIndex: 0, toIndex: 2 });
      const state = burgerConstructorReducer(stateWithIngredients, action);

      expect(state.ingredients).toHaveLength(3);
      expect(state.ingredients[0]._id).toBe(mockSauce._id);
      expect(state.ingredients[1]._id).toBe(mockMain._id);
      expect(state.ingredients[2]._id).toBe(mockMain._id);
    });

    it('должен не изменить состояние при перемещении на тот же индекс', () => {
      const stateWithIngredients = burgerConstructorReducer(
        burgerConstructorReducer(initialState, addIngredient(mockMain)),
        addIngredient(mockSauce)
      );

      const action = moveIngredient({ fromIndex: 0, toIndex: 0 });
      const state = burgerConstructorReducer(stateWithIngredients, action);

      expect(state).toEqual(stateWithIngredients);
    });
  });

  describe('clearConstructor', () => {
    it('должен очистить весь конструктор', () => {
      const stateWithData = burgerConstructorReducer(
        burgerConstructorReducer(
          burgerConstructorReducer(initialState, addBun(mockBun)),
          addIngredient(mockMain)
        ),
        addIngredient(mockSauce)
      );

      const action = clearConstructor();
      const state = burgerConstructorReducer(stateWithData, action);

      expect(state).toEqual(initialState);
    });
  });
});
