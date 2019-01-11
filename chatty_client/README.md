Chatty
=====================

A minimal and light version of Slack and other real-time chat apps.

Supports multiple simultaneous client connections and shows all users the total number of fellow users currently online as well. Initiates each session as an anonymous user, but user name can be changed (with notifications sent to all other users when this is done by any one individual user).

Built using Javascript, React, Websockets and Webpack.

### Usage

Clone the boilerplate and create your own git repo.

```
* Fork and clone this repo
* run npm install (do this separately in the /chatty_client and chatty_server directories after cloning to install dependencies)
* npm start in both directories
* Open http://localhost:3000 in browser

### Screenshots

Screenshot showing 5 users connected, with name change notifications and messages.

!["chatty_screenshot.png"](https://github.com/richmondwong/chatty_app_restructured_file_system/blob/master/docs/chatty_screenshot.png)

### Dependencies

* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server
* react
* react-dom