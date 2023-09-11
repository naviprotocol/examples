import { SuiClient } from './src/sui-client';
import BigNumber from 'bignumber.js';

const config = {
    ProtocolPackage: '0xd92bc457b42d48924087ea3f22d35fd2fe9afdf5bdfe38cc51c0f14f3282f6d5',
    StorageId: '0xbb4e2f4b6205c2e2a2db47aeb4f830796ec7c005f88537ee775986639bc442fe',

    PriceOracle: '0x1568865ed9a0b5ec414220e8f79b3d04c77acc82358f6e5ae4635687392ffbef',
};

export class SuiTools {
    private sui: SuiClient;

    constructor() {
        this.sui = new SuiClient();
    }

    async getHealthFactor(address: string) {
        const result = await this.sui.moveInspect(`${config.ProtocolPackage}::logic::user_health_factor`, [
            '0x06', // clock object id
            config.StorageId, // object id of storage
            config.PriceOracle, // object id of price oracle
            address, // user address
        ]);
        const healthFactor = new BigNumber(result[0]).div(new BigNumber(1e27));
        console.log('your health factor is: ', healthFactor.toString());
    }

    async main() {
        await this.getHealthFactor('YOUR_SUI_WALLET');
    }
}

new SuiTools().main();
