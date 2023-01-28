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
    async getUser(id) {
        try {
            const response = await fetch(`${config.BASE_URL}/users/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            if (!response.ok) {
                throw Error(`Erro de Autenticação (${response.statusText})`);
            }
            const data = await response.json();
            this.user_id = data.id;
            this.username = data.name;
            this.email = data.email;
            this.salvaDados();
        }
        catch (error) {
            console.log(error);
            this.logout();
        }
    }
    logout() {
        console.log('logout');
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
    async login(username, password) {
        const response = await fetch(`${config.BASE_URL}/sessions`, {
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
        const data = await response.json();
        this.token = data.token;
        await this.getUser(data.uid);
        console.log('login ok');
    }
    async signup({ name, email, password }) {
        await fetch(`${config.BASE_URL}/users`, {
            method: 'POST',
            body: JSON.stringify({
                name: name[0].toUpperCase() + name.substring(1),
                username: name,
                email,
                password,
                type_user_id: 1
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
//# sourceMappingURL=auth-controller.js.map