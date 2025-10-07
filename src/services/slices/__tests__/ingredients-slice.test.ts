import { ingredientsReducer, getIngredients } from '../ingredients-slice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
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
  },
  {
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
  }
];

describe('ingredients slice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('должен возвращать начальное состояние', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('getIngredients async thunk', () => {
    it('должен обрабатывать pending состояние', () => {
      const action = { type: getIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
      expect(state.ingredients).toEqual([]);
    });

    it('должен обрабатывать fulfilled состояние', () => {
      const action = {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.ingredients).toEqual(mockIngredients);
    });

    it('должен обрабатывать rejected состояние', () => {
      const errorMessage = 'Ошибка загрузки ингредиентов';
      const action = {
        type: getIngredients.rejected.type,
        error: { message: errorMessage }
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.ingredients).toEqual([]);
    });

    it('должен обрабатывать rejected состояние без сообщения об ошибке', () => {
      const action = {
        type: getIngredients.rejected.type,
        error: {}
      };
      const state = ingredientsReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки ингредиентов');
      expect(state.ingredients).toEqual([]);
    });

    it('должен очищать ошибку при новом запросе', () => {
      const stateWithError = {
        ...initialState,
        error: 'Предыдущая ошибка'
      };

      const action = { type: getIngredients.pending.type };
      const state = ingredientsReducer(stateWithError, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('должен заменять существующие ингредиенты при успешной загрузке', () => {
      const stateWithIngredients = {
        ...initialState,
        ingredients: [mockIngredients[0]]
      };

      const action = {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const state = ingredientsReducer(stateWithIngredients, action);

      expect(state.ingredients).toEqual(mockIngredients);
    });
  });
});
