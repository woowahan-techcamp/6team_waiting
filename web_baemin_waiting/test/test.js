import 'babel-polyfill';

import { Regex } from "../src/js/regex.js";
import service from "../src/js/services/service.test.js";

const assert = require("chai").assert;

describe("Service", function() {
    describe("signin method", function() {
        it("check token storeId is 'test'", function() {
            service.signInUser("id","pwd").then((token) => {
                assert.equal(token.storeId === "test");
            });
        }) 
    })
})

describe("Regex", function() {
    describe("check isID() method", function() {
        const regex = new Regex();

        it("'qwe123' should return true", function() {
            assert.equal(regex.isID("qwe123"), true);
        })
        it("'' should return false", function() {
            assert.equal(regex.isID(""), false);
        }) 
        it("'qqqqqqqqqqqq' should return false", function() {
            assert.equal(regex.isID(""), false);
        }) 
    })

    describe("check isName() method", function() {
        const regex = new Regex();

        it("'크롱' should return true", function() {
            assert.equal(regex.isName("크롱"), true);
        })
        it("'' should return false", function() {
            assert.equal(regex.isName(""), false);
        }) 
        it("'qqqqqqqqqqqq111' should return false", function() {
            assert.equal(regex.isName(""), false);
        }) 
    })
})
