import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store, { persistor } from './store/store';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Items from './pages/characters/Items';
import CalendarPage from './pages/calendar/CalendarPage';
import MyItems from './pages/characters/MyItems';
import CharactersList from './pages/characters/CharactersList';
import Root from './pages/characters/Root';
import { LoginRegister } from 'pages/login/LoginRegister';
import { Main } from 'pages/main/Main';
import Admin from './pages/admin/admin';
import { MyPage } from 'pages/mypage/UserMyPage';
import { PersistGate } from 'redux-persist/integration/react';
import { NotFound } from 'pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/login',
    element: <LoginRegister />,
  },
  {
    path: '/calendar',
    element: <CalendarPage />,
  },
  {
    path: '/calendar/todos/:dates',
    element: <CalendarPage />,
  },
  {
    path: '/store',
    element: <Root />,
    errorElement: <p>페이지를 찾을 수 없습니다😭</p>,
    children: [
      { index: true, element: <Items></Items> },
      { path: '/store/item/:id', element: <Items></Items> },
      { path: '/store/characters', element: <CharactersList></CharactersList> },
      {
        path: '/store/characters/:id',
        element: <CharactersList></CharactersList>,
      },
      { path: '/store/myitems', element: <MyItems></MyItems> },
      { path: '/store/myitems/:id', element: <MyItems></MyItems> },
    ],
  },
  {
    path: '/admin/*',
    element: <Admin />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <App />
    </Provider>
  </React.StrictMode>,
);
