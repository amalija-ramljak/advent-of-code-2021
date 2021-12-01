import RL from 'readline';
import DAYS from './days';

const rl = RL.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dynamicImport = (day: string) => {
    if (DAYS[day]) {
        import(`../day${DAYS[day]}/index.ts`);
        rl.close();
    } else {
        rl.question('Pick a day to run: ', dynamicImport);
    }
}

rl.question('Pick a day to run: ', dynamicImport);