const { validerResultat } = require("../src/progression");

console.log(validerResultat(1, 18, 20, true));
console.log(validerResultat(8, 18, 20, true));
console.log(validerResultat(3, 25, 20, true));
console.log(validerResultat(4, 10, 20, false));