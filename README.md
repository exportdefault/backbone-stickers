# backbone-stickers

A small project that shows how to use webpack + backbone for client-side development in ES6 and sync data with server (nodejs/express + mongodb). 

This project is written in ES6-code with the using backbone.

## Installation

* Install [nodejs](https://nodejs.org)
* Install [mongodb](https://www.mongodb.com/) ([for ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04))
* Run follow code in terminal:

```
git clone https://github.com/exportdefault/backbone-stickers.git
cd backbone-stickers
npm install
npm install -g webpack
cd public && bower install
```

## Usage

* For built once JS, SCSS files you can start webpack in terminal. If you want that *watch files* continuously, rebuild incrementally whenever one of them changes, using `--watch`.

```
webpack
webpack --watch
```
* For run server and test functionall run server and then then go to `http://localhost:4311/`

```
node server/server.js
```

## Description

### What can the app?

lalala ...

### Core objects

For simplify some backbone component was extended.

lalala ...

### Authentication

For client-side authentication use technics like [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) headers in authentication requests to prevent forgery, global session model in backbone, auth state persistence through signed cookies and model validation (@todo).

In the server-side, we use the `CSRF Express.js middleware`, and then with [Handlebars templating engine](https://github.com/donpark/hbs) to render the initial HTML wrapper with this token, like:

```
<meta name="csrf-token" content="{{csrfToken}}">
```

In the client side use Session model we can extract this token from meta tag using jQuery like 
```
let token = $('meta[name="csrf-token"]').attr('content');
```

There's singelton SessionModel to manage state. Views and other models all can subscribe to changes in session state and extract current authorizate user data:

```
app.session.on('change:logged_in'"', this.onLoginStatusChange);
var message = 'Logged in as ' + app.session.user.get('username'"')
```

### Server-side

The server-layer is a lightweight, single-file Express.js HTTP server and MongoDB. It responds to a number of typical authentication API routes, as well as renders the initial `index.html` page wrapper to plant the session CSRF token. Ofcause, it’s a good practice to have an isolated User/Auth model in the server which handles validations and database interaction, **but** for simplicity this functionality is encapsulated inside API handlers (at the controller-level).


## Task

some text about firstly task ...
