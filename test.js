const { HttpClient } = require('./lib/http-client');
const http = new HttpClient();
http.baseAddress = 'https://jsonplaceholder.typicode.com/';

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

async function testPut(id) {
    try {
        const resp = await http.patchAsync(`posts/${id}`, {
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

// testGet(10);
testPost();
testPut(2);
// testDelete(1);
