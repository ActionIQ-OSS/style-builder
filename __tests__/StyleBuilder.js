jest.dontMock("../StyleBuilder");
jest.dontMock("underscore");

describe("StyleBuilder", function() {
	var StyleBuilder = require("../StyleBuilder");

	it("converts border with 3 subcomponents", function() {
		expect(StyleBuilder.build({
			border: "1px solid green"
		})).toEqual({
			borderBottomColor: 	"green",
			borderBottomStyle: 	"solid",
			borderBottomWidth: 	"1px",
			borderLeftColor: 		"green",
			borderLeftStyle: 		"solid",
			borderLeftWidth: 		"1px",
			borderRightColor: 	"green",
			borderRightStyle: 	"solid",
			borderRightWidth: 	"1px",
			borderTopColor: 		"green",
			borderTopStyle: 		"solid",
			borderTopWidth: 		"1px"
		});
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

	it("converts margin with one subcomponent", function() {
		expect(StyleBuilder.build({
			margin: "5px"
		})).toEqual({
			marginTop: "5px",
			marginRight: "5px",
			marginBottom: "5px",
			marginLeft: "5px"
		});
	});

	it("converts margin with two subcomponents", function() {
		expect(StyleBuilder.build({
			margin: "5px 10px"
		})).toEqual({
			marginTop: "5px",
			marginRight: "10px",
			marginBottom: "5px",
			marginLeft: "10px"
		});
	});

	it("converts margin with three subcomponent", function() {
		expect(StyleBuilder.build({
			margin: "5px 10px 15px"
		})).toEqual({
			marginTop: "5px",
			marginRight: "10px",
			marginBottom: "15px",
			marginLeft: "10px"
		});
	});

	it("converts margin with four subcomponent", function() {
		expect(StyleBuilder.build({
			margin: "5px 10px 15px 20px"
		})).toEqual({
			marginTop: "5px",
			marginRight: "10px",
			marginBottom: "15px",
			marginLeft: "20px"
		});
	});
});
