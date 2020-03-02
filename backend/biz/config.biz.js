const ConfigRepo = require('../repositories/config.repository');
const DataTablePage = require('./../model/datatablepage');
const {
	MissingParamException
} = require('./../exceptions');

class ConfigBiz {
	constructor() {}
	getPortfolio(pageNumber, size) {
		return new Promise(async (resolve, reject) => {
			try {
				const configRepo = new ConfigRepo();
				const portfolioList = await configRepo.getPortfolios();
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
							// portfolioList[i].Transactions
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
				const configRepo = new ConfigRepo();
				const data = await configRepo.getSecuritie();
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
				const configRepo = new ConfigRepo();
				const data = await configRepo.getPortfolios();
				let response = {};
				if (data) {
					for (const x of data) {
						if (x._Id === id) {
							const security = await configRepo.getSecuritie();
							for (const y of x.Transactions) {
								y['security'] = security.filter((item) => {
									return y.SecurityId === item._Id;
								})[0];
							}
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
	getPortfolioByDate(id, portfoliaoDate) {
		return new Promise(async (resolve, reject) => {
			try {
				const configRepo = new ConfigRepo();
				let data = [];
				data = await configRepo.getPortfolios();
				let response = {};
				if (data) {
					for (const x of data) {
						if (+x._Id === id) {
							if (x.Transactions && x.Transactions.length > 0) {
								for (const y of x.Transactions) {
									const security = await configRepo.getSecuritie();
									const securitylist = security.filter((item) => {
										return y.SecurityId === item._Id;
									});
									y['security'] = [];
									y['Share'] = 0;
									y['Value'] = 0;
									if (securitylist && securitylist.length > 0) {
										const securitylistHistory = securitylist[0].HistoryDetail;
										if (securitylistHistory) {
											for (const itemEle of securitylistHistory) {
												let Value = +itemEle.Value;
												if (y.Date === itemEle.EndDate) {
													y.Share = +y.Amount / Value;
													y.Share = +y.Share.toFixed(2);
													y.Value = Value.toFixed(2);
												}
												if (itemEle.EndDate === portfoliaoDate) {
													itemEle['Amount'] = y.Share * Value;
													itemEle.Amount = +itemEle.Amount.toFixed(2);
													itemEle.Value = Value.toFixed(2);
													y.security.push(itemEle);
												}
											}
										}
									}
								}
							}
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