
const EventEmitter = require("events");

class I18nService extends EventEmitter {
    constructor() {
        super();
        this._locale = "en-US";
    }

    get locale() {
        return this._locale;
    }

    set locale(locale) {
        //validate locale...
        this._locale = locale; 
    }

    notify() {
        this.emit("update");
    }
}

exports.I18nService = I18nService;