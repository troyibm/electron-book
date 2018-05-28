class TitleBarActionsView {

    constructor(boundingE1) {
        this.closeE1 = boundingE1.querySelector("[data-bind=close]");
        this.bindUi();
    }

    bindUi() {
        this.closeE1.addEventListener("click", this.onClose.bind(this), false);
    }

    onClose(e) {
        e.preventDefault();
        nw.Window.get().close();
    }
}

exports.TitleBarActionsView = TitleBarActionsView