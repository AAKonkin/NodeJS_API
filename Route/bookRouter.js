import Router from 'express';
import BookController from '../Controller/BookController.js'
import bodyParser from 'body-parser';

const urlencoded = bodyParser.urlencoded({extended:false});
const route = new Router();

// CRUD ROUTE MAP
route.post('/books', urlencoded, BookController.create);
route.get('/books', BookController.getAll);
route.get('/books/:id', BookController.getOne);
route.put('/books/:id', urlencoded, BookController.update);
route.delete('/books/:id', BookController.delete);

export default route;