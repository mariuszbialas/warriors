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

        log.push(`${attacker.warrior.name} greift ${defender.warrior.name} mit einer Kraft von ${attackStrength} Punkt(e) an`);

        if(defender.dp + defender.warrior.agility > attackStrength) {
            log.push(`${defender.warrior.name} verteitigt sich gegen ${attacker.warrior.name} ` );
            defender.dp -= attackStrength;

            if(defender.dp < 0) {
                log.push(`${attacker.warrior.name} hat die Abwehr vom ${defender.warrior.name} durchgebracht und hat mit einer Kraft von ${attackStrength} Punkt(e) Schaden verursacht`);

                defender.hp += defender.dp;
                defender.dp = 0;
            }
        } else {
            log.push(`${attacker.warrior.name} hat  ${defender.warrior.name}  mit einer Kraft von ${attackStrength} Punkt(e) verletzt`);
            defender.hp -= attackStrength;
        }
        log.push(`${defender.warrior.name} hat jetzt ${(defender.hp < 0) ? 0 : defender.hp} Lebenspunkt(e)`);

        [defender, attacker] = [attacker, defender];

    } while (attacker.hp > 0);

    const winner = defender.warrior;
    log.push(`${winner.name} hat mit ${defender.hp} Lebenspunkt(e) den Kampf gewonnen!`)

    return {
        log,
        winner,
    };
}