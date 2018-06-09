const appWindow = nw.Window.get();
class TitleBarActionsView {

    constructor(boundingE1, i18nService) {
        this.i18nService = i18nService;
        // subscribe to locale updates
        i18nService.on("update", () => this.translate());
        this.closeE1 = boundingE1.querySelector("[data-bind=close]");
        this.minimizeE1 = boundingE1.querySelector("[data-bind=minimize]");
        this.maximizeE1 = boundingE1.querySelector("[data-bind=maximize]");
        this.unmaximizeE1 = boundingE1.querySelector("[data-bind=unmaximize]");
        this.bindUi();
    }

    translate() {
        this.closeE1.title = this.i18nService.translate("CLOSE_WIN", "Close");
        this.minimizeE1.title = this.i18nService.translate("MINIMIZE_WIN", "Close");
        this.maximizeE1.title = this.i18nService.translate("MAXIMIZE_WIN", "Close");
        this.unmaximizeE1.title = this.i18nService.translate("RESTORE_WIN", "Close");
    }

    bindUi() {
        this.closeE1.addEventListener("click", this.onClose.bind(this), false);
        this.minimizeE1.addEventListener("click", this.onMinimize.bind(this), false);
        this.maximizeE1.addEventListener("click", this.onMaximize.bind(this), false);
        this.unmaximizeE1.addEventListener("click", this.onUnmaximize.bind(this), false);
    }

    onMinimize(e) {
        e.preventDefault();
        appWindow.minimize();
    }

    toggleMaximize() {
        this.maximizeE1.classList.toggle("is-hidden");
        this.unmaximizeE1.classList.toggle("is-hidden");
    }

    onMaximize(e) {
        e.preventDefault();
        appWindow.maximize();
        this.toggleMaximize();
    }

    onUnmaximize(e) {
        e.preventDefault();
        appWindow.unmaximize();
        this.toggleMaximize();
    }

    onClose(e) {
        e.preventDefault();
        appWindow.close();
    }
}

exports.TitleBarActionsView = TitleBarActionsView