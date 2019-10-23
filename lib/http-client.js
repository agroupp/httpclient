const http = require('http');
const https = require('https');
const { HttpResponseMessage } = require('./http-response-message');

/**
 * Provides a base class for sending HTTP requests and receiving HTTP responses from a resource identified by a URI.
 */
class HttpClient {
    constructor() {
        this._baseAddress;
        this._defaultRequestHeaders = new Map().set('Content-Type', 'application/json; charset=UTF-8');
    }

    /**
     * Gets the base address of Uniform Resource Identifier (URI) of the Internet resource used when sending requests.
     */
    get baseAddress() {
        return this._baseAddress;
    }

    /**
     * Sets the base address of Uniform Resource Identifier (URI) of the Internet resource used when sending requests.
     */
    set baseAddress(value) {
        if (!value || typeof value !== 'string') throw new Error('Incorrect URI string provided');
        try {
            this._baseAddress = new URL(value);
        } catch (err) {
            throw new Error('Incorrect URI string provided');
        }
    }

    /**
     * Gets the headers which should be sent with each request.
     */
    get defaultRequestHeaders() { return this._defaultRequestHeaders; }

    /**
     * Send a GET request to the specified Uri as an asynchronous operation.
     * @param {string} uri 
     */
    getAsync(uri) {
        return new Promise(async (resolve, reject) => {
            try {
                const requestOptions = this._buildRequestOptions(uri, 'GET');
                const resp = await this._requestAsync(requestOptions);
                resolve(new HttpResponseMessage(resp));
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Send a POST request to the specified Uri as an asynchronous operation.
     * @param {string} uri 
     * @param {any} body 
     */
    postAsync(uri, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const requestOptions = this._buildRequestOptions(uri, 'POST');
                const resp = await this._requestAsync(requestOptions, body);
                resolve(new HttpResponseMessage(resp));
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Send a PUT request to the specified Uri as an asynchronous operation.
     * @param {string} uri 
     * @param {any} body 
     */
    putAsync(uri, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const requestOptions = this._buildRequestOptions(uri, 'PUT');
                const resp = await this._requestAsync(requestOptions, body);
                resolve(new HttpResponseMessage(resp));
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Send a PATCH request to the specified Uri as an asynchronous operation.
     * @param {string} uri 
     * @param {any} body 
     */
    patchAsync(uri, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const requestOptions = this._buildRequestOptions(uri, 'PATCH');
                const resp = await this._requestAsync(requestOptions, body);
                resolve(new HttpResponseMessage(resp));
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * Send a DELETE request to the specified Uri as an asynchronous operation.
     * @param {string} uri 
     * @param {any} body 
     */
    deleteAsync(uri) {
        return new Promise(async (resolve, reject) => {
            try {
                const requestOptions = this._buildRequestOptions(uri, 'DELETE');
                const resp = await this._requestAsync(requestOptions);
                resolve(new HttpResponseMessage(resp));
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * @private
     * Sends request and returns promise that resolves into Nodejs response object
     * @param {object} options - request options
     * @param {object} body - optional request body
     * @returns {Promise} Promise that resolves into Nodejs response object
     */
    _requestAsync(options, body) {
        return new Promise((resolve, reject) => {
            if (!options || !options.protocol || !options.host || !options.method) reject('Invalid options provided');
            const provider = options.protocol.slice(0, options.protocol.length - 1) === 'http' ? http : https;
            const req = provider.request(options, res => resolve(res));
            req.on('error', err => reject(err.message));
            if (body) {
                if (typeof body !== 'string') {
                    try {
                        body = JSON.stringify(body);
                    } catch (err) {
                        reject(`Error with request body ${err}`);
                    }
                }
                req.write(body);
            }
            req.end();
        });
    }

    /**
     * @private
     * Analize Uri and prepares request options object
     * @param {string} uri
     * @param {string} method - HTTP method
     */
    _buildRequestOptions(uri, method) {
        if (!uri || typeof uri !== 'string') throw new Error('Incorrect URI string provided');
        uri = uri.trim();
        let proto, hostname, pathname;
        if (this._baseAddress && !uri.match(/^http/gi)) {
            proto = this._baseAddress.protocol;
            hostname = this._baseAddress.host;
            if (uri[0] !== '/') uri = '/' + uri;
            pathname = uri;
        } else {
            try {
                uri = new URL(uri);
                proto = uri.protocol;
                hostname = uri.host;
                pathname = uri.pathname + uri.search;
            } catch (err) {
                throw new Error('Incorrect URI string provided');
            }
        }
        const headers = {};
        for (const k of this._defaultRequestHeaders.keys()) {
            headers[k] = this._defaultRequestHeaders.get(k);
        }
        return {
            protocol: proto,
            host: hostname,
            path: pathname,
            method: method,
            headers
        };
    }
}

/**
 * Provides a base class for sending HTTP requests and receiving HTTP responses from a resource identified by a URI.
 */
exports.HttpClient = HttpClient;
