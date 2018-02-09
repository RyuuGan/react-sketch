class Conf {
  production = false;
  test = false;
  locales = ['ru'];

  apiHost = process.env.apiHost;
  host = process.env.host;
  secured = process.env.secured;

  get apiOrigin() {
    return this.secured ? 'https://' + this.apiHost : 'http://' + this.apiHost;
  }

  get origin() {
    return this.secured ? 'https://' + this.host : 'http://' + this.host;
  }

}

export default new Conf();
