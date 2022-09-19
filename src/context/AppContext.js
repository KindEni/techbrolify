import { ListContextProvider } from "./ListContext";
import { ItemsContextProvider } from "./ItemContext";

const AppContext = ({ children }) => {
    return (
        <ListContextProvider>
            <ItemsContextProvider>
                {children}
            </ItemsContextProvider>
        </ListContextProvider>
    )
}

export default AppContext;


//////////////////// 2ND IMPLEMENTATION ////////////////////

// import { ListProvider } from "./ListContext";
// import { ItemsContextProvider } from "./ItemContext";

// const AppContext = ({ children }) => {
//     return (
//         <ListProvider>
//             <ItemsContextProvider>
//                 {children}
//             </ItemsContextProvider>
//         </ListProvider>
//     )
// }

// export default AppContext;