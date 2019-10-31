
/**
 *
 */

const ___error = require(`jiu-jitsu-error`)

/**
 *
 */

const isUndefined = (value) => {
	return value === undefined
}

/**
 *
 */

const validate = (schema, value) => {

	/**
	 *
	 */

	const $of = schema[`$of`]
	const $type = schema[`$type`]
	const $test = schema[`$test`]
	const $schema = schema[`$schema`]
	const $required = schema[`$required`]

	/**
	 *
	 */

	if (!$type) {
		throw new Error(`Each schema must contain the $type operator`)
	}

	/**
	 *
	 */

	if ($type === Boolean) {
		if (isUndefined(value)) {
			return !$required
		} else {
			return value.constructor === Boolean
		}
	}

	/**
	 *
	 */

	if ($type === Number) {
		if (isUndefined(value)) {
			return !$required
		} else {
			return value.constructor === Number && ($test ? $test(value) : true)
		}
	}

	/**
	 *
	 */

	if ($type === String) {
		if (isUndefined(value)) {
			return !$required
		} else {
			return value.constructor === String && ($test ? $test(value) : true)
		}
	}

	/**
	 *
	 */

	if ($type === Object) {
		if (!$schema) {
			throw ___error(`Object schema must contain $schema operator`, `FAIL`)
		} else if (isUndefined(value)) {
			return !$required
		} else {
			return value.constructor === Object && Object.keys($schema).every(($field) => validate($schema[$field], value[$field]))
		}
	}

	/**
	 *
	 */

	if ($type === Array) {
		if (!$of) {
			throw ___error(`Array schema must contain $of operator`, `FAIL`)
		} else if (isUndefined(value)) {
			return !$required
		} else {
			return value.constructor === Array && value.every((item) => validate($of, item))
		}
	}

	/**
	 *
	 */

	throw ___error(`Unknown schema type`, `FAIL`)

}

/**
 *
 */

module.exports = (schema, value) => validate(schema, value)
