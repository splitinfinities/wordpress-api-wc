<h1 align="center">Choo</h1>

<div align="center">
  :steam_locomotive::train::train::train::train::train:
</div>
<div align="center">
  <strong>Simple </strong>
</div>
<div align="center">
  A <code>4kb</code> framework for creating sturdy frontend applications
</div>

<br />

<div align="center">
  ![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)
</div>

## Table of Contents
- [Features](#features)
- [Example](#example)
- [Philosophy](#philosophy)
- [Events](#events)
- [Optimizations](#optimizations)
- [FAQ](#faq)
- [API](#api)
- [Installation](#installation)
- [See Also](#see-also)
- [Support](#support)
- [Contributing](#contibuting)

## Features
- __small:__ weighing `4kb`, Choo is a tiny little framework
- __modern:__ built for the cutting edge `browserify` compiler
- __declarative:__ our performant event system makes writing apps easy
- __performant:__ with only 6 methods there's not much to learn

## Example

First, queue the script: 
`<script src='https://unpkg.com/wordpress-api-wc/dist/wordpress-api-wc.js'></script>`

Finally, declare it on your site:
```html
<wordpress-api></wordpress-api>
```

Once the component is mounted, it will begin syncing your wordpress database to a local IndexedDB. All interaction with the database will first talk to the IndexedDB, then as a fallback, it will make a network request. 

#### Asking for stuff
```js
<wordpress-api></wordpress-api>

<script>
// This will return the instance of the API
var api = document.querySelector('wordpress-api').api();


// Or, since once the api is mounted, it adds `WordPress` to the window, you can do...
var api = window.WordPress;

// They're both references to the same instance.
// Once you've got your variable set, you can do this...

api.posts.all().then((posts) => {
  console.log(posts);
});

// or with await:
var posts = await api.posts.all();

</script>
```


## Philosophy
It should be absurdly easy to do a Single Page App with offline access. It should be super easy to make your site super performant. You shouldn't have any challenges with interacting with IndexedDB - it should be invisible. 


## Events
### `'DatabaseLoading'`
### `'DatabaseReady'`


## Optimizations
This is super fast out of the box. 

### Syncing pertinent content immediately
### Using a Web Worker so you don't block the UI Thread


## API
This section provides documentation on how each function in library works. It's
intended to be a technical reference. If you're interested in learning choo for
the first time, consider reading through the [handbook][handbook] first
:sparkles:

### `app = choo([opts])`
Initialize a new `choo` instance. `opts` can also contain the following values:
- __opts.history:__ default: `true`. Listen for url changes through the
  history API.
- __opts.href:__ default: `true`. Handle all relative `<a
  href="<location>"></a>` clicks and call `emit('render')`

### `app.use(callback(state, emitter, app))`
Call a function and pass it a `state`, `emitter` and `app`. `emitter` is an instance
of [nanobus](https://github.com/choojs/nanobus/). You can listen to
messages by calling `emitter.on()` and emit messages by calling
`emitter.emit()`. `app` is the same Choo instance. Callbacks passed to `app.use()` are commonly referred to as
`'stores'`.

If the callback has a `.storeName` property on it, it will be used to identify
the callback during tracing.

See [#events](#events) for an overview of all events.

### `app.route(routeName, handler(state, emit))`
Register a route on the router. The handler function is passed `app.state`
and `app.emitter.emit` as arguments. Uses [nanorouter][nanorouter] under the
hood.

See [#routing](#routing) for an overview of how to use routing efficiently.

### `app.mount(selector)`
Start the application and mount it on the given `querySelector`,
the given selector can be a String or a DOM element.

This will _replace_ the selector provided with the tree returned from `app.start()`.
If you want to add the app as a child to an element, use `app.start()` to obtain the tree and manually append it.

### `tree = app.start()`
Start the application. Returns a tree of DOM nodes that can be mounted using
`document.body.appendChild()`.

### `app.toString(location, [state])`
Render the application to a string. Useful for rendering on the server.

### `choo/html`
Create DOM nodes from template string literals. Exposes
[bel](https://github.com/shama/bel). Can be optimized using
[yo-yoify][yo-yoify].

### `choo/html/raw`
Exposes [bel/raw](https://github.com/shama/bel#unescaping) helper for rendering raw HTML content.

## Installation
```sh
$ npm install choo
```

## See Also
- [bankai](https://github.com/choojs/bankai) - streaming asset compiler
- [stack.gl](http://stack.gl/) - open software ecosystem for WebGL
- [yo-yo](https://github.com/maxogden/yo-yo) - tiny library for modular UI
- [bel](https://github.com/shama/bel) - composable DOM elements using template
  strings
- [tachyons](https://github.com/tachyons-css/tachyons) - functional CSS for
  humans
- [sheetify](https://github.com/stackcss/sheetify) - modular CSS bundler for
  `browserify`

## Support
Creating a quality framework takes a lot of time. Unlike others frameworks,
Choo is completely independently funded. We fight for our users. This does mean
however that we also have to spend time working contracts to pay the bills.
This is where you can help: by chipping in you can ensure more time is spent
improving Choo rather than dealing with distractions.

### Sponsors
Become a sponsor and help ensure the development of independent quality
software. You can help us keep the lights on, bellies full and work days sharp
and focused on improving the state of the web. [Become a
sponsor](https://opencollective.com/choo#sponsor)

<a href="https://opencollective.com/choo/sponsor/0/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/1/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/2/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/3/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/4/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/5/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/6/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/7/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/8/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/9/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/10/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/10/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/11/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/11/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/12/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/12/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/13/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/13/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/14/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/14/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/15/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/15/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/16/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/16/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/17/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/17/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/18/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/18/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/19/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/19/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/20/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/20/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/21/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/21/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/22/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/22/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/23/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/23/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/24/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/24/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/25/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/25/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/26/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/26/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/27/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/27/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/28/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/28/avatar.svg"></a>
<a href="https://opencollective.com/choo/sponsor/29/website" target="_blank"><img src="https://opencollective.com/choo/sponsor/29/avatar.svg"></a>

### Backers
Become a backer, and buy us a coffee (or perhaps lunch?) every month or so.
[Become a backer](https://opencollective.com/choo#backer)

<a href="https://opencollective.com/choo/backer/0/website" target="_blank"><img src="https://opencollective.com/choo/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/1/website" target="_blank"><img src="https://opencollective.com/choo/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/2/website" target="_blank"><img src="https://opencollective.com/choo/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/3/website" target="_blank"><img src="https://opencollective.com/choo/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/4/website" target="_blank"><img src="https://opencollective.com/choo/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/5/website" target="_blank"><img src="https://opencollective.com/choo/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/6/website" target="_blank"><img src="https://opencollective.com/choo/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/7/website" target="_blank"><img src="https://opencollective.com/choo/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/8/website" target="_blank"><img src="https://opencollective.com/choo/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/9/website" target="_blank"><img src="https://opencollective.com/choo/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/10/website" target="_blank"><img src="https://opencollective.com/choo/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/11/website" target="_blank"><img src="https://opencollective.com/choo/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/12/website" target="_blank"><img src="https://opencollective.com/choo/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/13/website" target="_blank"><img src="https://opencollective.com/choo/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/14/website" target="_blank"><img src="https://opencollective.com/choo/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/15/website" target="_blank"><img src="https://opencollective.com/choo/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/16/website" target="_blank"><img src="https://opencollective.com/choo/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/17/website" target="_blank"><img src="https://opencollective.com/choo/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/18/website" target="_blank"><img src="https://opencollective.com/choo/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/19/website" target="_blank"><img src="https://opencollective.com/choo/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/20/website" target="_blank"><img src="https://opencollective.com/choo/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/21/website" target="_blank"><img src="https://opencollective.com/choo/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/22/website" target="_blank"><img src="https://opencollective.com/choo/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/23/website" target="_blank"><img src="https://opencollective.com/choo/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/24/website" target="_blank"><img src="https://opencollective.com/choo/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/25/website" target="_blank"><img src="https://opencollective.com/choo/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/26/website" target="_blank"><img src="https://opencollective.com/choo/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/27/website" target="_blank"><img src="https://opencollective.com/choo/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/28/website" target="_blank"><img src="https://opencollective.com/choo/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/choo/backer/29/website" target="_blank"><img src="https://opencollective.com/choo/backer/29/avatar.svg"></a>

## License
[MIT](https://tldrlegal.com/license/mit-license)

[bankai]: https://github.com/choojs/bankai
[bel]: https://github.com/shama/bel
[browserify]: https://github.com/substack/node-browserify
[budo]: https://github.com/mattdesl/budo
[es2020]: https://github.com/yoshuawuyts/es2020
[handbook]: https://github.com/yoshuawuyts/choo-handbook
[hyperx]: https://github.com/substack/hyperx
[morphdom-bench]: https://github.com/patrick-steele-idem/morphdom#benchmarks
[nanomorph]: https://github.com/choojs/nanomorph
[nanorouter]: https://github.com/choojs/nanorouter
[yo-yo]: https://github.com/maxogden/yo-yo
[yo-yoify]: https://github.com/shama/yo-yoify
[unassertify]: https://github.com/unassert-js/unassertify
[window-performance]: https://developer.mozilla.org/en-US/docs/Web/API/Performance