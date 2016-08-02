# backbone-todomvc-demo

A small demo project that shows how to use webpack + backbone for client-side development in ES6.

## Description

This project is written in ES6-code with the using backbone. You can show tasks (todo) list, add/remove/edit task. All data store in localStorage. Additionally, for shows `Backbone.Router` working added some views.

## Installation

* Install  [nodejs](https://nodejs.org)
* Run follow code in terminal:

```
cd backbone-todomvc-demo
npm install
npm install -g webpack
bower intall
```

## Usage


* Build once and after open `index.html` in a web browser:
```
npm run build
```
* If you want that *watch files* continuously, rebuild incrementally whenever one of them changes, then open `index.html` in a web browser, manually reload page whenever there was a change.
```
npm run watch
```
* If you want hot reloading via the webpack development server, then go to `http://localhost:8080/` (The page reloads automatically when there are changes).
```
npm start
```
