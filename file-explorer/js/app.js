const { TitleBarActionsView } = require("./js/View/TitleBarActions");
new TitleBarActionsView(document.querySelector( "[data-bind=titlebar]"));

const { DirService } = require("./js/Service/Dir");
const { DirListView } = require("./js/View/DirList");
const { FileListView } = require("./js/View/FileList");
const { TitleBarPathView } = require("./js/View/TitleBarPath");
dirService = new DirService();

new DirListView(document.querySelector("[data-bind=dirList]"), dirService);
new FileListView(document.querySelector("[data-bind=fileList]"), dirService);
new TitleBarPathView(document.querySelector("[data-bind=path]"), dirService);
dirService.notify();
