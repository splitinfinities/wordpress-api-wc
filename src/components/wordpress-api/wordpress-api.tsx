import { Component, Prop, State } from '@stencil/core';
import { WordPress } from './wordpress';

@Component({
  tag: 'wordpress-api'
})
export class WordpressApi {
  @Prop() baseUrl: string = window.location.origin;
  @State() wp;
  @State() ready = false;

  componentWillLoad () {
    this.wp = new WordPress(`${this.baseUrl}`);

    this.wp.prepareDatabase().then((data) => {
        console.log("Synced!", data)
        this.ready = true;
    }).catch((err) => {
        console.log(err)
    });
  }

  componentDidLoad() {

  }
}
