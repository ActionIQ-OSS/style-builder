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
## Options
Style builder can also take options when building styles. Currently only one option is available.

`cache` (default: `true`): If true, style builder will store a cache of the results from style functions, key'd off the arguments. This is very useful in React if you use the pure render mixin. Each time you pass a computed style to a child component, it will receive the exact (===) same style object.

For example:
```
const _styles = StyleBuilder.build({
  awesomeStyle: (iLikeGreen) => ({
    background: iLikeGreen ? "green" : "blue",
  }),
}, {
  cache: true,
});
console.log(_styles.awesomeStyle(true) === _styles.awesomeStyle(true)); // true

const _styles = StyleBuilder.build({
  awesomeStyle: (iLikeGreen) => ({
    background: iLikeGreen ? "green" : "blue",
  }),
}, {
  cache: false,
});
console.log(_styles.awesomeStyle(true) === _styles.awesomeStyle(true)); // false
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

