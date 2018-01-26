var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WordPress } from './wordpress';
export class WordpressApi {
    constructor() {
        this.baseUrl = window.location.origin;
        this.name = "WordPress";
        this.ready = false;
        this.cookie = false;
    }
    componentWillLoad() {
        this.wp = new WordPress(this.baseUrl, this.name, this.nonce);
        this.api = this.wp;
        window["WordPress"] = this;
        this.prepare().then((result) => {
            this.ready = result;
            console.log('Prepared, mounting');
        });
    }
    signedIn() {
        return this.cookie;
    }
    prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.wp.prepareDatabase().then(() => {
                return true;
            }).catch((err) => {
                return false;
            });
        });
    }
    componentDidLoad() {
    }
    render() {
        return (h("div", null, this.ready
            ? h("slot", null)
            : h("div", null)));
    }
    static get is() { return "wordpress-api"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return { "api": { "type": "Any", "attr": "api", "mutable": true }, "baseUrl": { "type": String, "attr": "base-url" }, "cookie": { "state": true }, "name": { "type": String, "attr": "name" }, "nonce": { "type": String, "attr": "nonce" }, "prepare": { "method": true }, "ready": { "state": true }, "signedIn": { "method": true }, "wp": { "state": true } }; }
}
