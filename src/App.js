import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { ProSidebarProvider } from 'react-pro-sidebar';
import routes from './routes';
import SidebarMenu from './components/SidebarMenu/SidebarMenu';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from './reducers/index';
import Navbar from './components/Navbar';
import theme from './theme/theme';
import GlobalStyles from './theme/GlobalStyles';
import DefaultLoader from './components/Loader/Loader';

const GeneralLayout = styled.div`
  display: flex;
`;

const AppLayout = styled.div`
  width: 100%;
  background-color: #e8e8e8;
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
                        <SidebarMenu />
                        <AppLayout>
                          <DefaultLoader />
                          <Navbar />
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
