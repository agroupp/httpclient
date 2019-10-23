const { HttpContent } = require('./http-content');

/**
 * Represents a HTTP response message including the status code and data.
 */
class HttpResponseMessage {
    constructor(response) {
        this._response = response;
        this._content = new HttpContent(response);
        this._headers = new Map();
        for (const k in this._response.headers) {
            this._headers.set(k, this._response.headers[k]);
        }
    }

    /**
     * Gets the collection of HTTP response headers.
     */
    get headers() { return this._headers; }

    /**
     * Gets the content of a HTTP response message.
     */
    get content() { return this._content; }

    /**
     * Gets a value that indicates if the HTTP response was successful.
     */
    get isSuccessStatusCode() { return this._response.statusCode >= 200 && this._response.statusCode < 400; }
    
    /**
     * Gets the reason phrase which typically is sent by servers together with the status code.
     */
    get reasonPhrase() { return this._response.statusMessage; }

    /**
     * Gets the status code of the HTTP response.
     */
    get statusCode() { return this._response.statusCode; }

    /**
     * Throws an exception if the isSuccessStatusCode property for the HTTP response is false.
     */
    ensureSuccessStatusCode() { 
        if (!this.isSuccessStatusCode) {
            throw new Error(`Request didn't finished with success. Status code: ${this.statusCode}. Reason phrase: ${this.reasonPhrase}`);
        } 
    }
}

exports.HttpResponseMessage = HttpResponseMessage;
