const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errorHandlingMiddleware } = require('./middleware');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use('/', require('./routes/main'));


app.use(errorHandlingMiddleware);
app.listen(9090);

console.log('Server started on port 9090');
