/**
 * A base class representing an HTTP entity body and content headers.
 */
class HttpContent {
    constructor(response) {
        this._response = response;
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
     * Serialize the HTTP content to a string as an asynchronous operation.
     */
    readAsStringAsync() {
        return new Promise((resolve, reject) => {
            this._read()
            .then(result => {
                resolve(result.toString('binary'));
            })
            .catch(err => reject(err));
        });
    }

    /**
     * Serialize the HTTP content to a JS Object as an asynchronous operation.
     */
    readAsAsync() {
        return new Promise((resolve, reject) => {
            this._read()
            .then(result => {
                if (!this._headers.get('content-type').match(/json/gi)) reject('Not application/json content-type');
                try {
                    resolve(JSON.parse(result));
                } catch (err) {
                    reject(err);
                }
            })
            .catch(err => reject(err));
        });
    }

    /**
     * @private
     * Reads data stream until the end and returns promise that resolves into
     * raw data string.
     */
    _read() {
        return new Promise((resolve, reject) => {
            if (this._response.statusCode < 200 || this._response.statusCode >= 400) reject(`Request didn't finished with success`);
            let rawData = '';
            this._response.on('data', chunk => rawData += chunk);
            this._response.on('end', () => resolve(rawData));
        });
    }
}

exports.HttpContent = HttpContent;
