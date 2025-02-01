import { auth_logged } from "./logged";
import { auth_login } from "./login";
import { auth_logout } from "./logout";

export namespace AuthServices {

    export const logged = auth_logged
    export const login = auth_login;
    export const logout = auth_logout; 

}  