[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/response-raw-viewer.svg)](https://www.npmjs.com/package/@advanced-rest-client/response-raw-viewer)

[![Build Status](https://travis-ci.org/advanced-rest-client/response-raw-viewer.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/response-raw-viewer)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/response-raw-viewer)

## &lt;response-raw-viewer&gt;

An element to display the raw HTTP response data without syntax highlighting.

```html
<response-raw-viewer response-text="Some response"></response-raw-viewer>
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/response-raw-viewer
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/response-raw-viewer/response-raw-viewer.js';
    </script>
  </head>
  <body>
    <response-raw-viewer response-text="Some response"></response-raw-viewer>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import '@advanced-rest-client/response-raw-viewer/response-raw-viewer.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <response-raw-viewer response-text="Some response"></response-raw-viewer>
    `;
  }

  _authChanged(e) {
    console.log(e.detail);
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/response-raw-viewer
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
