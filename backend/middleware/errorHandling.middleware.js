const { BaseException } = require('../exceptions');

module.exports = async (error, request, response, next) => {
	try {
		const errorObj = {
			message: error && error.message ? error.message : 'Oops! something went wrong',
			code: 'ERROR',
		};
		let status = 500;
		if (error instanceof BaseException) {
			status = error.status;
			errorObj.message = error.message;
		} else {
			status = status;
			errorObj.message = error && error.message ? error.message : 'Oops! something went wrong';
		}
		return response.status(status).json(errorObj);
	} catch (e) {
		return response.status(500).json({
			message: 'Internal server error',
			code: 'ERROR',
		});
	}
};
