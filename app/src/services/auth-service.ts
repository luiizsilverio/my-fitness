import config from "../config.js";
import { User } from "../models/user.js";

export interface SignupProps {
  name: string;
  email: string;
  password: string;
}

interface SignInProps {
  token: string;
  uid: string;
}

export class AuthService {

  public async getUser(id: number, token: string): Promise<User> {
    const response = await fetch(`${config.BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw Error(`Erro ao buscar usuário. (${response.statusText})`);
    }

    const user: User = await response.json();
    return user;
  }


  public async signUp({ name, email, password }: SignupProps): Promise<void> {
    const response = await fetch(`${config.BASE_URL}/users`, {
      method: 'POST',
      body: JSON.stringify({
        name: name[0].toUpperCase() + name.substring(1),
        username: name,
        email,
        password,
        type_user_id: 1
      }),
      headers: { // quando envia body, é obrigatório informar esse header
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw Error(`Erro ao cadastrar o usuário. (${response.statusText})`);
    }
  }


  public async signIn(username: string, password: string): Promise<SignInProps> {
    const response = await fetch(`${config.BASE_URL}/sessions`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { // headers opcional, somente se for enviar body
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
