
/**
 *
 */

const ___error = require(`jiu-jitsu-error`)

/**
 *
 */

const isUndefinedOrNull = (message) => {
	return message === undefined || message === null
}

/**
 *
 */

const validate = (schema, message, parent, field) => {

	/**
	 *
	 */

	if (!schema[`$type`]) {
		throw new Error(`Each schema must contain the $type operator`)
	}

	/**
	 *
	 */

	if (schema[`$type`] === Boolean) {
		if (isUndefinedOrNull(message)) {
			const hasDefault = schema.hasOwnProperty(`$default`)
			parent[field] = hasDefault ? schema[`$default`] : undefined
			return hasDefault
		} else {
			return message.constructor === Boolean
		}
	}

	/**
	 *
	 */

	if (schema[`$type`] === Number) {
		if (isUndefinedOrNull(message)) {
			const hasDefault = schema.hasOwnProperty(`$default`)
			parent[field] = hasDefault ? schema[`$default`] : undefined
			return hasDefault
		} else {
			return message.constructor === Number
		}
	}

	/**
	 *
	 */

	if (schema[`$type`] === String) {
		if (isUndefinedOrNull(message)) {
			const hasDefault = schema.hasOwnProperty(`$default`)
			parent[field] = hasDefault ? schema[`$default`] : undefined
			return hasDefault
		} else {
			return message.constructor === String && (schema[`$test`] ? schema[`$test`](message) : true)
		}
	}

	/**
	 *
	 */

	if (schema[`$type`] === Object) {
		if (schema[`$schema`]) {
			if (isUndefinedOrNull(message)) {
				const hasDefault = schema.hasOwnProperty(`$default`)
				parent[field] = hasDefault ? schema[`$default`] : undefined
				return hasDefault
			} else {
				return message.constructor === Object && Object.keys(schema[`$schema`]).every(($field) => validate(schema[`$schema`][$field], message[$field], message, $field))
			}
		}
	}

	/**
	 *
	 */

	if (schema[`$type`] === Array) {
		if (isUndefinedOrNull(message)) {
			const hasDefault = schema.hasOwnProperty(`$default`)
			parent[field] = hasDefault ? schema[`$default`] : undefined
			return hasDefault
		} else {
			if (!schema[`$of`]) {
				throw ___error(`Array schema must contain the $of iterator that represents schema of values`)
			} else {
				return message.constructor === Array && message.every((item) => validate(schema[`$of`], item))
			}
		}
	}

	/**
	 *
	 */

	throw ___error(`Unknown schema type. (Boolean, Number, String, Object and Array are supported only)`)

}

/**
 *
 */

module.exports = (schema, message) => validate(schema, message)
