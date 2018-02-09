import api from '../utils/api';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/catch';

class AuthService {
  principal = null;

  authenticated = false;
  loaded = false;

  checkLogin() {
    let $this = this;
    return this.getPrincipal()
      .pipe(
        map(function () {
          return $this.authenticated;
        })
      );
  }

  getPrincipal() {
    if (this.loaded) {
      this.fetchLoaded();
    }
    return this.fetchPrincipal();
  }

  fetchPrincipal() {

    if (this.authenticated) {
      this.loaded = true;
      return this.fetchLoaded();
    }
    this.loaded = false;

    let authToken = AuthService.getAuthToken();

    if (!authToken) {
      this.loaded = true;
      return Observable.of(null);
    }

    let config = AuthService.getAuthConfig();

    let $this = this;

    return Observable.fromPromise(
      fetch(api.scim('/principal'), config)
        .then(res => res.json())
        .catch(err => $this.handleError(err))
        .then(res => $this.processServerPrincipal(res))
    );
  }

  fetchLoaded() {
    return Observable.create(observer => {
      observer.next(this.principal);
      observer.complete();
    });
  }

  login(creds) {
    let config = {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(creds)
    };

    return fetch(api.scim('/login'), config)
      .then(res => res.json())
      .catch(err => this.handleError(err))
      .then(res => this.processServerLogin(res));
  }

  unsetUser() {
    this.authenticated = false;
    this.principal = null;
  };

  logout() {
    AuthService.setAuthToken();
    this.unsetUser();
  }

  checkAuth() {
    const jwt = AuthService.getAuthToken();
    this.authenticated = !!jwt;
  }

  setPrincipal(principal) {
    this.authenticated = true;
    if (!this.principal) {
      this.principal = principal;
    } else {
      Object.assign(this.principal, principal);
    }
  }

  static getAuthToken() {
    return localStorage.getItem('authToken');
  }

  static setAuthToken(authToken) {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    }

    else {
      localStorage.removeItem('authToken');
    }
  }

  // The object to be passed as a header for authenticated requests
  static getAuthHeader() {
    let token = AuthService.getAuthToken();
    if (token) {
      return {
        'Authorization': 'Bearer ' + AuthService.getAuthToken()
      };
    } else {
      return {};
    }
  }

  static getAuthConfig() {
    return {
      headers: Object.assign({
        'Content-Type': 'application/json'
      }, AuthService.getAuthHeader())
    };
  }

  // Helper functions
  processServerPrincipal(body) {
    if (body.error) {
      this.logout();
    } else {
      this.setPrincipal(body.results.user);
    }
    this.loaded = true;
    return this.principal;
  }

  processServerLogin(body) {
    if (body.error) {
      this.logout();
    } else {
      AuthService.setAuthToken(body.results.authToken);
      this.setPrincipal(body.results.user);
    }
    this.loaded = true;
    return this.principal;
  }

  handleError(error) {
    this.unsetUser();
    this.loaded = true;
    // In a real world app, you might use a remote logging infrastructure

    let errMsg;
    if (error.error) {
      const body = error || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

      if (error.status === 0 || error.status === 502) {
        console.log('Сервер находится на профилактике. Повторите свою попытку позже.');
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.of(null);
  }

}

export const authService = new AuthService();
