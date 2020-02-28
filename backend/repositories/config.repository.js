// const mysql = require('../db/mysql');
// var portfoliosObj = require('./../json/portfolios.json');
// var securitiesObj = require('./../json/securities.json');
class ConfigRepo {
	getPortfolios() {
		return new Promise(async (resolve, reject) => {
			try {
				var portfoliosObj = require('./../json/portfolios.json');
				return resolve(portfoliosObj.Portfolios);
			} catch (error) {
				reject(error);
			}
		});
	}
	getSecuritie() {
		return new Promise(async (resolve, reject) => {
			try {
				var securitiesObj = require('./../json/securities.json');
				return resolve(securitiesObj.Securities);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = ConfigRepo;