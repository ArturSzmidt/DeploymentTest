import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import { getBooks } from '../../lib/fs-tools.js';

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary, // grab CLOUDINARY_URL from process.env.CLOUDINARY_URL
  params: {
    folder: 'books',
  },
});

const uploadOnCloudinary = multer({ storage: cloudinaryStorage }).single(
  'cover'
);

const booksRouter = express.Router();

booksRouter.get('/', async (req, res, next) => {
  try {
    const books = await getBooks();
    res.send(books);
  } catch (error) {
    console.log(error);
  }
});

booksRouter.post('/', uploadOnCloudinary, async (req, res, next) => {
  try {
    console.log(req.file);

    const newBook = { cover: req.file.path };

    // save it in db

    res.send('Created');
  } catch (error) {
    console.log(error);
  }
});

export default booksRouter;
