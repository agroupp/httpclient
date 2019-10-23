# httpclient
.Net Core style http client class library for Node.js

## Installation
Install Fetch as an npm module and save it to your package.json file as a dependency:
    
    npm install --save @groupp/httpclient

## Usage
Library provides `HttpClient` class for sending HTTP requests and receiving HTTP responses. The `HttpClient` class instance acts as a session to send HTTP requests. An `HttpClient` instance is a collection of settings applied to all requests executed by that instance. In addition, every `HttpClient` instance uses its own connection pool, isolating its requests from requests executed by other HttpClient instances.

## Example

```javascript
const { HttpClient } = require('./lib/http-client');
const http = new HttpClient();
http.baseAddress = 'https://jsonplaceholder.typicode.com/';
http.defaultRequestHeaders.set('X-My-Custom-Header', 'AppKey');

async function testGet(id) {
    try {
        const resp = await http.getAsync(`posts/${id}`);
        resp.ensureSuccessStatusCode();
        const result = await resp.content.readAsAsync();
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

```

```javascript
const { HttpClient } = require('./lib/http-client');
const http = new HttpClient();
http.baseAddress = 'https://jsonplaceholder.typicode.com/';
http.defaultRequestHeaders.set('X-My-Custom-Header', 'AppKey');

async function testPost() {
    try {
        const resp = await http.postAsync(`posts`, {
            title: 'foo',
            body: 'bar',
            userId: 1
        });
        resp.ensureSuccessStatusCode();
        const result = await resp.content.readAsAsync();
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

```

```javascript
const { HttpClient } = require('./lib/http-client');
const http = new HttpClient();
http.baseAddress = 'https://jsonplaceholder.typicode.com/';
http.defaultRequestHeaders.set('X-My-Custom-Header', 'AppKey');

async function testPut(id) {
    try {
        const resp = await http.putAsync(`posts/${id}`, {
            title: 'foo',
            body: 'bar',
            userId: 1
        });
        resp.ensureSuccessStatusCode();
        const result = await resp.content.readAsAsync();
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

```

```javascript
const { HttpClient } = require('./lib/http-client');
const http = new HttpClient();
http.baseAddress = 'https://jsonplaceholder.typicode.com/';
http.defaultRequestHeaders.set('X-My-Custom-Header', 'AppKey');

async function testDelete(id) {
    try {
        const resp = await http.deleteAsync(`posts/${id}`);
        resp.ensureSuccessStatusCode();
        const result = await resp.content.readAsAsync();
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}

```

## Testing

    npm test

