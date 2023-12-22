import { NextFunction, Request, Response, Router } from "express";
import * as congeneralController from '../../controllers/ConGeneralController';
import * as delegacionController from '../../controllers/DelegacionController';
import * as competidorController from '../../controllers/CompetidorController';
import * as torneoController from '../../controllers/TorneoController';


const api = Router();
const cia = process.env.CIA;


api.get('/', 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [compania, torneos, delegaciones] =
        await Promise.all([
          congeneralController.getCompaniaById({ciacodigo: cia}),
          torneoController.getTorneoAndPortadaByCompania({ciacodigo: cia}),
          delegacionController.getDelegacionAndPortadaByCompania({ciacodigo: cia}),
        ]);
      res.render('index', {compania, torneos, delegaciones});
    } catch (error) {
      next(error);
    }
})

api.get('/eventosAll', 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [compania, torneos] =
        await Promise.all([
          congeneralController.getCompaniaById({ciacodigo: cia}),
          torneoController.getTorneoAndPortadaByCompania({ciacodigo: cia}),
        ]);
      res.render('home/eventoslst', {compania, torneos});
    } catch (error) {
      next(error);
    }
})

api.get('/eventos/:torneoid', 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [compania, torneo, resumenByDelegacion, resumenByModalidad, resumenByPosicion] =
        await Promise.all([
          congeneralController.getCompaniaById({ciacodigo: cia}),
          torneoController.getTorneoAndPortadaById({ciacodigo: cia, torneoid: req.params.torneoid}),
          torneoController.getTorneoCompetidorViewRead({ciacodigo: cia, torneoid: req.params.torneoid, tipoconsulta: '3'}),
          torneoController.getTorneoCompetidorViewRead({ciacodigo: cia, torneoid: req.params.torneoid, tipoconsulta: '4'}),
          torneoController.getTorneoCompetidorViewRead({ciacodigo: cia, loccodigo: '01', torneoid: req.params.torneoid, tipoconsulta: '8'}),
        ]);
      res.render('home/evento', {compania, torneo, resumenByDelegacion, resumenByModalidad, resumenByPosicion});
    } catch (error) {
      next(error);
    }
})

api.get('/noticiasAll', 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const compania = await congeneralController.getCompaniaById({ciacodigo: cia})
      res.render('home/noticiaslst', {compania});
    } catch (error) {
      next(error);
    }
})

api.get('/delegacionesAll', 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [compania, delegaciones] =
        await Promise.all([
          congeneralController.getCompaniaById({ciacodigo: cia}),
          delegacionController.getDelegacionAndPortadaByCompania({ciacodigo: cia}),
        ]);
      res.render('home/delegacioneslst', {compania, delegaciones});
    } catch (error) {
      next(error);
    }
})

api.get('/delegaciones/:delegaid', 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const [compania, delegacion, competidores] =
        await Promise.all([
          congeneralController.getCompaniaById({ciacodigo: cia}),
          delegacionController.getDelegacionAndPortadaById({ciacodigo: cia, delegaid: req.params.delegaid}),
          competidorController.getCompetidorByDelegacion({ciacodigo: cia, delegaid: req.params.delegaid}),
        ]);
      res.render('home/delegacion', {compania, delegacion, competidores});
    } catch (error) {
      next(error);
    }
})

api.get('/contactos', 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const compania = await congeneralController.getCompaniaById({ciacodigo: cia})
      res.render('home/contactos', {compania});
    } catch (error) {
      next(error);
    }
})

api.get('/desktop', 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const compania = await congeneralController.getCompaniaById({ciacodigo: cia})
      res.render('home/desktop', {compania});
    } catch (error) {
      next(error);
    }
})


module.exports = api;