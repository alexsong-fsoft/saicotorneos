
import express, { Response, Request, NextFunction } from 'express'
import hbs from 'hbs';
import path from 'path';
import { autoMappers } from '../mappings/mapper';


export default class Server {
    
    private app: express.Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 8080;

        // Middlewares
        this.middlewares();
        
        // Rutas de mi aplicación
        this.routes();  

        // AutoMappers
        autoMappers();
        // this.autoMappers();
    }


    middlewares() {
        //handlebars
        this.app.set('view engine', 'hbs');
        hbs.registerPartials('./views/partials', () => {});
        hbs.registerHelper('times', function(n, block) {
            var accum = '';
            for(var i = 0; i < n; ++i)
                accum += block.fn(i);
            return accum;
        });
        hbs.registerHelper('for', function(from, to, incr, block) {
            var accum = '';
            for(var i = from; i < to; i += incr)
                accum += block.fn(i);
            return accum;
        });
    
        //servir contenido estatico
        this.app.use(express.static('public'));

        // CORS
        this.app.use(this.allowCrossDomain);

        // Lectura y parseo del body
        this.app.use( express.json() );

    }    

    allowCrossDomain (req: Request, res: Response, next: NextFunction) {
        res.header('Content-Type: application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
        next();
    }

    routes() {

        //VIEWS
        this.app.use( '/', require('../routes/pages/home'));

        //API
        this.app.use( '/api', require('../routes/api/congeneral.api'));
        this.app.use( '/api', require('../routes/api/competidor.api'));
        this.app.use( '/api', require('../routes/api/delegacion.api'));
        this.app.use( '/api', require('../routes/api/torneo.api'));
        this.app.use( '/api', require('../routes/api/user.api'));

    }


    listen () {
        this.app.listen(this.port, () => {
            console.log(`App escuchando en http://localhost:${this.port}`);
        })
    }
}