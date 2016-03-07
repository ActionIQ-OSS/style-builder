/**
 * StyleBuilder. Breaks apart short hand properties (padding, margin, border, etc) into their
 * sub components.
 *
 * Currently react doesn't properly handle short hand properties: http://jsfiddle.net/ox3Lcmuy/
 *
 * If you start with
 *    { border: 1px solid red }
 * then add an active state with
 *    { borderColor: green }
 * you'll correctly see
 *    { border: 1px solid green }
 * but as soon as you remove that active border state and only define { border: 1px soild red} again
 * you'll be left with a black border because of the way React handles its style diffing.
 * See a more detailed explanation here:
 *
 * By always breaking up short hand components into their smaller parts we should be able to sidestep
 * this problem.
 *
 * TODO:
 *  background
 *  font
 *  transition
 *  transform
 *  list-style
 */

const objectAssign = require('object-assign');
"use strict";

const _borderStyles = ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];
const _units = ["px", "em", "pt", "%"];

class StyleBuilder {

  /*
   * Properly converts 4 part values (like padding and margin) into an
   * array, each index matching one of the 4 sub components.
   */
  _explodeToFour(value) {
    let fourPartArray = [0, 1, 2, 3];
    let valueArray = value.split(" ");
    if (valueArray.length == 1) {
      fourPartArray = fourPartArray.map(() => valueArray[0]);
    } else if (valueArray.length == 2) {
      fourPartArray = fourPartArray.map((v, i) => valueArray[i % 2]);
    } else if (valueArray.length == 3) {
      fourPartArray = fourPartArray.map((v, i) => valueArray[i % 3 + Math.floor(i / 3)]);
    } else {
      fourPartArray = valueArray;
    }
    return fourPartArray;
  }

  /*
   * Takes in an array of length 4 with a prefix and suffix and converts
   * it to an object with Top, Right, Bottom, Left
   */
  _applyFour(valueArr, prefix, suffix) {
    prefix = prefix || "";
    suffix = suffix || "";
    const styles = {};
    styles[`${prefix}Top${suffix}`] = valueArr[0];
    styles[`${prefix}Right${suffix}`] = valueArr[1];
    styles[`${prefix}Bottom${suffix}`] = valueArr[2];
    styles[`${prefix}Left${suffix}`] = valueArr[3];
    return styles;
  }

  /*
   * Takes in an array of length 4 with a prefix and suffix and converts
   * it to an object with TopLeft, TopRight, BottomRight, BottomLeft
   */
  _applyFourCorner(valueArr, prefix, suffix) {
    prefix = prefix || "";
    suffix = suffix || "";
    const styles = {};
    styles[`${prefix}TopLeft${suffix}`] = valueArr[0];
    styles[`${prefix}TopRight${suffix}`] = valueArr[1];
    styles[`${prefix}BottomRight${suffix}`] = valueArr[2];
    styles[`${prefix}BottomLeft${suffix}`] = valueArr[3];
    return styles;
  }

  /*
   * Adds px to any numbers that do not have an extension
   */
  applyPX(values) {
    return values.map(v => {
      if (_units.filter(u => v.indexOf(u) > -1).length === 0) {
        return v + "px";
      }
      return v;
    });
  }

  margin(value) {
    return this._applyFour(this._explodeToFour(value), "margin");
  }

  padding(value) {
    return this._applyFour(this._explodeToFour(value), "padding");
  }

  borderRadius(value) {
    let partOne = this._explodeToFour(value.split("/")[0]);
    if (value.indexOf("/") > -1) {
      const partTwo = this._explodeToFour(value.split("/")[1]);
      partOne = partOne.map((v, index) => v + " " + partTwo[index]);
    }
    return this._applyFourCorner(partOne, "border", "Radius");
  }

  borderStyle(value) {
    return this._applyFour(this._explodeToFour(value), "border", "Style");
  }

  borderColor(value) {
    return this._applyFour(this._explodeToFour(value), "border", "Color");
  }

  borderWidth(value) {
    return this._applyFour(this._explodeToFour(value), "border", "Width");
  }

  borderSide(value, side) {
    const styles = {
      [`border${side}Width`]: "initial",
      [`border${side}Style`]: "initial",
      [`border${side}Color`]: "initial",
    };

    const values = value.split(" ");
    if (values.length > 3) {
      console.warn(`More than 3 properties found in border: ${value}. Only using first 3`);
    }

    let widthIndex, styleIndex, colorIndex = -1;
    [0, 1, 2].forEach(index => {
      if (values[index] === undefined) { return; }

      const v = values[index].trim();

      if (_borderStyles.indexOf(v) > -1) {
        if (styleIndex > -1) { console.warn(`Found more than one 'style' border prop: ${value}`); }
        styleIndex = index;
      } else if (!isNaN(parseFloat(v))) {
        if (widthIndex > -1) { console.warn(`Found more than one 'width' border prop: ${value}`); }
        widthIndex = index;
      } else {
        if (colorIndex > -1) { console.warn(`Found more than one 'color' border prop: ${value}`); }
        colorIndex = index;
      }
    });

    if (widthIndex > -1) { styles[`border${side}Width`] = values[widthIndex]; }
    if (styleIndex > -1) { styles[`border${side}Style`] = values[styleIndex]; }
    if (colorIndex > -1) { styles[`border${side}Color`] = values[colorIndex]; }

    return styles;
  }

  borderLeft(value) {
    return this.borderSide(value, "Left");
  }

  borderRight(value) {
    return this.borderSide(value, "Right");
  }

  borderTop(value) {
    return this.borderSide(value, "Top");
  }

  borderBottom(value) {
    return this.borderSide(value, "Bottom");
  }

  border(value) {
    // TODO: Properly handle { border: <style> | <style> <color> }
    return objectAssign({},
                          this.borderSide(value, "Left"),
                          this.borderSide(value, "Right"),
                          this.borderSide(value, "Top"),
                          this.borderSide(value, "Bottom"));
  }

  build(styles, options) {
    let newStyles;
    if (styles.length !== undefined) {
      newStyles = [];
    } else {
      newStyles = {};
    }

    /*
     * Options:
     *
     * cache [default: true]: if style builder should cache responses from style functions
     */
    options = objectAssign({}, {
      cache: true
    }, options);

    /*
     * Loop through each key in the object, if array Object.keys returns
     * indexes.
     */
    Object.keys(styles).forEach((key) => {
      const value = styles[key];
      const type = typeof value;

      if (type == "string") {
        if (this[key]) {
          objectAssign(newStyles, this[key](value));
        } else {
          newStyles[key] = value;
        }
      } else if (type == "object" && value.length !== undefined) {
        newStyles[key] = value.map(v => this.build(v));
      } else if (type == "object") {
        newStyles[key] = this.build(value);
      } else if (type == "function") {
        /*
         * A cache to store the result of style functions when passed the same arguments.
         * Helps make PureRenderMixin more performant as without the cache each call to
         * the function returns a new object instance.
         */
        const styleCache = {};

        newStyles[key] = (...args) => {
          if (options.cache) {
            const key = JSON.stringify(args);
            if (!styleCache[key]) {
              styleCache[key] = this.build(value(...args));
            }
            return styleCache[key];
          }
          return this.build(value(...args));
        };
      } else {
        newStyles[key] = value;
      }

    });

    return newStyles;
  }
}

export default new StyleBuilder();

