import { Component, Prop, State, Method } from '@stencil/core';
import { WordPress } from './wordpress';

@Component({
  tag: 'wordpress-api',
  shadow: true
})

export class WordpressApi {
  @Prop() baseUrl: string = window.location.origin;
  @Prop() name: string = "WordPress";
  @Prop() component: string = "p";
  @Prop() componentProps: { [key: string]: any } = {};
  @Prop() nonce: string;
  @Prop({mutable: true}) api: any;
  @State() wp;
  @State() ready = false;
  @State() cookie = false;

  componentWillLoad () {
    this.wp = new WordPress(this.baseUrl, this.name, this.nonce);
    this.api = this.wp;

    window["WordPress"] = this;

    if (this.prepared()) {
      this.ready = true;
    }

    this.prepare().then((result) => {
      this.ready = result;
    });
  }

  @Method()
  signedIn() {
    return this.cookie;
  }

  @Method()
  async prepare() {
    return await this.wp.prepareDatabase().then(() => {
      localStorage.setItem(`${this.name}-populated`, 'true');
       return true;
    }).catch(() => {
      return false;
    });
  }

  @Method()
  async prepared() {
    const item = localStorage.getItem(`${this.name}-populated`);

    return item === "true";
  }

  render () {
    const childProps = {
      ...this.componentProps,
    };

    return (
      this.ready && <this.component {...childProps} />
    )
  }
}
