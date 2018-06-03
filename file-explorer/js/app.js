const { TitleBarActionsView } = require("./js/View/TitleBarActions");
const { DirService } = require("./js/Service/Dir");
const { DirListView } = require("./js/View/DirList");
const { FileListView } = require("./js/View/FileList");
dirService = new DirService();

new TitleBarActionsView(document.querySelector( "[data-bind=titlebar]"));
new DirListView(document.querySelector("[data-bind=dirList]"), dirService);
new FileListView(document.querySelector("[data-bind=fileList]"), dirService);
dirService.notify();
