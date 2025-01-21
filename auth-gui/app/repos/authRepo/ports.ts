import { Optional } from "~/domain/results";
import User from "~/domain/user";

export interface  AuthRepo {
    login(username: string, password: string) : Promise<Optional<User>>;
    logout() : Promise<void>
    validateSession() : Promise<Optional<User>>
    
}

