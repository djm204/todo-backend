var chai = require("chai");
var todo = require("../src/routes/todo/items");
var expect = chai.expect;
describe("Todo item crud tests", function () {
    valueTest("will have no items", todo.getItems().length, 0);
    console.log(todo.getItems());
    addItem("new item");
    valueTest("will have 1 item in the collection", todo.getItems().length, 1);
    valueTest("will have an id of 1", todo.getItems()[0].id, 1);
    addItem("another item");
    valueTest("will have a second item in the collection", todo.getItems().length, 2);
    valueTest("will have an id of 2", todo.getItems()[1].id, 2);
    editItem(1, "old item");
    valueTest("first item will have different message", todo.getItems()[0].message, "old item");
    valueTest("modified first item will still have isDone", todo.getItems()[0].isDone, 0);
    rawEditItem([{ id: 1, isDone: 20 }, { id: 2 }]);
    valueTest("will change nothing due to an item being invalid and postItems being atomic", todo.getItems()[0].isDone, 0);
    todo.postItems('[ { "id": 1, "isDone": 1}, { "id": 2, "isDone": 50 }]');
    valueTest("will change 1st item isDone using json", todo.getItems()[0].isDone, 1);
    valueTest("will change 2nd item isDone using json", todo.getItems()[1].isDone, 50);
    todo.deleteItem('{ "id": 1 }');
    valueTest("will delete the item", findItem(1), false);
});
function valueTest(message, value, expected) {
    it(message, function () {
        expect(value).to.equal(expected);
    });
}
function addItem(message) {
    todo.postItems(JSON.stringify({ message: message }));
}
function editItem(id, message) {
    todo.postItems(JSON.stringify({ id: id, message: message }));
}
function rawEditItem(item) {
    todo.postItems(JSON.stringify(item));
}
function findItem(itemId) {
    var items = todo.getItems();
    return items.some(function (item) { return item.id === itemId; });
}
