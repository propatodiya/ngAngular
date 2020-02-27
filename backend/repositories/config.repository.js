const mysql = require('../db/mysql');
var portfoliosObj = require('./../json/portfolios.json');
var securities = require('./../json/securities.json');
class ConfigRepo {
	getPortfolios() {
		return new Promise(async (resolve, reject) => {
			try {
				return resolve(portfoliosObj.Portfolios);
			} catch (error) {
				reject(error);
			}
		});
	}
	getSecuritie() {
		return new Promise(async (resolve, reject) => {
			try {
				return resolve(securities);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = ConfigRepo;