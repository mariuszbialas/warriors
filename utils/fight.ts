import {WarriorRecord} from "../records/warrior.record";

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

        log.push(`${(attacker.warrior.name).toUpperCase()}(${attacker.hp}) greift ${(defender.warrior.name).toUpperCase()}(${defender.hp}) an`);

        if(defender.dp + defender.warrior.agility > attackStrength) {
            defender.dp -= attackStrength;

            if(defender.dp < 0) {

                defender.hp += defender.dp;
                defender.dp = 0;
            }
        } else {
            defender.hp -= attackStrength;
        }
        log.push(`${(defender.warrior.name).toUpperCase()} hat jetzt ${(defender.hp < 0) ? 0 : defender.hp} Lebenspunkt(e)`);

        [defender, attacker] = [attacker, defender];

    } while (attacker.hp > 0);

    const winner = defender.warrior;
    log.push(`${winner.name} hat den Kampf gewonnen!`)

    return {
        log,
        winner,
    };
}