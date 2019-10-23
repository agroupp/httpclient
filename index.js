/**
 * 
 */
exports.HttpContent = require('./lib/http-content').HttpContent;

/**
 * Represents a HTTP response message including the status code and data.
 */
exports.HttpResponseMessage = require('./lib/http-response-message').HttpResponseMessage;

/**
 * Provides a base class for sending HTTP requests and receiving HTTP responses from a resource identified by a URI.
 */
exports.HttpClient = require('./lib/http-client').HttpClient;
