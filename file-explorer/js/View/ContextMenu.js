class ContextMenuView {
    constructor(fileService, i18nService) {
        this.file = fileService;
        this.i18n = i18nService;
        this.attach();
    }

    getItems(fileName) {
        const file = this.file,
            isCopied = Boolean(file.copiedFile);
        return [
            {
                label: this.i18n.translate("SHOW_FILE_IN_FOLDER", "Show items in the Folder"),
                enabled: Boolean(fileName),
                click: () => file.showInFolder(fileName)
            },
            {
                type: "separator"
            },
            {
                label: this.i18n.translate("COPY", "Copy"),
                enabled: Boolean(fileName),
                click: () => file.copy(fileName)
            },
            {
                label: this.i18n.translate("PASTE", "Paste"),
                enabled: isCopied,
                click: () => file.paste()
            },
            {
                label: this.i18n.translate("PASTE_FROM_CLIPBOARD", "Paste image from clipboard"),
                enabled: file.hasImageInClipboard(),
                click: () => file.pasteFromClipboard()

            },
            {
                type: "separator"
            },
            {
                label: this.i18n.translate("DELETE", "Delete"),
                enabled: Boolean(fileName),
                click: () => file.remove(fileName)
            }
        ];
    }

    render(fileName) {
        const menu = new nw.Menu();
        this.getItems(fileName).forEach(((item) => menu.append(new nw.MenuItem(item))));
        return menu;
    }

    attach() {
        document.addEventListener("contextmenu", (e) => {
            const el = e.target;
            if (!(el instanceof HTMLElement)) {
                return;
            }

            if (el.classList.contains("file-list")) {
                e.preventDefault();
                this.render().popup(e.x, e.y);
            }

            // if a child of an element matching [data-file]
            if (el.parentNode.dataset.file) {
                e.preventDefault();
                this.render(el.parentNode.dataset.file).popup(e.x, e.y);
            }
        });
    }
};

exports.ContextMenuView = ContextMenuView;