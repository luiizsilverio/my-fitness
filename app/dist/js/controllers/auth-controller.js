var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import config from '../config.js';
export class AuthController {
    constructor() {
        const auth = localStorage.getItem('MyFitness.auth');
        if (auth) {
            const authData = JSON.parse(auth);
            this.token = authData.token;
            this.user_id = authData.user_id;
            this.username = authData.username;
            this.email = authData.email;
        }
        if (this.token) {
            this.getUser(this.user_id);
        }
    }
    get userName() {
        return this.username;
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${config.BASE_URL}/users/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });
                if (!response.ok) {
                    throw Error(`Erro de Autenticação (${response.statusText})`);
                }
                const data = yield response.json();
                this.user_id = data.id;
                this.username = data.name;
                this.email = data.email;
                this.salvaDados();
            }
            catch (error) {
                console.log(error);
                this.logout();
            }
        });
    }
    logout() {
        localStorage.removeItem('MyFitness.auth');
        this.token = '';
        this.user_id = 0;
    }
    salvaDados() {
        localStorage.setItem('MyFitness.auth', JSON.stringify({
            token: this.token,
            user_id: this.user_id,
            username: this.username,
            email: this.email,
        }));
    }
    logado() {
        return this.token && this.user_id > 0;
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${config.BASE_URL}/sessions`, {
                    method: 'POST',
                    body: JSON.stringify({
                        username,
                        password
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw Error(`Erro de Autenticação (${response.statusText})`);
                }
                const data = yield response.json();
                this.token = data.token;
                yield this.getUser(data.uid);
                console.log('login ok');
            }
            catch (error) {
                console.log(error);
                this.logout();
            }
        });
    }
}
