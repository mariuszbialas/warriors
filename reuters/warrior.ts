import {Router} from "express";

export const warriorRouter = Router();

warriorRouter
    .get('/add-form', (req, res) => {
        res.send('Formular Krieger hinzufügen');
    })
    .get('/', (req, res) => {
        res.send('Kriger hinzufügen');
    })