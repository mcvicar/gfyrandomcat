exports.handler = function( event, context ) {
    "use strict";
    var http = require('http'),
        https = require('https'),
        Promise = require('bluebird'),
        rnd_url = "www.random.org",
        rnd_ints = "/integers/?min=0&num=3&col=1&base=10&format=plain&rnd=new&max=",
        message = "error",
        gfy_url = "test.gfycat.com",
        adjectives_url = "/adjectives",
        adjectives_list = [],
        animals_url = "/animals",
        animals_list = [],
        pwd = "",
        adjRNG,anlRNG,stdRNG;

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    var getGfycatList = function(listType, listArray) {
        return new Promise(function(resolve, reject) {
            var options = {
            host: gfy_url,
            path: listType
            };

            var callback = function(response) {
                var str = '';
                response.on('data', function (chunk) {
                  str += chunk;
                });
                response.on('end', function () {
                  str = str.split("\n");
                  str.pop();
                  resolve(str);
                });
            }
            http.request(options, callback).end();
        });
    }

    var getRNG = function(maxLength) {
        return new Promise(function(resolve, reject) {
            var options = {
            host: rnd_url,
            path: rnd_ints + maxLength
            };

            var callback = function(response) {
                var str = '';
                response.on('data', function (chunk) {
                  str += chunk;
                });
                response.on('end', function () {
                 str = str.split("\n");
                 str.pop();
                 resolve(str);
                });
            }
            https.request(options, callback).end();
        });
    }

    function Combine(){
        return adjectives_list[adjRNG[0]].capitalize() + stdRNG[0] + animals_list[anlRNG[0]].capitalize() + stdRNG[1] + adjectives_list[adjRNG[1]].capitalize();
    }

    function callPass(callback) {

        getGfycatList(adjectives_url, adjectives_list)
        .then(function(adjList){
            adjectives_list = adjList;
            return getGfycatList(animals_url, animals_list);
        })
        .then(function(anList){
            animals_list = anList;
            return getRNG(adjectives_list.length - 1);
        })
        .then(function(rsp){
            adjRNG = rsp;
            return getRNG(animals_list.length - 1);
        })
        .then(function(rsp){
            anlRNG = rsp;
            return getRNG(999);
        })
        .then(function(rsp){
            stdRNG = rsp;
            return Combine();
        })
        .then(function(rsp){
            pwd = rsp;
            message = "success";
            return callback();
        })
    }

    callPass(function() {
        context.succeed({"status":message, "password":pwd});
    });
}
