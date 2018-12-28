const R = require('ramda')

exports.ifElseP = (f, g, h) => (a) => R.then(b => (b ? g : h)(a), f(a))
exports.raiseError = (e) => () => {
	console.log(e)
	throw new Error(e)
}