const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const usersRouter = require('./routes/api/auth');
const citiesRouter = require('./routes/api/cities');
const noticesRouter = require('./routes/api/notices');
const friendsRouter = require('./routes/api/friends');
const newsRouter = require('./routes/api/news');
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const swaggerUiOptions = {
  swaggerOptions: {
    docExpansion: 'none', 
  },
};
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));
app.use('/api/users', usersRouter);
app.use('/api/cities', citiesRouter);
app.use('/api/notices', noticesRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/news', newsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Service not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
