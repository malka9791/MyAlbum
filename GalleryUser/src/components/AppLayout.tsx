import { Outlet } from "react-router";
import Header from "./header";
import UserProvider from "../hook/login_context";
import { Provider } from "react-redux";
import { store } from "../hook/authStore";


const AppLayOut = () => {
    return (
        <>
        <UserProvider> 
        <Provider store={store}>
            <Header />
            <Outlet />
        </Provider> 
        </UserProvider> 
    

        </>
    );
};

export default AppLayOut;
