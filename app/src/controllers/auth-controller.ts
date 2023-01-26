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

  private async getUser(id: number): Promise<void> {
    try {
      const response = await fetch(`${config.BASE_URL}/users/${id}`, {
        method: 'GET',
        headers: { // headers opcional, somente se for enviar body
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

    } catch(error) {
      console.log(error);
      this.logout();
    }
  }

  public logout(): void {
    localStorage.removeItem('MyFitness.auth');
    this.token = '';
    this.user_id = 0;
  }

  private salvaDados(): void {
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

  public async login(username: string, password: string) {
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
    this.token = data.token;
    await this.getUser(data.uid);
    console.log('login ok');
  }

}
