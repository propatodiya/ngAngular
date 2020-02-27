const ConfigBiz = require('../biz/config.biz');
const {
	MissingParamException
} = require('../exceptions');

class ConfigController {
	constructor() {
		this.configBiz = new ConfigBiz();
	}
	register(app) {
		app.route('/portfolio')
			.post(async (request, response, next) => {
				try {
					const {
						pageNumber,
						size
					} = request.body;
					const data = await this.configBiz.getPortfolio(pageNumber, size);
					response.status(200).send(data);
				} catch (error) {
					next(error);
				}
			});
		app.route('/securitie')
			.get(async (request, response, next) => {
				try {
					const data = await this.configBiz.getSecuritie();
					response.status(200).send(data);
				} catch (error) {
					next(error);
				}
			});
		app.route('/portfolio/:id')
			.get(async (request, response, next) => {
				try {
					const {
						id,
					} = request.params;
					const data = await this.configBiz.getPortfolioById(id);
					response.status(200).send(data);
				} catch (error) {
					// next({ action: "failure" });
					next(error);
				}
			});
		app.route('/test')
			.get(async (request, response, next) => {
				try {
					const data = {
						server: 'running'
					}
					response.status(200).send(data);
				} catch (error) {
					next(error);
				}
			})
	}
}

module.exports = ConfigController;