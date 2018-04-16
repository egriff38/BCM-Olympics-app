# bcm-olympic-app

This was an app that was developed over the course of 2 months for the 2018 BCM Olympics event. The web app ran on Tablets, and was hosted locally connected to the dev server for web content and a seperate TCP Socket server for live content multicasting. The project uses the following technologies:

#### Front End

1. Vue and Vue-Router for rendering
2. Bulma for styling
3. Pug for HTML preprocessing
4. Socket.io for live socket connection
5. GSAP library for tweening animations
6. Markdown-it rendering on dynamic content.

#### Back End

1. Webpack 4 and Webpack dev server
2. Socket.io for live socket connection

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# Run websocket
npm run socketServer

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
