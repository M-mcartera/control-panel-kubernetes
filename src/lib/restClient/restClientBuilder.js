import axios from 'axios';

/**
 *
 * @param baseUrl
 * @param extraConfigs
 * @returns {{patch(*, {payload: *, config?: *}=): Promise<{json: *, status: *}>, baseUrl, post(*, {payload: *, config?: *}=): Promise<{json: *, status: *}>, get(*, {params?: *, config?: *, cacheable?: *}=): Promise<{json: *, status: *}>, setDefaultHeaders(*=): void, delete(*, {config?: *}=): Promise<{json: *, status: *}>, postFormData(*, {payload: *, config?: *}=): Promise<{json: *, status: *}>, put(*, {payload: *, config?: *}=): Promise<{json: *, status: *}>}|Promise<{json: *, status: *}>}
 */
export default ({ baseUrl, ...extraConfigs }) => {
  const client = axios.create({
    baseURL: baseUrl,
    ...extraConfigs
  });

  let defaultHeaders = {};

  /**
   *
   * @param url
   * @param method
   * @param payload
   * @param params
   * @param config
   * @param cacheable
   * @return {Promise<{json: *, status: *}>}
   */
  const makeRequest = async ({
    url,
    method,
    payload = undefined,
    params = undefined,
    config = {}
  }) => {
    const headers = config.headers || {};
    try {
      const { data, status } = await client.request({
        url,
        method,
        data: payload,
        params,
        ...config,
        headers: {
          ...defaultHeaders,
          ...headers
        }
      });

      return { json: data, status };
    } catch (err) {
      return {
        json: err.response ? err.response.data : {},
        status: err.response ? err.response.status : 500
      };
    }
  };

  return {
    baseUrl,
    setDefaultHeaders(headers = {}) {
      defaultHeaders = { ...defaultHeaders, ...headers };
    },

    /**
     *
     * @param url
     * @param params
     * @param config
     * @param cacheable
     * @return {Promise<{json: *, status: *}>}
     */
    async get(url, { params = {}, config = {}, cacheable = false } = {}) {
      return makeRequest({
        url,
        method: 'get',
        params,
        config,
        cacheable
      });
    },

    /**
     *
     * @param url
     * @param payload
     * @param config
     * @return {Promise<{json: *, status: *}>}
     */
    async post(url, { payload, config = {} } = {}) {
      return makeRequest({ url, method: 'post', payload, config });
    },

    /**
     *
     * @param url
     * @param payload
     * @param config
     * @return {Promise<{json: *, status: *}>}
     */
    async postFormData(url, { payload, config = {} } = {}) {
      return makeRequest({
        url,
        method: 'post',
        payload,
        config: {
          ...config,
          headers: {
            ...(config.headers || {}),
            'content-type': 'multipart/form-data'
          }
        }
      });
    },

    /**
     *
     * @param url
     * @param payload
     * @param config
     * @return {Promise<{json: *, status: *}>}
     */
    async patch(url, { payload, config = {} } = {}) {
      return makeRequest({ url, method: 'patch', payload, config });
    },

    /**
     *
     * @param url
     * @param payload
     * @param config
     * @return {Promise<{json: *, status: *}>}
     */
    async put(url, { payload, config = {} } = {}) {
      return makeRequest({ url, method: 'put', payload, config });
    },

    /**
     *
     * @param url
     * @param config
     * @return {Promise<{json: *, status: *}>}
     */
    async delete(url, { config = {} } = {}) {
      return makeRequest({ url, method: 'delete', config });
    }
  };
};
