/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */


import {
  WordpressApi as WordpressApi
} from './components/wordpress-api/wordpress-api';

declare global {
  interface HTMLWordpressApiElement extends WordpressApi, HTMLElement {
  }
  var HTMLWordpressApiElement: {
    prototype: HTMLWordpressApiElement;
    new (): HTMLWordpressApiElement;
  };
  interface HTMLElementTagNameMap {
    "wordpress-api": HTMLWordpressApiElement;
  }
  interface ElementTagNameMap {
    "wordpress-api": HTMLWordpressApiElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      "wordpress-api": JSXElements.WordpressApiAttributes;
    }
  }
  namespace JSXElements {
    export interface WordpressApiAttributes extends HTMLAttributes {
      baseUrl?: string;
      name?: string;
    }
  }
}

