// Get configurations
const { SECRET, DB } = require('./config/index');

// Environment options
const PORT = process.env.PORT || 3000;
const DB_CONNECTION = process.env.DB_CONNECTION || DB;

// Imports
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('express-jwt');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// Get routers
const apiAuthRouters = require('./routes/user.routes');
const apiCategoryRouters = require('./routes/category.routes');
const apiBasketRouters = require('./routes/basket.routes');
const apiProductRouters = require('./routes/product.routes');
const apiOrderRouters = require('./routes/order.routes');
const apiCommonRouters = require('./routes/common.routes');

// Apply middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// Serve static files
app.use(express.static('public'));

app.use('/api/order', apiOrderRouters);

// Define authentication
app.use(
  '/api',
  jwt({
    secret: SECRET || 'pleasechangeme',
    algorithms: ['HS256'],
  }).unless({
    path: [
      '/api/auth/login',
      '/api/auth/signup',
      '/api/auth/logout',
      '/api/common',
    ],
  })
);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid Token...');
  }
});

// Set up routes
app.use('/api/auth', apiAuthRouters);
app.use('/api/common', apiCommonRouters);
// protected routes
app.use('/api/category', apiCategoryRouters);
app.use('/api/basket', apiBasketRouters);
app.use('/api/product', apiProductRouters);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public', 'index.html'));
});

const init = async () => {
  try {
    await mongoose.connect(DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    app.listen(PORT, err => {
      if (err) console.log(err);
      console.log(`Server up and mongo database runnning on port: ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

// Start server
init();
