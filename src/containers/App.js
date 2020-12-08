import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header/Header';
import Lists from './Lists';
import List from './List';
import Form from './Form';
import ListsContextProvider, { ListsContext } from '../contexts/ListsContextProvider';
import ItemsContextProvider, { ItemsContext } from '../contexts/ItemsContextProvider';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const AppWrapper = styled.div`
  text-align: center;
`;

const App = () => (
  <>
    <GlobalStyle />
    <AppWrapper>
      <Header />
      <ListsContextProvider>
        <ItemsContextProvider>
          <ListsContext.Consumer>
            {({ lists, loading: listsLoading, error: listsError, getListsRequest }) => (
              <ItemsContext.Consumer>
                {({items}) => (
                  <Switch>
                    <Route exact path='/' render={props => lists && <Lists lists={lists} loading={listsLoading} error={listsError} getListsRequest={getListsRequest} {...props} />} />
                    <Route path='/list/:id/new' component={Form} />
                    <Route path='/list/:id' render={props => lists && items && <List lists={lists} listItems={items} {...props} />} />
                  </Switch>
                )}
              </ItemsContext.Consumer>
            )}
          </ListsContext.Consumer>
        </ItemsContextProvider>
      </ListsContextProvider>
    </AppWrapper>
  </>
);

export default App;
