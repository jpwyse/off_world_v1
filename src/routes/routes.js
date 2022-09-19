import { Navigate, Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import WelcomePage from '../pages/WelcomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
//import Account from '../pages/Account';
//import Exchange from '../pages/Exchange';



const routes = (isAuth) => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'welcome', element: <WelcomePage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
      //{ path: 'login', element: isAuth ? <Login /> : <Welcome /> },
      //{ path: 'exchange', element: <Exchange /> },
      //{ path: 'swap', element: <Swap /> },
      //{ path: 'offer', element: <SwapOffer /> },
      //{ path: 'account', element: <Account /> },
    ]
  },
];

export default routes;