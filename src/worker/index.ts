///<reference path="../typings/worker.d.ts" />
import Worker from "worker-loader?publicPath=dist/&name=worker.js!./worker";

const worker: Worker = new Worker();
console.log(worker);
