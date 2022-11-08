import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { ProSidebarProvider } from 'react-pro-sidebar';
import routes from './routes';
import Nav from './components/Nav';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from './reducers/index';

const GeneralLayout = styled.div`
  display: flex;
`;

const AppLayout = styled.div`
  padding: 0 0 0 10px;
`;

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer);

const store = createStore(rootReducers, undefined, composedEnhancers);
const App = () => {
  return (
    <Provider store={store}>
      <GeneralLayout>
        <ProSidebarProvider>
          <ThemeProvider theme={{}}>
            <BrowserRouter>
              <Switch>
                {routes.map(route => {
                  return (
                    <Route exact key={route.key} path={route.path}>
                      <>
                        <Nav />
                        <AppLayout>{route.content}</AppLayout>
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
