/* jshint esversion: 6 */
// tests for theorem.js

// // true equality test template
// QUnit.test("Test Name", function(assert) {
//     assert.deepEqual(methCall, expected);
// });

var theorem = Theorem.Lib;

// tests default to rounding

// UTILITIES

QUnit.test("Test _round", function(assert) {
    assert.deepEqual(theorem._round(1.967, 2), 1.97, "basic");
    assert.deepEqual(theorem._round(Math.PI, 2), 3.14, "PI rounded to tenths");
    assert.throws(theorem._round(-1.967, 2), Error, "negative parameter 1");
    assert.throws(theorem._round(-1.967, -2), Error, "negative parameter 2");
    assert.deepEqual(theorem._round(0, 2), 0.00, "first argument is 0");
    assert.deepEqual(theorem._round(1, 0), 1, "0 decimal");
    assert.deepEqual(theorem._round(0, 0), 0, "0 number and decimal");
});

QUnit.test("Test range", function(assert) {
    assert.deepEqual(theorem.range(0,5), [0,1,2,3,4,5], "Test 6 element range");
    assert.deepEqual(theorem.range(0,0), [0], "0 value parameters");
    assert.throws(theorem.range(-5,0), Error, "Error negative input");
    assert.throws(theorem.range(0,"y"), Error, "Error last arg is NaN.");
    assert.throws(theorem.range(0,5, 3), Error, "Error Too many arguments.");
});

QUnit.test("Test baseConvert", function(assert) {
    assert.deepEqual(theorem.baseConvert("2","1101"), 13, "binary to base 10");
    assert.deepEqual(theorem.baseConvert("10","1234"), 1234, "confirms base 10");
    assert.throws(theorem.baseConvert("10","yyyy"), TypeError, "Threw TypeError");
});

QUnit.test("Test checkNum", function(assert) {
    let numTest = function(a, b, c, d) {
        
        return theorem.checkNum(...arguments);
    };
    assert.deepEqual(theorem.checkNum("1", "2", "3", "4", "5.5"), true, "true");
    assert.throws(theorem.checkNum("1", "2", "3", "4", "xyz"), TypeError, 
        "Threw TypeError");
    assert.equal(numTest("1", "2", "3", "4"), true, "Nested args list resolve.");
});

QUnit.test("Test fixPrecision", function(assert) {
    assert.deepEqual(theorem.fixPrecision("1234.5678", 1, round = 0), 1234.6, 
        "tenths rounded");
    assert.deepEqual(theorem.fixPrecision("1234.5678", 2, round = 0), 1234.57, 
        "hundredths rounded");
    assert.deepEqual(theorem.fixPrecision("1234.5678", 3, round = 0), 1234.568, 
        "thousandths rounded");
    assert.deepEqual(theorem.fixPrecision("1234.5678", 3, round = 3), 1234.5678,
        "thousandths w/out rounding");
});

// AREA, PERIMETER, & CIRCUMFERENCE

QUnit.test("Test findPerimeter", function(assert) {
    assert.deepEqual(theorem.findPerimeter("8", "8", "8", "8"), 32);
});

QUnit.test("Test findRectArea", function(assert) {
    assert.deepEqual(theorem.findRectArea("8", "8"), 64);
});

// test trapezoid area calculation
QUnit.test("Test findTrapArea", function(assert) {
    assert.deepEqual(theorem.findTrapArea("8", "8", "8"), 256);
});

QUnit.test("Test findCircleArea", function(assert) {
    assert.deepEqual(theorem.findCircleArea("2.5", round = 3), 19.625, 
        "w/out rounding, hundredths");
    assert.deepEqual(theorem.findCircleArea("2.5", 2, 0), 19.63, 
        "hundredths with rounding");
});

QUnit.test("Test findEllipseArea", function(assert) {
    assert.deepEqual(theorem.findEllipseArea("2.5", "5"), 39.25, 
        "w/out rounding, hundredths");
    assert.deepEqual(theorem.findEllipseArea("2.5", "5",  2, 0), 39.25, 
        "with rounding, hundredths");
});

QUnit.test("Test findTriangleArea", function(assert) {
    assert.deepEqual(theorem.findTriangleArea("4","2"), 4);
});

QUnit.test("Test findCircumference", function(assert) {
    assert.deepEqual(theorem.findCircumference("4.2"), 13.19, 
        "rounding default");
    assert.deepEqual(theorem.findCircumference("4.2", 2, 0), 13.19, 
        "hundredths with rounding");
});

// VOLUME

QUnit.test("Test findPyramidVolume", function(assert) {
    assert.deepEqual(theorem.findPyramidVolume("4", "4", "4"), 21.33);
});

QUnit.test("Test findSphereVolume", function(assert) {
    assert.deepEqual(theorem.findSphereVolume("5"), 522.03);
});

QUnit.test("Test findCubeVolume", function(assert) {
    assert.deepEqual(theorem.findCubeVolume("9", "2", "8"), 144);
});

QUnit.test("Test findConeVolume", function(assert) {
    assert.deepEqual(theorem.findConeVolume("12", "3"), 452.16);
});

QUnit.test("Test findCylVolume", function(assert) {
    assert.deepEqual(theorem.findCylVolume("12", "3"), 1356.48);
});

// THEOREMS

// test if Pythagorean Theorem
QUnit.test("Test findHypotenuse", function(assert) {
    assert.deepEqual(theorem.findHypotenuse("5", "12"), 13);
});

// test calculation of degrees in a polygon
QUnit.test("Test findPolyDegrees for Octagon", function(assert) {
    assert.deepEqual(theorem.findPolyDegrees("8"), 1080);
});
