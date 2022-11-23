import {ValidationError} from "../utils/errors";
import {v4 as uuid} from 'uuid';
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type WarriorRecordResults = [WarriorRecord[], FieldPacket[]];

export class WarriorRecord {
    public id?: string;
    /**
     * Name is always unique
     */
    public readonly name: string;
    public readonly power: number;
    public readonly defence: number;
    public readonly durability: number;
    public readonly agility: number;
    public wins?: number;

    constructor(obj: Omit<WarriorRecord, 'insert' | 'update'>) {
        const {id, name, power, defence, durability, agility, wins} = obj;

        const stats = [power, defence, durability, agility];

        const sum = stats.reduce((prev, curr) => prev + curr, 0);

        for (const stat of stats) {
            if (stat < 1) {
                throw new ValidationError('Jede Kriegereingeschaft muss mindenstens 1 sein!')
            }
        }

        if(sum !== 10) {
            throw new ValidationError(`Eine Summe aller Krieger-Statistiken muss 10 betragen! Derzeit ist die Summe: ${sum}.`);
        }

        if(name.length < 3 && name.length > 50) {
            throw new  ValidationError('Eine Name des Kriegers muss mindestens 3 Zeichen und darf höstens 50 Zeichnen lang sein!');
        }

        this.id = id ?? uuid();
        this.name = name;
        this.power = power;
        this.defence = defence;
        this.durability = durability;
        this.agility = agility;
        this.wins = wins ?? 0;

    }

    async insert(): Promise<string> {
        // move to the constructor
        //if(!this.id) this.id = uuid();
        //if(typeof this.wins !== 'number')

    await pool.execute("INSERT INTO `warriors`(`id`, `name`, `power`, `defence`, `durability`, `agility`, `wins`) VALUES(:id, :name, :power, :defence, :durability, :agility, :wins)", {
        id: this.id,
        name: this.name,
        power: this.power,
        defence: this.defence,
        durability: this.durability,
        agility: this.agility,
        wins: this.wins
    });
        return this.id;
    }

    async update(): Promise<void> {
        await pool.execute("UPDATE `warriors' SET `wins` = :wins", {
            wins: this.wins
        });

    }

    static async getAll(): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors`") as WarriorRecordResults;
        return results.map(obj => new WarriorRecord(obj));
    }

    static async getOne(id: string): Promise<WarriorRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `warriors` WHERE `id` = :id", {
            id,
        }) as WarriorRecordResults;
        return results.length === 0 ? null : results[0];
    }

    static async getTop(topCount: number): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors` ORDER BY `wins` DESC LIMIT :topCount", {
            topCount,
        }) as WarriorRecordResults;
        return results.map(obj => new WarriorRecord(obj));
    }

    static async isNameTaken(name: string): Promise<boolean> {
        const [results] = await pool.execute("SELECT * FROM `warriors` WHERE `name` = :name", {
            name,
        }) as WarriorRecordResults;
        return results.length > 0;
    }


}