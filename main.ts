import { Pool, PoolConfig } from './src/interfaces/types';
import { SuiClient } from './src/sui-client';
import BigNumber from 'bignumber.js';

const config = {
    ProtocolPackage: '0xd92bc457b42d48924087ea3f22d35fd2fe9afdf5bdfe38cc51c0f14f3282f6d5',
    StorageId: '0xbb4e2f4b6205c2e2a2db47aeb4f830796ec7c005f88537ee775986639bc442fe',
    Incentive: '0xaaf735bf83ff564e1b219a0d644de894ef5bdc4b2250b126b2a46dd002331821',

    PriceOracle: '0x1568865ed9a0b5ec414220e8f79b3d04c77acc82358f6e5ae4635687392ffbef',
    ReserveParentId: '0xe6d4c6610b86ce7735ea754596d71d72d10c7980b5052fc3c8cdf8d09fea9b4b', // get it from storage object id. storage.reserves
};

const pool: Pool = {
    sui: {
        name: 'SUI',
        assetId: 0,
        poolId: '0x96df0fce3c471489f4debaaa762cf960b3d97820bd1f3f025ff8190730e958c5',
        type: '0x2::sui::SUI',
        reserveObjectId: '0xab644b5fd11aa11e930d1c7bc903ef609a9feaf9ffe1b23532ad8441854fbfaf',
        borrowBalanceParentId: '0xe7ff0daa9d090727210abe6a8b6c0c5cd483f3692a10610386e4dc9c57871ba7',
        supplyBalanceParentId: '0x589c83af4b035a3bc64c40d9011397b539b97ea47edf7be8f33d643606bf96f8',
    },
    usdc: {
        name: 'USDC',
        assetId: 1,
        poolId: '0xa02a98f9c88db51c6f5efaaf2261c81f34dd56d86073387e0ef1805ca22e39c8',
        type: '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN',
        reserveObjectId: '0xeb3903f7748ace73429bd52a70fff278aac1725d3b58afa781f25ce3450ac203',
        borrowBalanceParentId: '0x8a3aaa817a811131c624658f6e77cba04ab5829293d2c49c1a9cce8ac9c8dec4',
        supplyBalanceParentId: '0x8d0a4467806458052d577c8cd2be6031e972f2b8f5f77fce98aa12cd85330da9',
    },
    usdt: {
        name: 'USDT',
        assetId: 2,
        poolId: '0x0e060c3b5b8de00fb50511b7a45188c8e34b6995c01f69d98ea5a466fe10d103',
        type: '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',
        reserveObjectId: '0xb8c5eab02a0202f638958cc79a69a2d30055565caad1684b3c8bbca3bddcb322',
        borrowBalanceParentId: '0xc14d8292a7d69ae31164bafab7ca8a5bfda11f998540fe976a674ed0673e448f',
        supplyBalanceParentId: '0x7e2a49ff9d2edd875f82b76a9b21e2a5a098e7130abfd510a203b6ea08ab9257',
    },
    weth: {
        name: 'WETH',
        assetId: 3,
        poolId: '0x71b9f6e822c48ce827bceadce82201d6a7559f7b0350ed1daa1dc2ba3ac41b56',
        type: '0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN',
        reserveObjectId: '0xafecf4b57899d377cc8c9de75854c68925d9f512d0c47150ca52a0d3a442b735',
        borrowBalanceParentId: '0x7568d06a1b6ffc416a36c82791e3daf0e621cf19d4a2724fc6f74842661b6323',
        supplyBalanceParentId: '0xa668905b1ad445a3159b4d29b1181c4a62d864861b463dd9106cc0d97ffe8f7f',
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
                _pool.poolId, // pool id of the asset
                _pool.assetId, // the id of the asset in the protocol
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
                _pool.poolId, // pool id of the asset
                _pool.assetId, // the id of the asset in the protocol
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
                _pool.poolId, // pool id of the asset
                _pool.assetId, // The id of the asset in the protocol
                borrowAmount, // The amount you want to borrow
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(borrow): ', txUrl);
    }

    /**
     *
     * @param coinObject Coin object Id, usually this is related to the pool. When you choose to deposit sui, you need to find the object id of the sui coin you own
     * @param amount The amount you want to repay, carrying decimals. such as you want to repay 1sui, you need type 1000000000
     * @param _pool Which token type do you want to repay
     */
    async repay(coinObject: string, amount: string, _pool: PoolConfig) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::lending::repay`,
            [
                '0x06', // clock object id
                config.PriceOracle, // The object id of the price oracle
                config.StorageId, // Object id of storage
                _pool.poolId, // pool id of the asset
                _pool.assetId, // The id of the asset in the protocol
                coinObject, // the object id of the token you own.
                amount, // The amount you want to repay
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(borrow): ', txUrl);
    }

    /**
     *
     * @param debtCoin The object id of the coin, which relates to the type of debt of the liquidated user
     * @param liquidateUser Liquidated users, only users with health factor of less than 1(move type is 1e27) will be liquidated
     * @param liquidateAmount Liquidation amounts, the maximum value is usually the largest amount of debt being liquidated.
     * @param _debtPool Types of debts of the liquidated user
     * @param _collateralPool Types of collateral of the liquidated user
     */
    async liquidation_call(debtCoin: string, liquidateUser: string, liquidateAmount: string, _debtPool: PoolConfig, _collateralPool: PoolConfig) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::lending::liquidation_call`,
            [
                '0x06', // clock object id
                config.PriceOracle, // The object id of the price oracle
                config.StorageId, // Object id of storage
                _debtPool.assetId, // The id of the debt asset in the protocol
                _debtPool.poolId, // pool id of the debt asset
                _collateralPool.assetId, // The id of the collateral asset in the protocol
                _collateralPool.poolId, // pool id of the collateral asset
                debtCoin, // the object id of the debt token you own.
                liquidateUser, // Users with abnormal status(users about to be liquidated)
                liquidateAmount, // Maximum 35% of total borrowing, as configured
                config.Incentive, // The object id of the incentive
            ],
            [_debtPool.type, _collateralPool.type]
        );
        console.log('Transaction URL(borrow): ', txUrl);
    }

    /**
     * Reserves is a dynamic field, all reserve ids can be obtained from parentId.
     */
    async getReserves() {
        const result = await this.sui.provider.getDynamicFields({ parentId: config.ReserveParentId });
        parseResult(result);
    }

    /**
     *
     * @param assetId the asset id, you can get it from getReserves() function
     * All reserve configuration information will be show
     * It should match the object ids in all the pools you queried
     */
    async getReserveDetailById(assetId: any) {
        const result = await this.sui.provider.getDynamicFieldObject({ parentId: config.ReserveParentId, name: { type: 'u8', value: assetId } });
        parseResult(result);
    }

    /**
     *
     * @param address your wallet address
     * @param reserve reserve cofnig
     * The user's wallet balance will be fetched via dynamic object.
     * The resulting value needs to be divided by 1e9
     */
    async getUserBorrowAndSupplyBalanceByReserve(address: string, reserve: PoolConfig) {
        const borrowBalance: any = await this.sui.provider.getDynamicFieldObject({ parentId: reserve.borrowBalanceParentId, name: { type: 'address', value: address } });
        console.log(`Your ${reserve.name} borrow balance is: ${borrowBalance.data?.content?.fields.value}`);

        const supplyBalance: any = await this.sui.provider.getDynamicFieldObject({ parentId: reserve.supplyBalanceParentId, name: { type: 'address', value: address } });
        console.log(`Your ${reserve.name} supply balance is: ${supplyBalance.data?.content?.fields.value}`);
    }

    async getUserAssetIdList(address: string) {
        const result = await this.sui.moveInspect(`${config.ProtocolPackage}::storage::get_user_assets`, [config.StorageId, address]);
        console.log(`The list of assets id you deposited: `, result[0]);
        console.log(`The list of assets id you borrowed: `, result[1]);
    }

    async main() {
        // await this.getHealthFactor('YOUR_SUI_WALLET_ADDRESS');
        // await this.deposit('YOUR_COIN_OBJECT_ID', '100000000', pool.sui);
        // await this.withdraw('10000000', 'RECIPIENT_ADDRESS', pool.sui);
        // await this.borrow('10000', pool.usdc);
        // await this.repay('YOUR_COIN_OBJECT_ID', '10000', pool.usdc);
        // await this.liquidation_call('YOUR_COIN_OBJECT_ID', 'LIQUIDATE_USER', 'LIQUIDAT_AMOUNT', pool.sui, pool.usdc);
        // await this.getReserves();
        // await this.getReserveDetailById(pool.weth.assetId);
        // await this.getUserBorrowAndSupplyBalanceByReserve('YOUR_SUI_WALLET_ADDRESS', pool.sui);
        // await this.getUserAssetIdList('YOUR_SUI_WALLET_ADDRESS');
    }
}

function parseResult(msg: any) {
    console.log(JSON.stringify(msg, null, 2));
}

new SuiTools().main();
