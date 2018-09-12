/// <reference path="worker.ts" />
const worker: Worker = new Worker('worker.ts');
console.log(worker);