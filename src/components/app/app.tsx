import { FC, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  IngredientDetailsPage,
  OrderInfoPage,
  NotFound404
} from '@pages';

import {
  AppHeader,
  Modal,
  IngredientDetails,
  OrderInfo,
  ProtectedRoute
} from '@components';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { selectIsAuth } from '../../services/selectors/user';
import { fetchUser } from '../../services/slices/user';

const AppRoutes: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { background?: Location } | undefined;

  const closeModal = () => navigate(-1);

  const OrderInfoModal: FC = () => {
    const { number } = useParams<{ number: string }>();
    return (
      <Modal onClose={closeModal} title={`#${number}`}>
        <OrderInfo />
      </Modal>
    );
  };

  return (
    <>
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfoPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfoPage />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {state?.background && (
        <Routes>
          <Route path='/feed/:number' element={<OrderInfoModal />} />
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={closeModal} title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfoModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    if (!isAuth && localStorage.getItem('refreshToken')) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuth]);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
