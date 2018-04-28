/* jshint esversion: 6 */
// no error on global 'use strict'
/*jslint node: true */
// theorem is a simple library of basic geometry tools
'use strict';
let Theorem = {};

Theorem.Lib = (function() {
    // choose precision of pi up to 15 places
    const PI = _round(Math.PI, 2);

    // TOOLS

    // form inputs return strings, so check user entered only positive numbers
    function checkNum() {
        for (let i = arguments.length - 1; i >= 0; i--) {
            if (isNaN(arguments[i] - 1) || arguments < 0) {
                return false;
            }
            continue;
        }
        return true;
    }


    // fix js rounding errors
    // source: http://www.jacklmoore.com/notes/rounding-in-javascript/
    function _round(value, decimals) {
        if (checkNum(value, decimals)) {
            decimals = Math.abs(decimals);
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }
    }

    // let user decide precision, rounding
    function fixPrecision(num, dec = 2, round = 0) {
        if (checkNum(num, dec, round)) {
            num = String(num);
            if (round === 0) {
                num = _round(Number(num), dec);
            }
            else if (round === 1 && num.lastIndexOf(".") > -1) {
                // keep decimal arg convenient
                dec += 1;
                num = num.slice(0, num.lastIndexOf(".") + dec);
            }
            // remove rounding and precision limits
            return Number(num);
        }
    }

    // array of positive integers, inclusive
    function range(first, last) {
        try {
            if (arguments.length > 2 || arguments.length < 2) {
                throw new Error("Usage: range(firstNum, lastNum);");
            }
            if (checkNum(first, last)) {
                let array = [];
                for (let i = first; i <= last; i++) {
                    array.push(i);
            }
                return array;
            } else {
                throw new Error("Arguments are out of range!");
            }
        } 
        catch (error) {
            console.error(error);
        }
    }

    // converts a number of a given base <= 10 to base 10
    function baseConvert(base, number) {
        if (checkNum()) {
            let conversion = 0;
            let digits = number.split('').map(Number).reverse();
            base = Number(base);
            for (let place = digits.length - 1; place >= 0; place--) {
                conversion += (Math.pow(base, place)) * digits[place];
            }
            return conversion;
        }
    }

    // PERIMETER

    function findPerimeter(args) {
        if (checkNum(args)) {
            let perimeter = 0;
            for (let i = arguments.length - 1; i >= 0; i--) {
                perimeter += Number(arguments[i]);
            }
            return perimeter;
        }
    }


    function findCircumference(diameter, dec = 2, round = 0) {
        let calculation = diameter * PI;
        return fixPrecision(calculation, dec, round);
    }

    // AREA

    function findTriangleArea(height, base, dec = 2, round = 0) {
        if (checkNum(height, base, dec)) {
            let calculation = (height * base) / 2;
            return fixPrecision(calculation, dec, round);
        }
    }

    // square or parallelogram
    function findRectArea(base, height, dec = 2, round = 0) {
        if (checkNum(base, height, dec)) {
            let calculation = base * height;
            return fixPrecision(calculation, dec, round);
        }
    }

    function findCircleArea(radius, dec = 2, round = 0) {
        if (checkNum(radius, dec)) {
            let calculation = PI * Math.pow(radius, 2);
            return fixPrecision(calculation, dec, round);
        }
    }

    function findEllipseArea(radius1, radius2, dec = 2, round = 0) {
        if (checkNum(radius1, radius2, dec)) {
            let calculation = PI * radius1 * radius2;
            return fixPrecision(calculation, dec, round);
        }
    }

    // trapezoid
    function findTrapArea(base1, base2, height, dec = 2, round = 0) {
        if (checkNum(base1, base2, height, dec)) {
            let calculation = ((base1 * base2) / 2) * height;
            return fixPrecision(calculation, dec, round);
        }
    }

    // VOLUME

    // cube or square prism
    function findCubeVolume(base1, base2, height, dec = 2, round = 0) {
        if (checkNum(base1, base2, height, dec)) {
            let Base = findRectArea(base1, base2);
            let calculation = Base * height;
            return fixPrecision(calculation, dec, round);
        }
    }

    function findConeVolume(radius, height, dec = 2, round = 0) {
        if (checkNum(radius, height, dec)) {
            let Base = findCircleArea(radius);
            let calculation = Base * (height / 3);
            return fixPrecision(calculation, dec, round);
        }
    }

    function findCylVolume(radius, height, dec = 2, round = 0) {
        if (checkNum(radius, height, dec)) {
            let calculation = PI * Math.pow(radius, 2) * height;
            return fixPrecision(calculation, dec, round);
        }
    }

    // right-angled pyramid
    function findPyramidVolume(length, width, height, dec = 2, round = 0) {
        if (checkNum(length, width, height, dec)) {
            let calculation = length * width * height / 3;
            return fixPrecision(calculation, dec, round);
        }
    }

    function findSphereVolume(radius, dec = 2, round = 0) {
        if (checkNum(radius, dec)) {
            let calculation = 1.33 * PI * (Math.pow(radius, 3));
            return fixPrecision(calculation, dec, round);
        }
    }

    // OTHER

    // Pythagorean Theorem
    function findHypotenuse(a, b, dec = 2, round = 0) {
        if (checkNum(a, b, dec)) {
            a = Math.pow(a, 2);
            b = Math.pow(b, 2);
            let calculation = Math.sqrt(a + b);
            return fixPrecision(calculation, dec, round);
        }
    }

    // find the total degrees in a given polygon
    function findPolyDegrees(sides, dec = 2, round = 0) {
        if (checkNum(sides, dec)) {
            let calculation = (sides - 2) * 180;
            return fixPrecision(calculation, dec, round);
        }
    }

    // export functions
    return {
        _round: _round,
        checkNum: checkNum,
        fixPrecision: fixPrecision,
        baseConvert: baseConvert,
        range: range,
        findPerimeter: findPerimeter,
        findCircumference: findCircumference,
        findTriangleArea: findTriangleArea,
        findRectArea: findRectArea,
        findTrapArea: findTrapArea,
        findCircleArea: findCircleArea,
        findEllipseArea: findEllipseArea,
        findPyramidVolume: findPyramidVolume,
        findSphereVolume: findSphereVolume,
        findCubeVolume: findCubeVolume,
        findConeVolume: findConeVolume,
        findCylVolume: findCylVolume,
        findHypotenuse: findHypotenuse,
        findPolyDegrees: findPolyDegrees,
    };
}());

// uncomment next line for node exports
// module.exports = Theorem.Lib;