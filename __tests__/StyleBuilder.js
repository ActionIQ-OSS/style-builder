jest.dontMock("../StyleBuilder");
jest.dontMock("../node_modules/object-assign/index.js");

const borderResult = {
  borderBottomColor:  "green",
  borderBottomStyle:  "solid",
  borderBottomWidth:  "1px",
  borderLeftColor:    "green",
  borderLeftStyle:    "solid",
  borderLeftWidth:    "1px",
  borderRightColor:   "green",
  borderRightStyle:   "solid",
  borderRightWidth:   "1px",
  borderTopColor:     "green",
  borderTopStyle:     "solid",
  borderTopWidth:     "1px"
}

describe("StyleBuilder", function() {
  var StyleBuilder = require("../StyleBuilder");

  it("converts border with 3 subcomponents, px style color", function() {
    expect(StyleBuilder.build({
      border: "1px solid green"
    })).toEqual(borderResult);
  });

  it("converts border with 3 subcomponents, px color style", function() {
    expect(StyleBuilder.build({
      border: "1px green solid"
    })).toEqual(borderResult);
  });

  it("converts border with 3 subcomponents, style color px", function() {
    expect(StyleBuilder.build({
      border: "solid green 1px"
    })).toEqual(borderResult);
  });

  it("converts border with 3 subcomponents, style px color", function() {
    expect(StyleBuilder.build({
      border: "solid 1px green"
    })).toEqual(borderResult);
  });

  it("converts border with 3 subcomponents, color style px", function() {
    expect(StyleBuilder.build({
      border: "green solid 1px"
    })).toEqual(borderResult);
  });

  it("converts border with 3 subcomponents, color px style", function() {
    expect(StyleBuilder.build({
      border: "green 1px solid"
    })).toEqual(borderResult);
  });

  it("converts top border with only style and width defined", function() {
    expect(StyleBuilder.build({
      borderTop: "solid 1px"
    })).toEqual({
      borderTopStyle: "solid",
      borderTopWidth: "1px",
      borderTopColor: "initial"
    })
  });

  it("converts bottom border with only width and color defined", function() {
    expect(StyleBuilder.build({
      borderBottom: "1px green"
    })).toEqual({
      borderBottomStyle: "initial",
      borderBottomWidth: "1px",
      borderBottomColor: "green"
    })
  });

  it("converts right border with only color and style defined", function() {
    expect(StyleBuilder.build({
      borderRight: "solid green"
    })).toEqual({
      borderRightStyle: "solid",
      borderRightWidth: "initial",
      borderRightColor: "green"
    })
  });

  it("converts top border with only style defined", function() {
    expect(StyleBuilder.build({
      borderTop: "solid"
    })).toEqual({
      borderTopStyle: "solid",
      borderTopWidth: "initial",
      borderTopColor: "initial"
    })
  });

  it("converts bottom border with only color defined", function() {
    expect(StyleBuilder.build({
      borderBottom: "green"
    })).toEqual({
      borderBottomStyle: "initial",
      borderBottomWidth: "initial",
      borderBottomColor: "green"
    })
  });

  it("converts right border with only width defined", function() {
    expect(StyleBuilder.build({
      borderRight: "1px"
    })).toEqual({
      borderRightStyle: "initial",
      borderRightWidth: "1px",
      borderRightColor: "initial"
    })
  });

  it("converts margin with one subcomponent", function() {
    expect(StyleBuilder.build({
      margin: "5px"
    })).toEqual({
      marginTop:    "5px",
      marginRight:  "5px",
      marginBottom: "5px",
      marginLeft:   "5px"
    });
  });

  it("converts margin with two subcomponents", function() {
    expect(StyleBuilder.build({
      margin: "5px 10px"
    })).toEqual({
      marginTop:    "5px",
      marginRight:  "10px",
      marginBottom: "5px",
      marginLeft:   "10px"
    });
  });

  it("converts margin with three subcomponent", function() {
    expect(StyleBuilder.build({
      margin: "5px 10px 15px"
    })).toEqual({
      marginTop:    "5px",
      marginRight:  "10px",
      marginBottom: "15px",
      marginLeft:   "10px"
    });
  });

  it("converts margin with four subcomponent", function() {
    expect(StyleBuilder.build({
      margin: "5px 10px 15px 20px"
    })).toEqual({
      marginTop:    "5px",
      marginRight:  "10px",
      marginBottom: "15px",
      marginLeft:   "20px"
    });
  });

  it("convert a style given as a function call", function() {
    expect(StyleBuilder.build({
      elem: function(size) {
        return {
          margin: size,
        };
      },
    }).elem("5px")).toEqual({
      marginTop:    "5px",
      marginRight:  "5px",
      marginBottom: "5px",
      marginLeft:   "5px",
    });
  });

  it("returns the same object for style functions when given the same params", function() {
    var styles = StyleBuilder.build({
      fn: function(a, b, c) {
        return {
          background: a ? "green" : "blue",
          margin: b ? "5px" : "10px",
          padding: c ? "1px 2px" : "3px 4px",
        };
      }
    });
    expect(styles.fn(true, false, true)).toBe(styles.fn(true, false, true));
    expect(styles.fn(false, true, false)).toBe(styles.fn(false, true, false));
    expect(styles.fn(false, true)).not.toBe(styles.fn(false, false));
  });

  it("returns different objects for style functions when given different params, even if response has same keys and values", function() {
    var styles = StyleBuilder.build({
      fn: function(a, b, c) {
        return {
          background: "green",
        };
      }
    });
    expect(styles.fn(true, true, true)).toEqual(styles.fn(false, false, false));
    expect(styles.fn(true, true, true)).not.toBe(styles.fn(false, false, false));
  });

  it("caches separately for different style functions", function() {
    var styles = StyleBuilder.build({
      fn1: function(a, b, c) {
        return {
          background: "green",
        };
      },
      fn2: function(d, e, f) {
       return {
         background: "blue",
       };
      },
    });
    expect(styles.fn1(true, true, true)).not.toBe(styles.fn2(true, true, true));
    expect(styles.fn1(true, true, true)).not.toEqual(styles.fn2(true, true, true));
  });
});
