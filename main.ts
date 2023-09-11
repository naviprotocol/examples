import { Pool, PoolConfig } from './src/interfaces/types';
import { SuiClient } from './src/sui-client';
import BigNumber from 'bignumber.js';

const config = {
    ProtocolPackage: '0xd92bc457b42d48924087ea3f22d35fd2fe9afdf5bdfe38cc51c0f14f3282f6d5',
    StorageId: '0xbb4e2f4b6205c2e2a2db47aeb4f830796ec7c005f88537ee775986639bc442fe',
    Incentive: '0xaaf735bf83ff564e1b219a0d644de894ef5bdc4b2250b126b2a46dd002331821',

    PriceOracle: '0x1568865ed9a0b5ec414220e8f79b3d04c77acc82358f6e5ae4635687392ffbef',
};

const pool: Pool = {
    sui: {
        assetId: 0,
        poolId: '0x96df0fce3c471489f4debaaa762cf960b3d97820bd1f3f025ff8190730e958c5',
        type: '0x2::sui::SUI',
    },
    usdc: {
        assetId: 1,
        poolId: '0xa02a98f9c88db51c6f5efaaf2261c81f34dd56d86073387e0ef1805ca22e39c8',
        type: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN',
    },
};

export class SuiTools {
    private sui: SuiClient;

    constructor() {
        this.sui = new SuiClient();
    }

    /**
     *
     * @param address your sui wallet
     */
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

    /**
     *
     * @param coinObject Coin object Id, usually this is related to the pool. When you choose to deposit sui, you need to find the object id of the sui coin you own
     * @param amount The amount you want to deposit, carrying decimals. such as you want to deposit 1sui, you need type 1000000000
     * @param _pool Which token type do you want to deposit
     */
    async deposit(coinObject: string, amount: string, _pool: PoolConfig) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::lending::deposit`,
            [
                '0x06', // clock object id
                config.StorageId, // object id of storage
                _pool.poolId, // pool id of the sui asset
                _pool.assetId, // the id of the sui asset in the protocol
                coinObject, // the object id of the token you own.
                amount, // The amount you want to deposit, decimals must be carried, like 1 sui => 1000000000
                config.Incentive,
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(deposit): ', txUrl);
    }

    /**
     *
     * @param withdrawAmount The amount you want to withdraw, carrying decimals. such as you want to withdraw 1sui, you need type 1000000000
     * @param recipient The recipient of withdraw amounts
     * @param _pool Which token type do you want to withdraw
     */
    async withdraw(withdrawAmount: string, recipient: string, _pool: PoolConfig) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::lending::withdraw`,
            [
                '0x06', // clock object id
                config.PriceOracle, // The object id of the price oracle
                config.StorageId, // Object id of storage
                _pool.poolId, // pool id of the sui asset
                _pool.assetId, // the id of the sui asset in the protocol
                withdrawAmount, // The amount you want to withdraw
                recipient, // The recipient of withdraw amounts
                config.Incentive, // The object id of the incentive
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(withdraw): ', txUrl);
    }

    /**
     *
     * @param borrowAmount The amount you want to borrow, carrying decimals. such as you want to borrow 1sui, you need type 1000000000
     * @param _pool Which token type do you want to borrow
     */
    async borrow(borrowAmount: string, _pool: PoolConfig) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::lending::borrow`,
            [
                '0x06', // clock object id
                config.PriceOracle, // The object id of the price oracle
                config.StorageId, // Object id of storage
                _pool.poolId, // pool id of the sui asset
                _pool.assetId, // The id of the sui asset in the protocol
                borrowAmount, // The amount you want to borrow
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(borrow): ', txUrl);
    }

    async main() {
        // await this.getHealthFactor('YOUR_SUI_WALLET_ADDRESS');
        // await this.deposit('YOUR_COIN_OBJECT_ID', '100000000', pool.sui);
        // await this.withdraw('10000000', 'RECIPIENT_ADDRESS', pool.sui);
        // await this.borrow('10000', pool.usdc);
    }
}

new SuiTools().main();
