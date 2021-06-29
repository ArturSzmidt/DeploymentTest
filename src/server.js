import express from 'express';
import listEndpoints from 'express-list-endpoints';
import cors from 'cors';

import booksRoutes from './services/books/index.js';

const server = express();
const port = process.env.PORT || 3001;

console.log('DB CONNECTION STRING: ', process.env.MYDBCONNECTIONSTRING);

// ************************************ MIDDLEWARES *************************

const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL];

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        // origin is in the list therefore it is allowed
        callback(null, true);
      } else {
        // origin is not in the list then --> ERROR
        callback(new Error('Not allowed by cors!'));
      }
    },
  })
); // CROSS ORIGIN RESOURCE SHARING

// http://localhost:3000 --> this is an origin
// http://localhost:3001 --> this is a different origin
// http://mywonderfulapp.com
// https://mywonderfulapp.com

// Different origins --> http://mywonderfulapp.com is different than http://mywonderfulapp2.com
// Different origins --> http://localhost:3000 is different than http://localhost:3001
// Different origins --> http://mywonderfulapp.com is different than https://mywonderfulapp.com

// ************************************* ROUTES *****************************

server.use('/books', booksRoutes);

// **************************************** ERROR HANDLERS **********************

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
