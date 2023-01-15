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
        fetch(`${config.BASE_URL}/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        })
            .then(response => response.json())
            .then((data) => {
            this.user_id = data.id;
            this.username = data.name;
            this.email = data.email;
            this.salvaDados();
        })
            .catch(error => {
            console.log('Erro ao buscar dados do usuário **', error);
            this.limpa();
        });
    }
    limpa() {
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
        fetch(`${config.BASE_URL}/sessions`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
            if (!response.ok) {
                throw Error(`Erro de Autenticação (${response.statusText})`);
            }
            else {
                return response.json();
            }
        })
            .then(data => {
            this.token = data.token;
            this.getUser(data.uid);
        })
            .catch(error => {
            console.log(error);
            this.limpa();
        });
    }
}
