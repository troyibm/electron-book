const { DirService } = require("./js/Service/Dir");
const argv = require("minimist")(nw.App.argv),
    dirService = new DirService(argv._[0]);

const { I18nService } = require("./js/Service/I18n"),
    { LangSelectorView } = require("./js/View/LangSelector"),
    { dictionary } = require("./js/Data/dictionary"),
    i18nService = new I18nService(dictionary);
new LangSelectorView(document.querySelector("[data-bind=langSelector]"), i18nService);

const { TitleBarActionsView } = require("./js/View/TitleBarActions");
new TitleBarActionsView(document.querySelector("[data-bind=titlebar]"), i18nService);

const { DirListView } = require("./js/View/DirList");
const { FileListView } = require("./js/View/FileList");
const { TitleBarPathView } = require("./js/View/TitleBarPath");
const { ContextMenuView } = require("./js/View/ContextMenu");
const { FileService } = require("./js/Service/File"),
    fileService = new FileService(dirService);

new DirListView(document.querySelector("[data-bind=dirList]"), dirService);
new TitleBarPathView(document.querySelector("[data-bind=path]"), dirService);
new FileListView(document.querySelector("[data-bind=fileList]"), dirService, i18nService, fileService);
new ContextMenuView(fileService, i18nService);

const { TrayView } = require("./js/View/Tray");
new TrayView("");

if (argv.minimize) {
    nw.Window.get().minimize();
}
if (argv.maximize) {
    nw.Window.get().maximize();
}

dirService.notify();
