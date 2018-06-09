const { I18nService } = require("./js/Service/I18n"),
    { LangSelectorView } = require("./js/View/LangSelector"),
    { dictionary } = require("./js/Data/dictionary"),
    i18nService = new I18nService(dictionary);
new LangSelectorView(document.querySelector("[data-bind=langSelector]"), i18nService);

const { TitleBarActionsView } = require("./js/View/TitleBarActions");
new TitleBarActionsView(document.querySelector("[data-bind=titlebar]"), i18nService);

const { DirService } = require("./js/Service/Dir");
const { DirListView } = require("./js/View/DirList");
const { FileListView } = require("./js/View/FileList");
const { TitleBarPathView } = require("./js/View/TitleBarPath");
dirService = new DirService();

new DirListView(document.querySelector("[data-bind=dirList]"), dirService);
new FileListView(document.querySelector("[data-bind=fileList]"), dirService, i18nService);
new TitleBarPathView(document.querySelector("[data-bind=path]"), dirService);
dirService.notify();
