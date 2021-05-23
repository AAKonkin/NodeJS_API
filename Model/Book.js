import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    bookName: {type: String, required: true},
    author: {type: String, required: true},
    bookLength: {type: String, required: true},
    description: {type: String, required: true},
    bookPath: {type: String, required: true},
    bookImg: {type: String, required: true}
}, {versionKey: false});

export default mongoose.model('Book', schema);