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
        this.component = "p";
        this.componentProps = {};
        this.ready = false;
        this.cookie = false;
    }
    componentWillLoad() {
        this.wp = new WordPress(this.baseUrl, this.name, this.nonce);
        this.api = this.wp;
        window["WordPress"] = this;
        if (this.prepared()) {
            this.mountUp();
            this.ready = true;
        }
        this.prepare().then((result) => {
            this.mountUp();
            this.ready = result;
        });
    }
    signedIn() {
        return this.cookie;
    }
    mountUp() {
        this.element.innerHTML = "";
    }
    prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.wp.prepareDatabase().then(() => {
                localStorage.setItem(`${this.name}-populated`, 'true');
                return true;
            }).catch(() => {
                return false;
            });
        });
    }
    prepared() {
        const item = localStorage.getItem(`${this.name}-populated`);
        return item === "true";
    }
    render() {
        const childProps = Object.assign({}, this.componentProps);
        return (this.ready && h(this.component, Object.assign({}, childProps)));
    }
    static get is() { return "wordpress-api"; }
    static get properties() { return { "api": { "type": "Any", "attr": "api", "mutable": true }, "baseUrl": { "type": String, "attr": "base-url" }, "component": { "type": String, "attr": "component" }, "componentProps": { "type": "Any", "attr": "component-props" }, "cookie": { "state": true }, "element": { "elementRef": true }, "mountUp": { "method": true }, "name": { "type": String, "attr": "name" }, "nonce": { "type": String, "attr": "nonce" }, "prepare": { "method": true }, "prepared": { "method": true }, "ready": { "state": true }, "signedIn": { "method": true }, "wp": { "state": true } }; }
}
