# backbone-stickers

A small project that shows how to use webpack + backbone for client-side development in ES6 and sync data with server (nodejs/express + mongodb). This project is written in ES6-code with the using backbone.

![alt tag](public/i/preview.png)

## Task

To develop SPA with the following functionality:

![alt tag](public/i/task.png)

- User's registration and authorization.
- Unauthorized users (guests) can only register, all other function is available only authorized users.
- Displays a list of entities (see. picture above). This list will be loaded from the server in JSON format using the AJAX-request (you can create your own server, or use a cloud database with the REST API interface).
- Each entity must have at least the title, a short description and state of the Like (or likes counter).
- When you click on "X", corresponding card is removed from the page (using any jquery effect) and sent a request to delete the card from the server.
- Clicking on the "Like" - changing design of labels and sent a request to the server to make the appropriate changes.
- Like state must be associated with the authorized user.
- Adding and editing entities are available users with `admin` role.

Extra points:
- Use modular approach.
- Application must be single page.
- When you refresh the page, it's displayed with the specified URL route.

## Installation

* Install [nodejs](https://nodejs.org)
* Install [mongodb](https://www.mongodb.com/) ([for ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-14-04))
* Run follow code in terminal:

```
git clone https://github.com/exportdefault/backbone-stickers.git
cd backbone-stickers
npm install -g webpack bower
npm install
cd public && bower install
```

## Usage

* For built once JS, SCSS files you can start webpack in terminal. If you want that *watch files* continuously, rebuild incrementally whenever one of them changes, using `--watch`.

```
webpack
webpack --watch
```
* For run server and test functionall run server and then then go to `http://localhost:4311/` (You can change port in `server/config`.

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
app.session.on('change:logged_in', this.onLoginStatusChange);
var message = 'Logged in as ' + app.session.user.get('username');
```

### Server-side

The server-layer is a lightweight, single-file Express.js HTTP server and MongoDB. It responds to a number of typical authentication API routes, as well as renders the initial `index.html` page wrapper to plant the session CSRF token. Ofcause, it’s a good practice to have an isolated User/Auth model in the server which handles validations and database interaction, **but** for simplicity this functionality is encapsulated inside API handlers (at the controller-level).
