jest.dontMock("../StyleBuilder");
jest.dontMock("underscore");

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
});
