import config from "../config.js";
import { Exercicio } from "../models/exercicio.js";

export class ExerciciosService {

  public async getAllExercises(): Promise<Exercicio[]> {
    const response = await fetch(`${config.BASE_URL}/exercises`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.getToken()}`,
        }
      });

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

}