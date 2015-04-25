var items: TodoItem[] = [];

export function getItems() {
    // Only return a copy of the array so it cannot be mutated
    return items.slice(0);
}

// TODO: This operation should be atomic
export function postItems(postItems: TodoItem|TodoItem[]): boolean {
    // Apply all changes to tempItems. If any postItem() result is invalid, do not update the original items array.
    var tempItems = getItems();

    if (postItems instanceof Array) {
        for (var item in postItems) {
            var result = postItem(item, tempItems);
            if (!result) return false;
        }
        items = tempItems;
        return true;
    }

    var result = postItem(<TodoItem>postItems, tempItems);
    if (result) {
        items = tempItems;
        return true;
    }
    return false;
}

function postItem(item: TodoItem, tempArray: TodoItem[]): boolean {
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
        if (!isValidUpdateItem(item)) return false;
        var targetItem = tempArray[index];
        if (item.id === targetItem.id) {
            // Only update properties that we are provided
            console.log(item);
            if (typeof item.message !== "undefined") targetItem.message = item.message;
            if (typeof item.isDone !== "undefined") targetItem.isDone = item.isDone;

            // We no longer need to iterate since we have updated the matching item.
            return;
        }
    }
    return true;
}

function getMaxItemId() {
    var maxId = 0;
    items.forEach(item => {
        if (item.id > maxId) maxId = item.id;
    });
    return maxId;
}

function isValidUpdateItem(item: TodoItem): boolean {
    return(!!item.id && (typeof item.message !== "undefined" || typeof item.isDone !== "undefined"));
}

function isValidNewItem(item: TodoItem): boolean {
    return (typeof item.message !== "undefined");
}
