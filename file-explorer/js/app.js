const { TitleBarActionsView } = require("./js/View/TitleBarActions");
const { DirService } = require("./js/Service/Dir");
const { DirListView } = require("./js/View/DirList");

new TitleBarActionsView(document.querySelector( "[data-bind=titlebar]"));

dirService = new DirService();

new DirListView(document.querySelector("[data-bind=dirList"), dirService);
dirService.notify();