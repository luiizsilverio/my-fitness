import config from "../config.js";
export class AuthService {
    async getUser(id, token) {
        const response = await fetch(`${config.BASE_URL}/users/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw Error(`Erro ao buscar usuário. (${response.statusText})`);
        }
        const user = await response.json();
        return user;
    }
    async signUp({ name, email, password }) {
        const response = await fetch(`${config.BASE_URL}/users`, {
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
        if (!response.ok) {
            throw Error(`Erro ao cadastrar o usuário. (${response.statusText})`);
        }
    }
    async signIn(username, password) {
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
        console.log('login ok');
        return data;
    }
}
//# sourceMappingURL=auth-service.js.map