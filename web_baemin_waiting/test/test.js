import 'babel-polyfill';

import { Regex } from "../src/js/regex.js";

const assert = require("chai").assert;

describe("Regex", function() {

    const regex = new Regex();

    describe("check isID() method", function() {
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

    describe("check isTitle() method", function() {
        it("'가게123' should return true", function() {
            assert.equal(regex.isTitle("가게123"), true);
        })
        it("'' should return false", function() {
            assert.equal(regex.isTitle(" "), false);
        }) 
        it("'abc def' should return false", function() {
            assert.equal(regex.isTitle("abc def"), true);
        })
        it("'abcdef ' should return false", function() {
            assert.equal(regex.isTitle("abc def"), true);
        }) 
    })
})
