import { Outlet } from "react-router";
import Header from "./header";
import { Provider } from "react-redux";
import { store } from "../hook/authStore";
import { UserProvider } from "../hook/user_context";


const AppLayOut = () => {
    return (
        <>
        <UserProvider> 
        <Provider store={store}>
            <Header />
            <Outlet/>
        </Provider> 
        </UserProvider> 
    

        </>
    );
};

export default AppLayOut;
