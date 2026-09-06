const { contextBridge } = require("electron/renderer");

contextBridge.exposeInMainWorld("sus", {
    name: () => "sus",
});
