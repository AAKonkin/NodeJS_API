import express from 'express';
import mongoose from 'mongoose';
import config from 'config';
import route from './Route/bookRouter.js';

const PORT = process.env.PORT ?? config.get('PORT');
const App = express();
App.use(express.json());
App.use('/api',route);

const start = async () => {
    try{
        await mongoose.connect(config.get('DB_URL'), {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true
        }, err => {
            if(err) return console.log('CONNECTING ERROR');
            console.log('SUCCESS CONNECT TO DB');
            App.listen(PORT, console.log(`SERVER HAS BEEN STARTED ON PORT ${PORT}`));
        });
    } catch (e) {
        console.log('DB CONNECTING ERROR', e.message);
        process.exit(1);
    }
};

//start();

mongoose.connect(config.get('DB_URL'), {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
});

App.listen(PORT, console.log(`SERVER HAS BEEN STARTED ON PORT ${PORT}`));