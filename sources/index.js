
/**
 *
 */

const isUndefinedOrNull = (message) => {

	/**
	 *
	 */

	return message === undefined || message === null

}

/**
 *
 */

const validate = (schema, message, up, field) => {

	/**
	 *
	 */

	if (!schema['$type']) {

		/**
		 *
		 */

		throw new Error('Each schema must contain the $type operator')

		/**
		 *
		 */

	} else if (schema['$type'] === Boolean) {

		/**
		 *
		 */

		if (isUndefinedOrNull(message)) {

			/**
			 *
			 */

			if (schema.hasOwnProperty('$default')) {

				/**
				 *
				 */

				up[field] = schema['$default']

				/**
				 *
				 */

				return true

				/**
				 *
				 */

			} else {

				/**
				 *
				 */

				return false

			}

		} else {

			/**
			 *
			 */

			return message.constructor === Boolean;

		}

		/**
		 *
		 */

	} else if (schema['$type'] === Number) {

		/**
		 *
		 */

		if (isUndefinedOrNull(message)) {

			/**
			 *
			 */

			if (schema.hasOwnProperty('$default')) {

				/**
				 *
				 */

				up[field] = schema['$default']

				/**
				 *
				 */

				return true

				/**
				 *
				 */

			} else {

				/**
				 *
				 */

				return false

			}

			/**
			 *
			 */

		} else {

			/**
			 *
			 */

			return message.constructor === Number;

		}

		/**
		 *
		 */

	} else if (schema['$type'] === String) {

		/**
		 *
		 */

		if (isUndefinedOrNull(message)) {

			/**
			 *
			 */

			if (schema.hasOwnProperty('$default')) {

				/**
				 *
				 */

				up[field] = schema['$default']

				/**
				 *
				 */

				return true

				/**
				 *
				 */

			} else {

				/**
				 *
				 */

				return false

			}

			/**
			 *
			 */

		} else {

			/**
			 *
			 */

			if (message.constructor === String) {

				/**
				 *
				 */

				if (schema['$test']) {

					/**
					 *
					 */

					if (schema['$test'].constructor === RegExp) {

						/**
						 *
						 */

						return schema['$test'].test(message)

						/**
						 *
						 */

					} else if (schema['$test'].constructor === Function) {

						/**
						 *
						 */

						return schema['$test'](message)

					}

				}

				/**
				 *
				 */

				return true

				/**
				 *
				 */

			} else {

				/**
				 *
				 */

				return false

			}

		}

		/**
		 *
		 */

	} else if (schema['$type'] === Object) {

		/**
		 *
		 */

		if (schema['$schema']) {

			/**
			 *
			 */

			if (isUndefinedOrNull(message)) {

				/**
				 *
				 */

				if (schema.hasOwnProperty('$default')) {

					/**
					 *
					 */

					up[field] = schema['$default']

					/**
					 *
					 */

					return true

					/**
					 *
					 */

				} else {

					/**
					 *
					 */

					return false

				}

				/**
				 *
				 */

			} else {

				/**
				 *
				 */

				if (message.constructor === Object) {

					/**
					 *
					 */

					for (const field in schema['$schema']) {

						/**
						 *
						 */

						if (!schema['$schema'].hasOwnProperty(field)) {

							/**
							 *
							 */

							continue

						}

						/**
						 *
						 */

						if (!validate(schema['$schema'][field], message[field], message, field)) {

							/**
							 *
							 */

							return false

						}

					}

					/**
					 *
					 */

					return true

					/**
					 *
					 */

				} else {

					/**
					 *
					 */

					return false

				}

			}

			/**
			 *
			 */

		} else {

			/**
			 *
			 */

			return false

		}

		/**
		 *
		 */

	} else if (schema['$type'] === Array) {

		/**
		 *
		 */

		if (!schema['$of']) {

			/**
			 *
			 */

			throw new Error('Array schema must contain the $of iterator that represents schema of values')

			/**
			 *
			 */

		} else {

			/**
			 *
			 */

			if (isUndefinedOrNull(message)) {

				/**
				 *
				 */

				if (schema.hasOwnProperty('$default')) {

					/**
					 *
					 */

					up[field] = schema['$default']

					/**
					 *
					 */

					return true

					/**
					 *
					 */

				} else {

					/**
					 *
					 */

					return false

				}

			} else {

				/**
				 *
				 */

				if (message.constructor === Array) {

					/**
					 *
					 */

					for (let i = 0; i < message.length; i++) {

						/**
						 *
						 */

						if (!validate(schema['$of'], message[i])) {

							/**
							 *
							 */

							return false

						}

					}

					/**
					 *
					 */

					return true

					/**
					 *
					 */

				} else {

					/**
					 *
					 */

					return false

				}

			}

		}

	} else {

		/**
		 *
		 */

		throw new Error('Unknown schema type. (only Boolean, Number, String, Object and Array are supported)')

	}

}

/**
 *
 */

module.exports = (schema, message) => validate(schema, message)
