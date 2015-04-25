var chai = require("chai");
var todo = require("../src/routes/todo/items");
var expect = chai.expect;
describe("Todo item crud tests", function () {
    valueTest("will have no items", todo.getItems().length, 0);
    addItem("new item");
    valueTest("will have 1 item in the collection", todo.getItems().length, 1);
    valueTest("will have an id of 1", todo.getItems()[0].id, 1);
    addItem("another item");
    valueTest("will have a second item in the collection", todo.getItems().length, 2);
    valueTest("will have an id of 2", todo.getItems()[1].id, 2);
    editItem(1, "old item");
    valueTest("first item will have different message", todo.getItems()[0].message, "old item");
    valueTest("modified first item will still have isDone", todo.getItems()[0].isDone, 0);
});
function valueTest(message, value, expected) {
    it(message, function () {
        expect(value).to.equal(expected);
    });
}
function addItem(message) {
    todo.postItems({ message: message });
}
function editItem(id, message) {
    todo.postItems({ id: id, message: message });
}
