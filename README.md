# theorem
## A basic geometry library

### Usage & Examples
* To make theorem available in an html file:
`<script src="scripts/theorem.js"></script>` then `var theorem = Theorem.Lib;` in your scripts that use theorem.
* To make available as a module in node, just uncomment the last line of theorem.js, and at the top of your node project file: `var theorem = require("path/to/theorem");`
* Theorem defaults to rounding to the nearest hundredth. This can be changed in most functions using the `dec = [place]` parameter in most functions (i.e. `theorem.findCircleArea(2, dec = 3);`)
* Rounding is controlled by the round paramter which defaults to `round = 0`. Raising the value to 1 will stop rounding but respect the precision (`dec`), while raising round above 1 will strip rounding and provide the Math library's default precision.
