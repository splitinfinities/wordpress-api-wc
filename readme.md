<h1 align="center">WordPress API Web Component</h1>

<div align="center">
  <strong>Super simple, Modern IndexedDB-first WordPress REST API Web Component</strong>
</div>

<br />

## Table of Contents
- [Features](#features)
- [Example](#example)
- [Philosophy](#philosophy)
- [Events](#events)
- [Optimizations](#optimizations)
- [API](#api)
- [Installation](#installation)
- [Support](#support)
- [Contributing](#contibuting)
- [License](#license)
- [Citations](#citations)

## Features
More to come!

## Example

First, queue the script: 
`<script src='https://unpkg.com/wordpress-api-wc/dist/wordpress-api-wc.js'></script>`

Finally, declare it on your site:
```html
<wordpress-api>
  <!-- Great for mounting an app on demand -->
  <div>Loaded! Start your React/Vue/Choo/whatever app declaratively, here!</div>
</wordpress-api>
```

Once the component is mounted, it will begin syncing your wordpress database to a local IndexedDB. All interaction with the database will first talk to the IndexedDB, then as a fallback, it will make a network request. 

### Instantiation and more
```js
<wordpress-api>
  <div>Loaded!</div>
</wordpress-api>


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
The <wordpress-api> element will emit these three events: 

### `'mounting'`
More to come

### `'loading'`
More to come

### `'ready'`
More to come


## Optimizations

### PRPL (Getting pertinent content immediately, pulling the rest in the background)
More to come

### Using a Web Worker so you don't block the UI Thread
More to come

## API
Coming soon!

## Installation

### Script tag

- Put a script tag similar to this `<script src='https://unpkg.com/wordpress-api-wc/dist/wordpress-api.js'></script>` in the head of your index.html
- Then you can use the element `<wordpress-api base-url="https://example.website"></wordpress-api>` anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install wordpress-api-wc --save`
- Put a script tag similar to this `<script src='node_modules/wordpress-api-wc/dist/wordpress-api.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install wordpress-api-wc --save`
- Add `{ name: 'wordpress-api-wc' }` to your [collections](https://github.com/ionic-team/stencil-starter/blob/master/stencil.config.js#L5)
- Then you can use the element anywhere in your template, JSX, html etc

## Support
More to come!


## Contributing
[MIT](https://tldrlegal.com/license/mit-license)


## License
[MIT](https://tldrlegal.com/license/mit-license)

## Citations
I absolutely ADORE [Choo](https://github.com/choojs/choo), and the way the team does their documentation. I did bite this readme format from their readme. It's a fantastic framework and I highly, HIGHLY recommend trying it out! 


![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)