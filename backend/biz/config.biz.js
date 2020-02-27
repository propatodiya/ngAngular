const ConfigRepo = require('../repositories/config.repository');
const DataTablePage = require('./../model/datatablepage');
const {
	MissingParamException
} = require('./../exceptions');

class ConfigBiz {
	constructor() {
		this.configRepo = new ConfigRepo();
	}
	getPortfolio(pageNumber, size) {
		return new Promise(async (resolve, reject) => {
			try {
				const portfolioList = await this.configRepo.getPortfolios();
				let page = {};
				if (portfolioList) {
					page = new DataTablePage(size, portfolioList.length, portfolioList.length / size, pageNumber);
					const start = page.pageNumber * page.size;
					const end = Math.min(start + page.size, page.totalElements);
					page['data'] = [];
					for (let i = start; i < end; i++) {
						if (portfolioList[i].Transactions) {
							portfolioList[i]['lastModified'] = portfolioList[i].Transactions[portfolioList[i].Transactions.length - 1].Date;
							portfolioList[i]['holdings'] = portfolioList[i].Transactions.length;
							delete portfolioList[i].Transactions
						}
						page.data.push(portfolioList[i]);
					}
				}
				resolve(page);
			} catch (error) {
				reject(error);
			}
		});
	}
	getSecuritie() {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await this.configRepo.getSecuritie();
				if (data.Securities) {
					for (const x of data.Securities) {
						if (x.HistoryDetail) {
							x.HistoryDetail.sort(function (a, b) {
								return new Date(a.EndDate) - new Date(b.EndDate);
							});
						}
					}
				}
				resolve(data);
			} catch (error) {
				reject(error);
			}
		});
	}
	getPortfolioById(id) {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await this.configRepo.getPortfolios();
				let response = {};
				if (data) {
					for (const x of data) {
						if (x._Id === id) {
							response = x;
							break;
						}
					}
				}
				resolve(response);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = ConfigBiz;