"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("@azure/functions");
functions_1.app.setup({
    enableHttpStream: true,
});
