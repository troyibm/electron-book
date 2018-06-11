const appWindow = nw.Window.get();

class TrayView {
    constructor(title) {
        this.tray = null;
        this.title = title;
        this.removeOnExit();
        this.render();
    }

    render() {
        const icon = (process.platform === "linux" ? "icon-48x48.png" : "icon-32x32.png");

        this.tray = new nw.Tray({
            title: this.title,
            icon,
            iconsAreTemplates: false
        });

        const menu = new nw.Menu();
        menu.append(new nw.MenuItem({
            label: "Exit",
            click: () => appWindow.close()
        }));
        this.tray.menu = menu;
    }

    removeOnExit() {
        appWindow.on("close", () => {
            this.tray.remove();
            appWindow.hide();
            // pretend to be closed already
            appWindow.close(true);
        });

        // do not spawn any Tray instances on page reload
        window.addEventListener("beforeunload", () => this.tray.remove(), false);
    }
}

exports.TrayView = TrayView;