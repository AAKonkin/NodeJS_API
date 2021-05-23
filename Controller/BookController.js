import Book from '../Model/Book.js';

// CRUD actions controller
class BookController {
    
    // Create object
    async create(req, res) {
        try{
            if(!req.body) return res.status(400).json('EMPTY_REQUEST_BODY');
            const {bookName, author, bookLength, description, bookPath, bookImg} = req.body;
            const book = new Book({bookName, author, bookLength, description, bookPath, bookImg});
            book.save(err => {
                if (err) res.send('CREATE_ERROR');
                res.send(`CREATED ITEM ${book}`);
            })
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    
    // Read all objects
    async getAll(req, res) {
        try{
            await Book.find({}, (err, books) => {
                if(err) return res.status(404).json('EMPTY_BOOK_STORAGE');
                res.status(200).json(books);
            });
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    
    // Read one object
    async getOne(req, res) {
        try{
            const id = req.params.id;
            Book.findOne({_id: id}, (err, book) => {
                if (err) return res.status(404).json('NOT_FOUND_ID');
                res.status(200).json(book);
            });
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    
    // Update object
    async update(req, res) {
        try{
            if(!req.body) return res.status(400).json('EMPTY_UPDATE_BODY')
            const id = req.params.id;
            const {bookName, author, bookLength, description, bookPath, bookImg} = req.body;
            Book.findOneAndUpdate({_id: id}, {bookName, author, bookLength, description, bookPath, bookImg}, {new: true}, (err, book) => {
                if(err) return res.status(400).json('NOT_FOUND_FOR_UPDATE')
                res.status(200).json(`UPDATED_ITEM: ${book}`);
            });
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    
    // Delete object
    async delete(req, res) {
        try{
            const id = req.params.id;
            Book.findOneAndDelete({_id: id}, (err, book) => {
                if(!book) return res.status(404).json('DONT_FOUND_BOOK_FOR_DELETE');
                //if(err) return res.send('DELETE_ERROR')
                res.status(200).json(`DELETED ITEM ${book}`);
        })
        } catch (e) {
            res.status(500).json(e.message);
        }
    }
}

export default new BookController;