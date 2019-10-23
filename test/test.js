const should = require('chai').should();

const { HttpClient } = require('../index');
const http = new HttpClient();
http.baseAddress = 'https://jsonplaceholder.typicode.com/';

describe('GET', () => {
    it('responds with 100 records', async () => {
        const resp = await http.getAsync(`posts`);
        resp.ensureSuccessStatusCode();
        const result = await resp.content.readAsAsync();
        result.should.have.length(100);
    });

    it('responds with 1 record with id == 10', async () => {
        const resp = await http.getAsync(`posts/10`);
        resp.ensureSuccessStatusCode();
        const result = await resp.content.readAsAsync();
        result.id.should.be.equal(10);
    });
});

describe('POST', () => {
    it('responds with 1 record with id == 101', async () => {
        const resp = await http.postAsync(`posts`);
        resp.ensureSuccessStatusCode();
        const result = await resp.content.readAsAsync();
        result.id.should.be.equal(101);
    });
});

describe('PUT/PATCH', () => {
    it('responds after PUT with 1 record with id == 28', async () => {
        const resp = await http.putAsync(`posts/28`);
        resp.ensureSuccessStatusCode();
        const result = await resp.content.readAsAsync();
        result.id.should.be.equal(28);
    });

    it('responds after PATCH with 1 record with id == 28', async () => {
        const resp = await http.patchAsync(`posts/28`);
        resp.ensureSuccessStatusCode();
        const result = await resp.content.readAsAsync();
        result.id.should.be.equal(28);
    });
});

describe('DELETE', () => {
    it('responds with empty object', async () => {
        const resp = await http.deleteAsync(`posts/32`);
        resp.ensureSuccessStatusCode();
        resp.statusCode.should.be.equal(200);
    });
});
