/// <reference path="node/node.d.ts" />
/// <reference path="hapi/hapi.d.ts" />
/// <reference path="bluebird/bluebird.d.ts" />
/// <reference path="chalk/chalk.d.ts" />
/// <reference path="mocha/mocha.d.ts" />
/// <reference path="chai/chai.d.ts" />

interface TodoItem {
    id?: number;
    message?: string;
    isDone?: number;
}
