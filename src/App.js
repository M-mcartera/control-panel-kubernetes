import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { ProSidebarProvider } from 'react-pro-sidebar';
import routes from './routes';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from './reducers/index';
import theme from './theme/theme';
import GlobalStyles from './theme/GlobalStyles';
import DefaultLoader from './components/Loader/Loader';
import RestyledNavbar from './components/RestyledNavbar';

const GeneralLayout = styled.div`
  display: flex;
`;

const AppLayout = styled.div`
  width: 100%;
  background: #f5f6fa 0 0 no-repeat padding-box;
`;

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer);

const store = createStore(rootReducers, undefined, composedEnhancers);
const App = () => {
  return (
    <Provider store={store}>
      <GeneralLayout>
        <ProSidebarProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <BrowserRouter>
              <Switch>
                {routes.map(route => {
                  return (
                    <Route exact key={route.key} path={route.path}>
                      <>
                        <RestyledNavbar />
                        <AppLayout>
                          <DefaultLoader />
                          {route.content}
                        </AppLayout>
                      </>
                    </Route>
                  );
                })}
              </Switch>
            </BrowserRouter>
          </ThemeProvider>
        </ProSidebarProvider>
      </GeneralLayout>
    </Provider>
  );
};
export default App;
