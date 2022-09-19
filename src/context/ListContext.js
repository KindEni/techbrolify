//////////////////////////////// IMPLEMENTATION 1 ////////////////////////////////////////////////////

import { createContext, useCallback, useReducer,useEffect } from "react";
// import useDataFetching from "../hooks/useDataFetching";

export  const ListContext = createContext();

const initialState = {
    lists: [],
    list: {},
    loading: true,
    error: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_LISTS_SUCCESS':
            return {
                ...state,
                lists: action.payload,
                loading: false,
            };
        case 'GET_LISTS_ERROR' :
            return {
                ...state,
                lists: [],
                loading: false,
                error: action.payload,
            };
        case 'GET_LIST_SUCCESS' :
            return {
                ...state,
                list: action.payload,
                loading: false
            };
        case 'GET_LIST_ERROR' :
            return {
                ...state,
                list: {},
                loading: false,
                error: action.payload,
            }
            default:
                return state;
    }
}

export const ListContextProvider = ({ children }) => {
    //const [loading, error, data] = useDataFetching('https://my-json-server.typicode.com/KindEni/techbrolify/lists'); here the useDataFetching hook is removed for the useReducer hook

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchList = useCallback(async (listId) => {
        try {
            const data = await fetch(`https://my-json-server.typicode.com/KindEni/techbrolify/lists/${listId}`)

            const result = await data.json();

            if (result) {
                dispatch({type: 'GET_LIST_SUCCESS', payload: result});
            }
        } catch(e) {
            dispatch({type: 'GET_LIST_ERROR', payload: e.message});
        }

    }, [])

    const fetchLists = useCallback(async () => {
        try {
            const data = await fetch('https://my-json-server.typicode.com/KindEni/techbrolify/lists')

            const result = await data.json();

            if (result) {
                dispatch({type: 'GET_LISTS_SUCCESS', payload: result});
            }
        } catch(e) {
            dispatch({type: 'GET_LISTS_ERROR', payload: e.message});
        }

    }, [])

    return (
        <ListContext.Provider value= {{...state, fetchLists, fetchList}}>
            {children}
        </ListContext.Provider>
    );
}

export default ListContext;


////////////////////////////////////// IMPLEMENTATION 2////////////////////////////////////////////////////////

// //import * as React from "react";
// import { createContext, useCallback, useReducer,useEffect } from "react";

// const ListContext = createContext();

// function ListProvider() {

//     const initialState = {
//         lists: [],
//         list: {},
//         loading: true,
//         error: '',
//     }

//   const ListReducer = (state, action) => {

//     switch (action.type) {
//       case "GET_LISTS_SUCCESS":
//         return {
//           ...state,
//           lists: action.payload,
//           loading: false,
//         };
//       case "GET_LISTS_ERROR":
//         return {
//           ...state,
//           lists: [],
//           loading: false,
//           error: action.payload,
//         };
//       case "GET_LIST_SUCCESS":
//         return {
//           ...state,
//           list: action.payload,
//           loading: false,
//         };
//       case "GET_LIST_ERROR":
//         return {
//           ...state,
//           list: {},
//           loading: false,
//           error: action.payload,
//         };
//       default:
//         return state;
//     }
//   };

//   const [state, dispatch] = useReducer(ListReducer, initialState);

//   const value = [state, dispatch];

//   return <ListContext.Provider value={value} />;
// }

// function useList() {
//     const context = React.useContext(ListContext);

//     if(!context) {
//         throw new Error('useList must be used within the ListProvider')
//     }

//     const [state, dispatch] = context;

//    const fetchList = useCallback(async (listId) => {
//          try {
//              const data = await fetch(`https://my-json-server.typicode.com/KindEni/techbrolify/lists/${listId}`)

//              const result = await data.json();

//              if (result) {
//                  dispatch({type: 'GET_LIST_SUCCESS', payload: result});
//              }
//          } catch(e) {
//              dispatch({type: 'GET_LIST_ERROR', payload: e.message});
//          }

//      }, [])

//      const fetchLists = useCallback(async () => {
//          try {
//              const data = await fetch('https://my-json-server.typicode.com/KindEni/techbrolify/lists')

//              const result = await data.json();

//              if (result) {
//                  dispatch({type: 'GET_LISTS_SUCCESS', payload: result});
//              }
//          } catch(e) {
//              dispatch({type: 'GET_LISTS_ERROR', payload: e.message});
//          }

//      }, [])

//      return { state, fetchLists, fetchList };
// }

// export { ListProvider, useList };

// /////////////////////////////////////////////////////////////////  