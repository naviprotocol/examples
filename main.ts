import { SuiClient } from './src/sui-client';

export class SuiTools {
    private sui: SuiClient;

    constructor() {
        this.sui = new SuiClient();
    }

    async main() {
        console.log(this.sui.address());
        // await this.oracleOption();

        // await this.storageManager.initAllReserve();

        // await this.sui.getObject('0xd5ec9d12f89a985b9e430ca8ace8183a76f3c52a0c2a09a67db42ebf60613fce');
        // await this.storageManager.addIncentivePool();
        // await this.oracleManager.updatePrice();
    }
}

new SuiTools().main();
