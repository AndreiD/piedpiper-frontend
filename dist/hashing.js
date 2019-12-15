var shajs = require("sha.js");
export function getSHA512(plain) {
  return new shajs.sha512().update(plain).digest("hex");
}
