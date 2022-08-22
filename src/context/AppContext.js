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