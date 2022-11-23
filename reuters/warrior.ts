import {Router} from "express";

export const warriorRouter = Router();

warriorRouter
    .get('/add-form', (req, res) => {
        res.render('./warrior/add-form');
    })
    .get('/', (req, res) => {
        res.send('Kriger hinzufügen');
    })