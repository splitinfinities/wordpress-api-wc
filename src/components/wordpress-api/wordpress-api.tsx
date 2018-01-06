import { Component, Prop, State, Method } from '@stencil/core';
import { WordPress } from './wordpress';

@Component({
  tag: 'wordpress-api',
  shadow: true
})
export class WordpressApi {
  @Prop() baseUrl: string = window.location.origin;
  @Prop() name: string = "WordPress";
  @State() wp;
  @State() ready = false;

  componentWillLoad () {
    this.wp = new WordPress(this.baseUrl, this.name);
    window["WordPress"] = this;

    this.prepare().then((result) => {
      this.ready = result;
      console.log('Prepared, mounting')
    });
  }

  @Method()
  api() {
    return this.wp;
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
