export class Exercicio {
    constructor(id, name, obs, series, waiting_time, url_image) {
        this.id = id;
        this.name = name;
        this.obs = obs;
        this.series = series;
        this.waiting_time = waiting_time;
        this.url_image = url_image;
    }
    static criar(id, name, obs, series, waiting_time, url_image) {
        return new Exercicio(id, name, obs, series, waiting_time, url_image);
    }
}
//# sourceMappingURL=exercicio.js.map