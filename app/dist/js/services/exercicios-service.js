import config from "../config.js";
import { Exercicio } from "../models/exercicio.js";
export class ExerciciosService {
    async getAllExercises() {
        const response = await fetch(`${config.BASE_URL}/exercises`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${config.getToken()}`,
            }
        });
        if (!response.ok) {
            throw Error(`Erro ao obter Exercícios (${response.statusText})`);
        }
        const data = await response.json();
        return data.map((exercicio) => (new Exercicio(exercicio.id, exercicio.name, exercicio.obs, exercicio.series, exercicio.waiting_time, exercicio?.url_image)));
    }
    async getExercise(id) {
        const response = await fetch(`${config.BASE_URL}/exercises/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${config.getToken()}`,
            }
        });
        if (!response.ok) {
            throw Error(`Erro ao obter Exercício (${response.statusText})`);
        }
        const data = await response.json();
        return data;
    }
}
//# sourceMappingURL=exercicios-service.js.map