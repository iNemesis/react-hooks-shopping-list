import React from 'react';
import withDataFetching from '../withDataFetching';

export const ItemsContext = React.createContext();

const ItemsContextProvider = ({ children, data }) => (
    <ItemsContext.Provider value={{ items: data }}>
        {children}
    </ItemsContext.Provider>
);

export default withDataFetching({
    dataSource: 'https://my-json-server.typicode.com/iNemesis/react-hooks-shopping-list/items',
})(ItemsContextProvider);
