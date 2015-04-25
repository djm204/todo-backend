var items = [];
function getItems() {
    return items.slice(0);
}
exports.getItems = getItems;
function postItems(items) {
    var tempItems = getItems();
    if (items instanceof Array) {
        for (var item in items) {
            var result = postItem(item, tempItems);
            if (!result)
                return false;
        }
        items = tempItems;
        items;
        return true;
    }
    var result = postItem(items, tempItems);
    if (result) {
        items = tempItems;
        return true;
    }
    return false;
}
exports.postItems = postItems;
function postItem(item, tempArray) {
    if (!item.id) {
        if (!isValidNewItem(item))
            return false;
        tempArray.push({
            id: getMaxItemId() + 1,
            message: item.message,
            isDone: item.isDone || 0
        });
        return;
    }
    for (var index in tempArray) {
        if (!isValidUpdateItem(item))
            return false;
        var targetItem = items[index];
        if (item.id === targetItem.id) {
            console.log(item);
            if (typeof item.message !== "undefined")
                targetItem.message = item.message;
            if (typeof item.isDone !== "undefined")
                targetItem.isDone = item.isDone;
            return;
        }
    }
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
    return (typeof item.message !== "undefined" || typeof item.isDone !== "undefined");
}
function isValidNewItem(item) {
    return (typeof item.message !== "undefined");
}
