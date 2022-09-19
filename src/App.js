import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import {ErrorBoundary} from 'react-error-boundary';
import { authenticate } from './redux/actions/auth';
import routes from './routes/routes';
import ErrorMessage from './elements/ErrorMessage';


const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const routing = useRoutes(routes(isAuth));

  useEffect(() => {
    dispatch(authenticate());
  }, []);


  return (
    <React.Fragment>
      <SnackbarProvider hideIconVariant>
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          {routing}
        </ErrorBoundary>
       </SnackbarProvider>
    </React.Fragment>
  );
};

export default App;

