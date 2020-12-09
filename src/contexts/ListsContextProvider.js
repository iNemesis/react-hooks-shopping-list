import React from 'react';

export const ListsContext = React.createContext();

const initialValue = {
    lists: [],
    list: {},
    loading: true,
    error: '',
}

const reducer = (value, action) => {
    switch (action.type) {
        case 'GET_LISTS_SUCCESS':
            return {
                ...value,
                lists: action.payload,
                loading: false,
            };
        case 'GET_LISTS_ERROR':
            return {
                ...value,
                lists: [],
                loading: false,
                error: action.payload,
            };
        case 'GET_LIST_SUCCESS':
            return {
                ...value,
                list: action.payload,
                loading: false,
            };
        case 'GET_LIST_ERROR':
            return {
                ...value,
                list: {},
                loading: false,
                error: action.payload,
            };
        default:
            return value;
    }
}

async function fetchData(dataSource) {
    try {
        const data = await fetch(dataSource);
        const dataJSON = await data.json();

        if (dataJSON) {
            return await ({data: dataJSON, error: false})
        }
    } catch(error) {
        return ({data: false, error: error.message})
    }
}

async function postData(dataSource, content) {
    try {
        const data = await fetch(dataSource, {
            method: 'POST',
            body: JSON.stringify(content),
        });
        const dataJSON = await data.json();

        if (dataJSON) {
            return await ({data: dataJSON, error: false})
        }
    } catch (error) {
        return ({data: false, error: error.message});
    }
}

const ListsContextProvider = ({ children, data }) => {
    const [value, dispatch] = React.useReducer(reducer, initialValue);

    const getListsRequest = async () => {
        const result = await fetchData('https://my-json-server.typicode.com/iNemesis/react-hooks-shopping-list/lists')

        if (result.data && result.data.length) {
            dispatch({type: 'GET_LISTS_SUCCESS', payload: result.data});
        } else {
            dispatch({type: 'GET_LISTS_ERROR', payload: result.error});
        }
    }

    const getListRequest = async id => {
        const result = await fetchData(`https://my-json-server.typicode.com/iNemesis/react-hooks-shopping-list/lists/${id}`)

        if (result.data && result.data.hasOwnProperty('id')) {
            dispatch({type: 'GET_LIST_SUCCESS', payload: result.data});
        } else {
            dispatch({type: 'GET_LIST_ERROR', payload: result.error});
        }
    }

    const addListRequest = async (content) => {
        const result = await postData(`https://my-json-server.typicode.com/iNemesis/react-hooks-shopping-list/lists`, content);

        if (result.data && result.data.hasOwnProperty('id')) {
            dispatch({type: 'ADD_LIST_SUCCESS', payload: content});
        } else {
            dispatch({type: 'ADD_LIST_ERROR'});
        }
    }

    return (
        <ListsContext.Provider value={{ ...value, getListsRequest, getListRequest, addListRequest }}>
            {children}
        </ListsContext.Provider>
    )
}

export default ListsContextProvider;
