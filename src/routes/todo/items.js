var items = [];
function getItems() {
    return items.slice(0);
}
exports.getItems = getItems;
function postItems(items) {
    if (items instanceof Array)
        items.forEach(postItem);
    else
        postItem(items);
}
exports.postItems = postItems;
function postItem(item) {
    if (!item.id) {
        items.push({
            id: getMaxItemId() + 1,
            message: item.message,
            isDone: item.isDone || 0
        });
        return;
    }
    for (var index in items) {
        var targetItem = items[index];
        if (item.id === targetItem.id) {
            targetItem.message = item.message;
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
    return (!!item.message && item.isDone !== null);
}
function isValidNewItem(item) {
    return !!item.message;
}
