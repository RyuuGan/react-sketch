class Conf {
  production = false;
  test = false;
  locales = ['ru'];

  apiHost = process.env.REACT_APP_API_HOST;
  host = process.env.REACT_APP_HOST;
  secured = process.env.REACT_APP_SECURED === 'true';

  get apiOrigin() {
    return this.secured ? 'https://' + this.apiHost : 'http://' + this.apiHost;
  }

  get origin() {
    return this.secured ? 'https://' + this.host : 'http://' + this.host;
  }

}

export default new Conf();
