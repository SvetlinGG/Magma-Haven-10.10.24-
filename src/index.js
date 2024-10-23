import express from 'express';
import routes from './routes.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


const app = express();

const url = 'mongodb://localhost:27017';
mongoose.connect(url, { dbName: 'volcanoes'})
    .then(() => console.log('DB Connected!'))
    .catch((err) => console.log(`Db failed ${err}`));

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('views', 'src/views');
app.set('view engine', 'hbs');

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use(routes);





app.listen(1000, () => console.log('Server is listen on http://localhost:1000'))