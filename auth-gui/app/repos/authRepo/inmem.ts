import { createContext, ReactNode, useContext } from "react";
import User from "~/domain/user";
import { AuthRepo } from "./ports";
import { Optional } from "~/domain/results";


export class InmemAuthRepo implements AuthRepo {
    user: Optional<User> = null

    async login(username: string, password: string) : Promise<Optional<User>> {
        this.user = new User({ username });
        return new User({ username });
    }
    async logout(): Promise<void> {
        return 
    }

    async validateSession(): Promise<Optional<User>> {
        if (this.user == null) {
            return null
        }
        return this.user;
    }
}



