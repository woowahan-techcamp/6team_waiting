import service from "../src/js/services/service.test.js";


describe("Service", function() {

    describe("addTicket(id, name, count, isStaying, tel) method", function() {
        it("should get ", function() {

            const id = "testID";
            const name = "testName";
            const count = 10;
            const isStaying = false;
            const tel = "01012341234";

            service.addTicket(id, name, count, isStaying, tel).then((token) => {
                assert.equal(token.storeId === "test");
            });
        }) 
    });

    describe("checkDuplication(id) method", function() {
        it("check token storeId is 'test'", function() {

            const id = "test123";

            service.checkDuplication(id).then((token) => {
                assert.equal(token.storeId === "test");
            });
        }) 
    });

    describe("deleteTicket(num, status) method", function() {
        it("deleteTicket(num, status)", function() {

            const num = 1;
            const status = "cancel";

            service.deleteTicket(num, status).then((token) => {
                assert.equal(token.storeId === "test");
            });
        }) 
    });

    
})
