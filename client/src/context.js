import {createContext} from "react";

const defaultState = {
    id: null,
    username: null,
};

const UserContext = createContext(defaultState);


export default UserContext;
