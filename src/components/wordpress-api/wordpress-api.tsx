import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'wordpress-api'
})
export class WordpressApi {
  @Prop() baseUrl: string = window.location.origin;
  @Prop() worker: Worker = new Worker('worker.js');
  @State() db;
  @State() api;

  componentWillLoad () {

  }

  componentDidLoad() {
    this.api.prepareDB(true);
  }
}
