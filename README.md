[![Build Status](https://travis-ci.org/advanced-rest-client/response-raw-viewer.svg?branch=master)](https://travis-ci.org/advanced-rest-client/response-raw-viewer)  

# response-raw-viewer

An element to display the raw response data without syntax highlighting.


### Example
```
<response-raw-viewer></response-raw-viewer>
```
```
var display = document.querySelector('response-raw-viewer');
display.responseText = someResponse;
```

## Content actions
By default the user can copy content of the code to clipboard and wrap the code.
This actions are always visible.
You can add more actions in the actions bar by putting elements as a children
of this element.
### Example
```
<response-raw-viewer>
  <paper-icon-button title="Additional action" icon="arc:cached"></paper-icon-button>
  <paper-icon-button title="Clear the code" icon="arc:clear"></paper-icon-button>
</response-raw-viewer>
```
See demo for more information.

## Custom search
If the platform doesn't support native text search, this element implements
`ArcBehaviors.TextSearchBehavior` and exposes the `query` attribute.
Set any text to the `query` attribute and it will automatically highlight
occurance of the text.

### Styling
`<response-raw-viewer>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--response-raw-viewer` | Mixin applied to the element | `{}`
`--arc-font-code1` | Mixin applied to the code block (theme mixin) | `{}`
`--response-raw-viewer-button-active` | Background color of the `wrap` button | `#BDBDBD`
`--response-raw-viewer-action-bar` | Mixin applied to the action bar above the highlighted code | `{}`
`--no-info-message` | Mixin applied to the "nothing to display" message (theme variable) | `{}`

