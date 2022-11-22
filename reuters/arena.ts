import {Router} from "express";

export const arenaRouter = Router();

arenaRouter
    .get('/fight-form', (req, res) => {
        res.send('Kampf Formular');
    })
    .post('/fight', (req, res) => {
        res.send('Kampf');
    }) //POST/Arena/Fight