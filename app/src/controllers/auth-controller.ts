import config from '../config.js';

export class AuthController {
  private user_id: number
  private username: string;
  private email: string;
  private token: string;

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

  private getUser(id: number) {
    fetch(`${config.BASE_URL}/users/${id}`, {
      method: 'GET',
      headers: { // headers opcional, somente se for enviar body
        'Authorization': `Bearer ${this.token}`
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(`Erro de Autenticação (${response.statusText})`);
      }
    })
    .then((data) => {
      this.user_id = data.id;
      this.username = data.name;
      this.email = data.email;
      this.salvaDados();
    })
    .catch(error => {
      console.log(error);
      this.limpa();
    })
  }

  private limpa() {
    localStorage.removeItem('MyFitness.auth');
    this.token = '';
    this.user_id = 0;
  }

  private salvaDados() {
    localStorage.setItem('MyFitness.auth', JSON.stringify({
      token: this.token,
      user_id: this.user_id,
      username: this.username,
      email: this.email,
    }));
  }

  public logado(): boolean {
    return this.token && this.user_id > 0;
  }

  public login(username: string, password: string) {
    fetch(`${config.BASE_URL}/sessions`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { // headers opcional, somente se for enviar body
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(`Erro de Autenticação (${response.statusText})`);
      }
    })
    .then(data => {
      this.token = data.token;
      this.getUser(data.uid);
    })
    .catch(error => {
      console.log(error);
      this.limpa();
    })
  }

}
