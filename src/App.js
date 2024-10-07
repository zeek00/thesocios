import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Loading, RouteGuard } from './router';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from "./store/actions";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {routes} from './routes';


const App = () => {
  const [loading, setLoading] = useState(true);
  const { loading: authLoading, userData } = useSelector((state) => ({
    loading: state.auth.initialising,
    userData: state.auth.userData,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.checkAuthState());
    setLoading(authLoading);
  }, [authLoading, dispatch]);

  if (loading || authLoading) {
    return <Loading />;
  }

  return (
      <Switch>
        {routes.map((route, i) =>
            route.guarded ? (
                <RouteGuard key={i} {...route} userData={userData} />
            ) : (
                <Route key={i} {...route} />
            )
        )}
        <Redirect
            to={{
              pathname: "/dashboard",
              state: {
                from: "/",
              },
            }}
        />
      </Switch>
  );
};

export default App;
