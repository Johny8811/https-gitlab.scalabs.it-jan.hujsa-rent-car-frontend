/**
 * Created by Jan on 7.8.2016.
 */
    // NESKOR sa pohrat s ES6 !
//import fs from 'fs';
//import path from 'path';
//import babelRelayPlugin from 'babel-relay-plugin';
//import { introspectionQuery } from 'graphql/utilities';
//import request from 'sync-request';
//
//const graphqlUrl = 'http://localhost:2020/graphql';
//const response = request('GET', graphqlUrl, {
//        qs: {
//            query: introspectionQuery
//        }
//});
//
//const schema = JSON.parse(response.body.toString('utf-8'));
//
//fs.writeFileSync(
//    path.join(__dirname, "./scripts/schema.json"),
//    schema
//);

var babelRelayPlugin   = require('babel-relay-plugin');
var introspectionQuery = require('graphql/utilities').introspectionQuery;
var request            = require('sync-request');

var graphqlUrl = 'http://localhost:3000/graphql';
var response = request('GET', graphqlUrl, {
    qs: {
        query: introspectionQuery
    }
});

var schema = JSON.parse(response.body.toString('utf-8'));

module.exports = babelRelayPlugin(schema.data, {
    abortOnError: true
});