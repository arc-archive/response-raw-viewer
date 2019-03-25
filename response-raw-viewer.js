/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {PayloadParserMixin} from '../../@advanced-rest-client/payload-parser-mixin/payload-parser-mixin.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
/**
 * An element to display the raw response data without syntax highlighting.
 *
 * ### Example
 *
 * ```html
 * <response-raw-viewer response-text="Some response"></response-raw-viewer>
 * <script>
 * const display = document.querySelector('response-raw-viewer');
 * display.responseText = someResponse;
 * < /script>
 * ```
 *
 * ## Content actions
 *
 * Custom actions can be defined by adding a child with `slot="content-action"`
 * attribute set. Eny element will be rendered in content action field.
 *
 * ### Example
 *
 * ```html
 * <response-raw-viewer>
 *  <paper-icon-button slot="content-action"
 *    title="Copy content to clipboard" icon="arc:content-copy"></paper-icon-button>
 * </response-raw-viewer>
 * ```
 *
 * See demo for more examples.
 *
 * ## Content text wrapping
 *
 * Set `wrap-text` property on the element to force the wiewer to wrap text.
 *
 * ## Changes in version 2
 *
 * - The element does not support custom search and does not include text search library
 *
 * ### Styling
 *
 * `<response-raw-viewer>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--response-raw-viewer` | Mixin applied to the element | `{}`
 * `--arc-font-code1` | Mixin applied to the code block (theme mixin) | `{}`
 * `--response-raw-viewer-button-active` | Background color of the `wrap` button | `#BDBDBD`
 * `--response-raw-viewer-action-bar` | Mixin applied to the action bar above the highlighted code | `{}`
 * `--no-info-message` | Mixin applied to the "nothing to display" message (theme variable) | `{}`
 * `--response-raw-viewer-code` | Mixin applied to the code block | `{}`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof ApiElements
 * @appliesMixin PayloadParserMixin
 */
class ResponseRawViewer extends PayloadParserMixin(PolymerElement) {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      overflow: overlay;
      width: 100%;
      @apply --response-raw-viewer;
    }

    .raw-content {
      @apply --arc-font-code1;
      -webkit-user-select: text;
      user-select: text;
      white-space: pre;
      width: 100%;
      min-height: 52px;
      display: block;
      overflow: auto;
      max-width: 100%;
      @apply --response-raw-viewer-code;
    }

    :host([wrap-text]) .raw-content {
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    .actions-panel {
      @apply --layout-horizontal;
      @apply --layout-center;
      @apply --response-raw-viewer-action-bar;
    }

    .actions-panel.hidden {
      display: none;
    }

    .no-info {
      @apply --no-info-message;
    }
    </style>
    <div class\$="[[_computeActionsPanelClass(hasResponse)]]">
      <slot name="content-action"></slot>
    </div>
    <code id="rawContent" class="raw-content" hidden\$="[[!hasResponse]]"></code>
    <p class="no-info" hidden\$="[[hasResponse]]">Nothing to display.</p>
`;
  }

  static get is() {
    return 'response-raw-viewer';
  }
  static get properties() {
    return {
      /**
       * The response text to display.
       */
      responseText: {
        type: String,
        observer: '_responseChanged'
      },
      // Computed value, true if the responseText has text.
      hasResponse: {
        type: Boolean,
        value: false,
        computed: '_computeHasResponse(responseText)'
      },
      // If set to true then the text in the panel will be wrapped.
      wrapText: {
        type: Boolean,
        reflectToAttribute: true
      }
    };
  }

  _responseChanged(response) {
    if (!response) {
      this.$.rawContent.innerHTML = '';
    } else {
      const value = this._responseValue(response);
      this.$.rawContent.innerHTML = value ? this.htmlEscape(value) : '';
    }
  }
  /**
   * ARC stores workspace data with response object in a file.
   * It may happen that the data is a buffer when saving. This restores
   * the string if needed.
   * @param {String|Object} response Usually string response but may be
   * ARC converted object.
   * @return {String} Safe to process string.
   */
  _responseValue(response) {
    if (!response) {
      return response;
    }
    if (typeof response === 'string') {
      return response;
    }
    switch (response.type) {
      case 'Buffer':
        let str = '';
        for (let i = 0, len = response.data.length; i < len; i++) {
          str += String.fromCharCode(response.data[i]);
        }
        return str;
    }
    return '';
  }

  // Computes if the response is available and content is displayed.
  _computeHasResponse(responseText) {
    return !!responseText;
  }
  /**
   * Computes CSS class for the actions pane.
   *
   * @param {Boolean} hasResponse The `hasResponse` propety value of the
   * element.
   * @return {String} CSS class names for the panel depending on state of the
   * `hasResponse`property.
   */
  _computeActionsPanelClass(hasResponse) {
    let klas = 'actions-panel';
    if (!hasResponse) {
      klas += ' hidden';
    }
    return klas;
  }
}
window.customElements.define(ResponseRawViewer.is, ResponseRawViewer);
