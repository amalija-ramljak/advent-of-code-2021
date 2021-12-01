import RL from 'readline';
import getDay from './days';

const rl = RL.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dynamicImport = (day: string) => {
    day = getDay(day);
    if (day) {
        import(`../day${day}/index.ts`);
        rl.close();
    } else {
        rl.question('Pick a day to run: ', dynamicImport);
    }
}

dynamicImport('');
