
const EventEmitter = require("events");

class I18nService extends EventEmitter {
    constructor(dictionary) {
        super();
        this._locale = "en-US";
        this.dictionary = dictionary;
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

    translate(token, defaultValue) {
        const dictionary = this.dictionary[this._locale];
        return dictionary[token] || defaultValue;
    }
}

exports.I18nService = I18nService;