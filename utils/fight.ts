import {WarriorRecord} from "../records/warrior.record";
import {ifError} from "assert";

export const fight = (warrior1: WarriorRecord, warrior2: WarriorRecord): {log: string[], winner: WarriorRecord} => {
    const log: string[] = [];

    const warrior1Obj = {
        hp: warrior1.durability * 10,
        dp: warrior1.defence,
        warrior: warrior1,
    };
    const warrior2Obj = {
        hp: warrior2.durability * 10,
        dp: warrior2.defence,
        warrior: warrior2,
    };

    let attacker = warrior1Obj;
    let defender = warrior2Obj;

    do {
        const attackStrength = attacker.warrior.power;

        log.push(`Der ${attacker.warrior.name} fang Angriff auf den ${defender.warrior.name} an mit einer Kraft von ${attackStrength} Punkt(e)`);

        if(defender.dp + defender.warrior.agility > attackStrength) {
            log.push(`Der ${defender.warrior.name} verteitigt sich gegen den ${attacker.warrior.name} ` );
            defender.dp -= attackStrength;

            if(defender.dp < 0) {
                log.push(`Der ${attacker.warrior.name} hat die Abwehr vom ${defender.warrior.name} durchgebracht und hat sie beschädigen mit einer Kraft von ${attackStrength} Punkt(e)`);

                defender.hp += defender.dp;
                defender.dp = 0;
            }
        } else {
            log.push(`Der ${attacker.warrior.name} hat den ${defender.warrior.name} verletzt mit einer Kraft von ${attackStrength} Punkt(e)`);
            defender.hp -= attackStrength;
        }

        //console.log(attacker.warrior.name, attackStrength, ' ---> ', defender.warrior.name, defender.dp, defender.hp);

        [defender, attacker] = [attacker, defender];


    } while (defender.hp > 0);

    const winner = attacker.warrior;
    log.push(`Der ${winner.name} hat der Kampf gewonnen!`)

    return {
        log,
        winner,
    };
}