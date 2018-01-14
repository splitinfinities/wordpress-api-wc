import { Component, Prop, State, Method } from '@stencil/core';
import { WordPress } from './wordpress';

@Component({
  tag: 'wordpress-api',
  shadow: true
})

export class WordpressApi {
  @Prop() baseUrl: string = window.location.origin;
  @Prop() name: string = "WordPress";
  @Prop() nonce: string;
  @Prop({mutable: true}) api: any;
  @State() wp;
  @State() ready = false;
  @State() cookie = false;

  componentWillLoad () {
    this.wp = new WordPress(this.baseUrl, this.name, this.nonce);
    this.api = this.wp;

    window["WordPress"] = this;

    this.prepare().then((result) => {
      this.ready = result;
      console.log('Prepared, mounting')
    });
  }

  @Method()
  signedIn() {
    return this.cookie;
  }

  @Method()
  async prepare() {
    return await this.wp.prepareDatabase().then(() => {
       return true;
    }).catch((err) => {
      return false;
    });
  }

  componentDidLoad() {

  }

  render () {
    return (
      <div>
        {
          this.ready
          ? <slot></slot>
          : <div></div>
        }
      </div>
    )
  }
}
