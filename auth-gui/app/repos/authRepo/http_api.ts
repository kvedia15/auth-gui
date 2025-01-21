import User from "~/domain/user";
import { AuthRepo } from "./ports";
import { Optional } from "~/domain/results";



export class HttpAuthRepo implements AuthRepo {
    url: string
    constructor(url: string) {
        this.url = url
    }    

    async login(username: string, password: string) : Promise<Optional<User>> {
        const response = await fetch(this.url + '/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })

        if (!response.ok) {
            return null;
        }
        const responseJson = await response.json();
        const user = responseJson.data;

        return new User({id:user.id ,username: user.username, email: user.email});
    }

    async logout (): Promise<void> { 
        const response = await fetch(this.url + '/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if (!response.ok) {
            return;
        }
        return;
    }

    async validateSession(): Promise<Optional<User>> { 
        const response = await fetch(this.url + '/users/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        if (!response.ok) {
            return null;
        }
        const responseJson = await response.json();
        const user = responseJson.data;
        return new User({id:user.id ,username: user.username, email: user.email});
    }
}

