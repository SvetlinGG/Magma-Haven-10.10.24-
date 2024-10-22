import express from 'express';
import routes from './routes.js';
import handlebars from 'express-handlebars'


const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

app.set('views', 'src/views');
app.set('view engine', 'hbs');

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(routes);





app.listen(3000, () => console.log('Server is listen on http://localhost:3000'))