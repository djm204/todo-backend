import log = require("../../log");
var items: TodoItem[] = []; // TODO: change to `_items`?

export function getItems() {
    // Only return a copy of the array so it cannot be mutated
    return items.map(item => {
        return {
            id: item.id,
            message: item.message,
            isDone: item.isDone
        }
    });
}

// TODO: This operation should be atomic
export function postItems(jsonItems: string): boolean {
    if (typeof jsonItems !== "string") return false;
    var postItems = JSON.parse(jsonItems);

    // Apply all changes to tempItems. If any postItem() result is invalid, do not update the original items array.
    var tempItems = getItems();

    if (Array.isArray(postItems)) {
        var results = postItems.map(item => postItem(item, tempItems));
        if (results.every(result => result === true)) {
            items = tempItems;
            return true;
        }
        return false;
    }

    var result = postItem(<TodoItem>postItems, tempItems);
    if (result) {
        items = tempItems;
        return true;
    }
    return false;
}

export function deleteItem(jsonItem: string): boolean {
    var deleting: TodoItem = JSON.parse(jsonItem);
    for (var i in getItems()) {
        var item = items[i];
        if (deleting.id !== item.id) continue;
        items.splice(i, 1);
        return true;
    }
    return false;
}

function postItem(item: TodoItem, tempArray: TodoItem[]): boolean {
    if (typeof item === "undefined") return false;
    // We operate on a temporary array to ensure atomic operations
    if (!item.id) {
        if (!isValidNewItem(item)) return false;
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
            // Only update properties that we are provided

            if (typeof item.message !== "undefined") tempArray[index].message = item.message;
            if (typeof item.isDone !== "undefined") tempArray[index].isDone = item.isDone;

            // We no longer need to iterate since we have updated the matching item.
            return true;
        }
    }
    // No match found, invalid operation/request
    return false;
}

function getMaxItemId() {
    var maxId = 0;
    items.forEach(item => {
        if (item.id > maxId) maxId = item.id;
    });
    return maxId;
}

function isValidUpdateItem(item: TodoItem): boolean {
    return (!!item.id && (typeof item.message !== "undefined" || typeof item.isDone !== "undefined"));
}

function isValidNewItem(item: TodoItem): boolean {
    return (typeof item.message !== "undefined");
}
