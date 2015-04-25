var items = [
    { id: 1, message: "first item", isDone: 0 },
    { id: 2, message: "second item", isDone: 0 },
    { id: 3, message: "third item", isDone: 0 },
    { id: 4, message: "fourth item", isDone: 0 }
];
function getItems() {
    return items.map(function (item) {
        return {
            id: item.id,
            message: item.message,
            isDone: item.isDone
        };
    });
}
exports.getItems = getItems;
function postItems(jsonItems) {
    var postItems;
    if (typeof jsonItems === "string")
        postItems = JSON.parse(jsonItems);
    else
        postItems = jsonItems;
    var tempItems = getItems();
    if (Array.isArray(postItems)) {
        var results = postItems.map(function (item) { return postItem(item, tempItems); });
        if (results.every(function (result) { return result === true; })) {
            items = tempItems;
            return true;
        }
        return false;
    }
    var result = postItem(postItems, tempItems);
    if (result) {
        items = tempItems;
        return true;
    }
    return false;
}
exports.postItems = postItems;
function postItem(item, tempArray) {
    if (typeof item === "undefined")
        return false;
    if (!item.id) {
        if (!isValidNewItem(item))
            return false;
        tempArray.push({
            id: getMaxItemId() + 1,
            message: item.message,
            isDone: item.isDone || 0
        });
        return true;
    }
    for (var index in tempArray) {
        if (!isValidUpdateItem(item)) {
            return false;
        }
        if (item.id === tempArray[index].id) {
            if (typeof item.message !== "undefined")
                tempArray[index].message = item.message;
            if (typeof item.isDone !== "undefined")
                tempArray[index].isDone = item.isDone;
            return true;
        }
    }
    return false;
}
function getMaxItemId() {
    var maxId = 0;
    items.forEach(function (item) {
        if (item.id > maxId)
            maxId = item.id;
    });
    return maxId;
}
function isValidUpdateItem(item) {
    return (!!item.id && (typeof item.message !== "undefined" || typeof item.isDone !== "undefined"));
}
function isValidNewItem(item) {
    return (typeof item.message !== "undefined");
}
