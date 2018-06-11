const appWindow = nw.Window.get();

class TrayView {
    constructor(title) {
        this.tray = null;
        this.title = title;

        // subscribe to window events
        appWindow.on("maximize", () => this.render(false));
        appWindow.on("minimize", () => this.render(false));
        appWindow.on("restore", () => this.render(true));

        this.removeOnExit();
        this.render(true);
    }

    getItems(reset) {
        return [
            {
                label: "Minimize",
                enabled: reset,
                click: () => appWindow.minimize()
            },
            {
                label: "Maximize",
                enabled: reset,
                click: () => appWindow.maximize()
            },
            {
                label: "Restore",
                enabled: !reset,
                click: () => appWindow.restore()
            },
            {
                type: "separator"
            },
            {
                label: "Exit",
                click: () => appWindow.close()
            }
        ];
    }

    render(reset) {
        if (this.tray) {
            this.tray.remove();
        }
        const icon = (process.platform === "darwin" ? "icon-32x32.png" : "icon-48x48.png");

        this.tray = new nw.Tray({
            title: this.title,
            icon,
            iconsAreTemplates: false
        });

        const menu = new nw.Menu();
        this.getItems(reset).forEach((item) => menu.append(new nw.MenuItem(item)));
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