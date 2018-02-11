import conf from '../conf';

// import AuthService from '../services/scim.service';

/**
 * Helper for construction api URLs
 */
class ApiHelper {
  static version = 'v1';
  static secured = conf.secured;

  static makeUrl(endpoint, prefix = '') {
    console.log(conf);
    const _endpoint = endpoint.replace(/^\//, '');
    const _prefix = prefix ? prefix.replace(/^\//, '') + '/' : '';
    return conf.apiOrigin + '/api/' + _prefix + ApiHelper.version + '/' + _endpoint;
  }

  static my(endpoint) {
    return ApiHelper.makeUrl(endpoint, 'my');
  }

  static scim(endpoint) {
    return ApiHelper.makeUrl(endpoint, 'scim');
  }

}

export default ApiHelper;
