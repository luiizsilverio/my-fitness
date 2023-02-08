import config from "../config.js";
import { Exercicio } from "../models/exercicio.js";

export class ExerciciosService {

  public async getAllExercises(): Promise<Exercicio[]> {

    const response = await fetch(`${config.BASE_URL}/exercises`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.getToken()}`,
      }
    })

    if (!response.ok) {
      throw Error(`Erro ao obter Exercícios (${response.statusText})`);
    }

    const data: Exercicio[] = await response.json();

    return data.map((exercicio: Exercicio) => (
        new Exercicio(
          exercicio.id,
          exercicio.name,
          exercicio.obs,
          exercicio.series,
          exercicio.waiting_time,
          exercicio?.url_image
        )
      ))
  }

  public async getExercise(id: string): Promise<Exercicio> {

    const response = await fetch(`${config.BASE_URL}/exercises/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.getToken()}`,
      }
    })

    if (!response.ok) {
      throw Error(`Erro ao obter Exercício (${response.statusText})`);
    }

    const data: Exercicio = await response.json();
    return data;
  }

  public async excludeExercise(id: string): Promise<void> {
    const response = await fetch(`${config.BASE_URL}/exercises/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${config.getToken()}`,
      }
    })

    if (!response.ok) {
      throw Error(`Erro ao obter Exercício (${response.statusText})`);
    }
  }

  public async editExercise(id: string, data: FormData): Promise<void> {
    const response = await fetch(`${config.BASE_URL}/exercises/${id}`, {
      method: 'PUT',
      body: data,
      headers: {
        Authorization: `Bearer ${config.getToken()}`,
        // 'Content-Type': 'multipart/form-data',
      }
    })

    if (!response.ok) {
      throw Error(`Erro ao atualizar o Exercício (${response.statusText})`);
    }
  }
}
