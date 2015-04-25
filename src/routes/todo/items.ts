var items: TodoItem[] = [];

export function getItems() {
    // Only return a copy of the array so it cannot be mutated
    return items.slice(0);
}

export function postItems(items: TodoItem|TodoItem[]): void {
    if (items instanceof Array) items.forEach(postItem);
    else postItem(<TodoItem>items);
}

function postItem(item: TodoItem): void {
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
            // Only update properties that we are provided
            if (!!item.message) targetItem.message = item.message;
            if (item.id !== null) targetItem.isDone = item.isDone;

            // We no longer need to iterate since we have updated the matching item.
            return;
        }
    }
}

function getMaxItemId() {
    var maxId = 0;
    items.forEach(item => {
        if (item.id > maxId) maxId = item.id;
    });
    return maxId;
}

function isValidUpdateItem(item: TodoItem): boolean {
    return (!!item.message && item.isDone !== null);
}

function isValidNewItem(item: TodoItem): boolean {
    return !!item.message;
}
