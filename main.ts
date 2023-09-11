import { SuiClient } from './src/sui-client';

export class SuiTools {
    private sui: SuiClient;

    constructor() {
        this.sui = new SuiClient();
    }

    async main() {
        console.log(this.sui.address());
    }
}

new SuiTools().main();
