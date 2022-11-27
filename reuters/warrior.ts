import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";
import {ValidationError} from "../utils/errors";

export const warriorRouter = Router();

warriorRouter
    .get('/add-form', (req, res) => {
        res.render('./warrior/add-form');
    })
    .post('/', async (req, res) => {
        if(await WarriorRecord.isNameTaken(req.body.name)) {
            throw  new ValidationError(`Der Name \"${req.body.name}\" ist schon Verwendet!`);
        }

        const warrior = new WarriorRecord({
            ...req.body,
            power: Number(req.body.power),
            defence: Number(req.body.defence),
            durability: Number(req.body.durability),
            agility: Number(req.body.agility)
        });
         await warrior.insert();

        res.render('./warrior/warrior-added', {
            warrior: req.body,
        });
    })