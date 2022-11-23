import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";
import {ValidationError} from "../utils/errors";

export const arenaRouter = Router();

arenaRouter
    .get('/fight-form', async (req, res) => {
        const warriors = await WarriorRecord.getAll();
        res.render('./arena/fight-form', {
            warriors,
        });
    })
    .post('/fight', async (req, res) => {
        const {warrior1Id, warrior2Id} = req.body;

        if(warrior1Id === warrior2Id) {
            throw new ValidationError('Bitte zwei verschiedene Krieger auswählen!');
        }

        const warrior1 = await WarriorRecord.getOne(warrior1Id);
        const warrior2 = await WarriorRecord.getOne(warrior2Id);

        if(!warrior1) {
            throw new ValidationError('Der Krieger Nr.1 nicht gefunden!')
        }
        if(!warrior2) {
            throw new ValidationError('Der Krieger Nr.1 nicht gefunden!')
        }

        res.render('./arena/fight');
    }) //POST/Arena/Fights