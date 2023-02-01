export class Exercicio {

  constructor(
    public id: string,
    public name: string,
    public obs: string,
    public series: number,
    public waiting_time: number,
    public url_image: string
  ){}

  static criar(
    id: string,
    name: string,
    obs: string,
    series: number,
    waiting_time: number,
    url_image?: string
  ) {
    return new Exercicio(id, name, obs, series, waiting_time, url_image);
  }

}
