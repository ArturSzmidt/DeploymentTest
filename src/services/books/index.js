import express from 'express';
import { getBooks } from '../../lib/fs-tools.js';

const booksRouter = express.Router();

booksRouter.get('/', async (req, res, next) => {
  try {
    const books = await getBooks();
    res.send(books);
  } catch (error) {
    console.log(error);
  }
});

export default booksRouter;
