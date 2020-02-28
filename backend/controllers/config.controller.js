const ConfigBiz = require('../biz/config.biz');
const {
	MissingParamException
} = require('../exceptions');

class ConfigController {
	constructor() { }
	register(app) {
		app.route('/portfolio')
			.post(async (request, response, next) => {
				try {
					const {
						pageNumber,
						size
					} = request.body;
					const configBiz = new ConfigBiz();
					const data = await configBiz.getPortfolio(pageNumber, size);
					response.status(200).send(data);
				} catch (error) {
					next(error);
				}
			});
		app.route('/securitie')
			.get(async (request, response, next) => {
				try {
					const configBiz = new ConfigBiz();
					const data = await configBiz.getSecuritie();
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
					const configBiz = new ConfigBiz();
					const data = await configBiz.getPortfolioById(id);
					response.status(200).send(data);
				} catch (error) {
					// next({ action: "failure" });
					next(error);
				}
			});
		app.route('/portfolio/byDate')
			.post(async (request, response, next) => {
				try {
					const {
						id,
						portfoliaoDate
					} = request.body;
					if (!id || !portfoliaoDate) {
						throw new MissingParamException('Id or Date');
					}
					const configBiz = new ConfigBiz();
					const data = await configBiz.getPortfolioByDate(id, portfoliaoDate);
					response.status(200).send(data);
				} catch (error) {
					next(error);
				}
			})
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