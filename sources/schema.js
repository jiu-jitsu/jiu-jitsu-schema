
/**
 *
 */

const ERROR = require("jiu-jitsu-error")

/**
 *
 */

function isNull (value) {
	return value === null
}

/**
 *
 */

function isUndefined (value) {
	return value === undefined
}

/**
 *
 */

function validate (schema, value) {

	/**
	 *
	 */

	const $of = schema["$of"]
	const $type = schema["$type"]
	const $test = schema["$test"]
	const $oneOf = schema["$oneOf"]
	const $schema = schema["$schema"]
	const $required = schema["$required"]

	/**
	 *
	 */

	if ($oneOf) {
		return !!$oneOf.find(($oneOfSchema) => validate($oneOfSchema, value))
	}

	/**
	 *
	 */

	if ($type === undefined) {
		throw new ERROR("jiu-jitsu-schema|EACH_SCHEMA_MUST_CONTAIN_THE_TYPE_OPERATOR")
	}

	/**
	 *
	 */

	if ($type === null) {
		return isNull(value)
	}

	/**
	 *
	 */

	if ($type === Boolean) {
		if (isNull(value)) {
			return false
		} else if (isUndefined(value)) {
			return !$required
		} else {
			return value.constructor === Boolean
		}
	}

	/**
	 *
	 */

	if ($type === Number) {
		if (isNull(value)) {
			return false
		} else if (isUndefined(value)) {
			return !$required
		} else {
			return value.constructor === Number && ($test ? $test(value) : true)
		}
	}

	/**
	 *
	 */

	if ($type === String) {
		if (isNull(value)) {
			return false
		} else if (isUndefined(value)) {
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
			throw new ERROR("jiu-jitsu-schema|OBJECT_SCHEMA_MUST_CONTAIN_THE_SCHEMA_OPERATOR")
		} else if (isNull(value)) {
			return false
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
			throw new ERROR("jiu-jitsu-schema|ARRAY_SCHEMA_MUST_CONTAIN_THE_OF_OPERATOR")
		} else if (isNull(value)) {
			return false
		} else if (isUndefined(value)) {
			return !$required
		} else {
			return value.constructor === Array && value.every((item) => validate($of, item))
		}
	}

	/**
	 *
	 */

	throw new ERROR("jiu-jitsu-schema|UNKNOWN_SCHEMA_TYPE")

}

/**
 *
 */

module.exports = (schema, value) => validate(schema, value)
