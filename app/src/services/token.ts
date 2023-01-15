
export async function getToken(username, password): Promise<string> {
  let token = localStorage.getItem('MyFitness.token');

  if (!token) {
    const response = await fetch('http://localhost:3333/sessions', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { // headers opcional, somente se for enviar body
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();
    token = data.token;

    if (token) {
      localStorage.setItem('MyFitness.token', token);
    }
  }

  return token;
}
