# Style Builder

A JavaScript utility to break apart shorthand CSS components in objects.

When using inline styles with React components, it can be dangerous to use shorthand CSS properties. As a work around, use StyleBuilder to break apart any shorthand properties that exist in your style objects.

Read our blog post [here](http://www.actioniq.co/blog/reactjs-cramping-my-style/)

## Example

```
const StyleBuilder = require("style-builder");

const _styles = StyleBuilder.build({
  margin: "5px 10px"
});

console.log(_styles);
{
  marginTop: "5px",
  marginRight: "10px",
  marginBottom: "5px",
  marginLeft: "10px"
}
```
## Build
```
npm run-script build
```

## Test
```
npm test
```

## TODO
* background
* font
* transition
* transform
* list-style

