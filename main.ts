import { TransactionBlock } from '@mysten/sui.js';
import { Pool, PoolConfig } from './src/interfaces/types';
import { SuiClient } from './src/sui-client';
import BigNumber from 'bignumber.js';

// **Mainnet**
export const config = {
    ProtocolPackage: '0x66aa3335901ce7e04b85ed6597ee42d4b479f7110bf98e8ebd474fa32a0027e1',
    StorageId: '0xbb4e2f4b6205c2e2a2db47aeb4f830796ec7c005f88537ee775986639bc442fe',
    Incentive: '0xaaf735bf83ff564e1b219a0d644de894ef5bdc4b2250b126b2a46dd002331821',
    IncentiveV2: '0xf87a8acb8b81d14307894d12595541a73f19933f88e1326d5be349c7a6f7559c', // The new incentive version: V2

    PriceOracle: '0x1568865ed9a0b5ec414220e8f79b3d04c77acc82358f6e5ae4635687392ffbef',
    ReserveParentId: '0xe6d4c6610b86ce7735ea754596d71d72d10c7980b5052fc3c8cdf8d09fea9b4b', // get it from storage object id. storage.reserves
};

export const pool: Pool = {
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
    cetus: {
        name: 'CETUS',
        assetId: 4,
        poolId: '0x3c376f857ec4247b8ee456c1db19e9c74e0154d4876915e54221b5052d5b1e2e',
        type: '0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
        reserveObjectId: '0x66a807c06212537fe46aa6719a00e4fa1e85a932d0b53ce7c4b1041983645133',
        borrowBalanceParentId: '0x4c3da45ffff6432b4592a39cdb3ce12f4a28034cbcb804bb071facc81fdd923d',
        supplyBalanceParentId: '0x6adc72faf2a9a15a583c9fb04f457c6a5f0b456bc9b4832413a131dfd4faddae',
    },
    voloSui: {
        name: 'VoloSui',
        assetId: 5,
        poolId: '0x9790c2c272e15b6bf9b341eb531ef16bcc8ed2b20dfda25d060bf47f5dd88d01',
        type: '0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT',
        reserveObjectId: '0xd4fd7e094af9819b06ea3136c13a6ae8da184016b78cf19773ac26d2095793e2',
        borrowBalanceParentId: '0x8fa5eccbca2c4ba9aae3b87fd44aa75aa5f5b41ea2d9be4d5321379384974984',
        supplyBalanceParentId: '0xe6457d247b6661b1cac123351998f88f3e724ff6e9ea542127b5dcb3176b3841'
    },
    haSui: {
        name: 'HaedalSui',
        assetId: 6,
        poolId: '0x6fd9cb6ebd76bc80340a9443d72ea0ae282ee20e2fd7544f6ffcd2c070d9557a',
        type: '0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI',
        reserveObjectId: '0x0c9f7a6ca561dc566bd75744bcc71a6af1dc3caf7bd32c099cd640bb5f3bb0e3',
        borrowBalanceParentId: '0x01f36898e020be6c3423e5c95d9f348868813cd4d0be39b0c8df9d8de4722b00',
        supplyBalanceParentId: '0x278b8e3d09c3548c60c51ed2f8eed281876ea58c392f71b7ff650cc9286d095b'
    },
    navx: {
        name: 'NAVX',
        assetId: 7,
        poolId: '0xc0e02e7a245e855dd365422faf76f87d9f5b2148a26d48dda6e8253c3fe9fa60',
        type: '0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX',
        reserveObjectId: '0x2e13b2f1f714c0c5fa72264f147ef7632b48ec2501f810c07df3ccb59d6fdc81',
        borrowBalanceParentId: '0xa5bf13075aa400cbdd4690a617c5f008e1fae0511dcd4f7121f09817df6c8d8b',
        supplyBalanceParentId: '0x59dedca8dc44e8df50b190f8b5fe673098c1273ac6168c0a4addf3613afcdee5'
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
     *
     */
    async depositV2(coinObject: string, amount: string, _pool: PoolConfig) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::incentive_v2::entry_deposit`,
            [
                '0x06', // clock object id
                config.StorageId, // object id of storage
                _pool.poolId, // pool id of the asset
                _pool.assetId, // the id of the asset in the protocol
                coinObject, // the object id of the token you own.
                amount, // The amount you want to deposit, decimals must be carried, like 1 sui => 1000000000
                config.Incentive,
                config.IncentiveV2, // The incentive object v2
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(entry_deposit): ', txUrl);
    }

    /**
     *
     * @param withdrawAmount The amount you want to withdraw, carrying decimals. such as you want to withdraw 1sui, you need type 1000000000
     * @param _pool Which token type do you want to withdraw
     *
     */
    async withdrawV2(withdrawAmount: string, _pool: PoolConfig) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::incentive_v2::entry_withdraw`,
            [
                '0x06', // clock object id
                config.PriceOracle, // The object id of the price oracle
                config.StorageId, // Object id of storage
                _pool.poolId, // pool id of the asset
                _pool.assetId, // the id of the asset in the protocol
                withdrawAmount, // The amount you want to withdraw
                config.Incentive, // The object id of the incentive
                config.IncentiveV2, // The incentive object v2
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(entry_withdraw): ', txUrl);
    }

    /**
     *
     * @param borrowAmount The amount you want to borrow, carrying decimals. such as you want to borrow 1sui, you need type 1000000000
     * @param _pool Which token type do you want to borrow
     */
    async borrowV2(borrowAmount: string, _pool: PoolConfig) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::incentive_v2::entry_borrow`,
            [
                '0x06', // clock object id
                config.PriceOracle, // The object id of the price oracle
                config.StorageId, // Object id of storage
                _pool.poolId, // pool id of the asset
                _pool.assetId, // The id of the asset in the protocol
                borrowAmount, // The amount you want to borrow
                config.IncentiveV2, // The incentive object v2
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(entry_borrow): ', txUrl);
    }

    /**
     *
     * @param coinObject Coin object Id, usually this is related to the pool. When you choose to deposit sui, you need to find the object id of the sui coin you own
     * @param amount The amount you want to repay, carrying decimals. such as you want to repay 1sui, you need type 1000000000
     * @param _pool Which token type do you want to repay
     */
    async repayV2(coinObject: string, amount: string, _pool: PoolConfig) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::incentive_v2::entry_repay`,
            [
                '0x06', // clock object id
                config.PriceOracle, // The object id of the price oracle
                config.StorageId, // Object id of storage
                _pool.poolId, // pool id of the asset
                _pool.assetId, // The id of the asset in the protocol
                coinObject, // the object id of the token you own.
                amount, // The amount you want to repay
                config.IncentiveV2, // The incentive object v2
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(entry_repay): ', txUrl);
    }

    /**
     *
     * @param debtCoin The object id of the coin, which relates to the type of debt of the liquidated user
     * @param liquidateUser Liquidated users, only users with health factor of less than 1(move type is 1e27) will be liquidated
     * @param liquidateAmount Liquidation amounts, the maximum value is usually the largest amount of debt being liquidated.
     * @param _debtPool Types of debts of the liquidated user
     * @param _collateralPool Types of collateral of the liquidated user
     */
    async liquidationV2(debtCoin: string, liquidateUser: string, liquidateAmount: string, _debtPool: PoolConfig, _collateralPool: PoolConfig) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::incentive_v2::entry_liquidation`,
            [
                '0x06', // clock object id
                config.PriceOracle, // The object id of the price oracle
                config.StorageId, // Object id of storage
                _debtPool.assetId, // The id of the debt asset in the protocol
                _debtPool.poolId, // pool id of the debt asset
                debtCoin, // the object id of the debt token you own.
                _collateralPool.assetId, // The id of the collateral asset in the protocol
                _collateralPool.poolId, // pool id of the collateral asset
                liquidateUser, // Users with abnormal status(users about to be liquidated)
                liquidateAmount, // Maximum 35% of total borrowing, as configured
                config.Incentive, // The object id of the incentive
                config.IncentiveV2, // The incentive object v2
            ],
            [_debtPool.type, _collateralPool.type]
        );
        console.log('Transaction URL(entry_liquidation): ', txUrl);
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

    /**
     *
     * @param assetId the asset id, you can get it from getReserves() function
     * It is possible to get the percentage of use of an asset, totalBorrow / totalSupply
     */
    async getUtilizationByAssetId(assetId: number) {
        const result = await this.sui.moveInspect(`${config.ProtocolPackage}::calculator::caculate_utilization`, [config.StorageId, assetId]);
        const utilization = new BigNumber(result[0]).div(1e27).multipliedBy(100).toString();
        console.log(`The utilization is: ${utilization}%`);
    }

    /**
     *
     * @param assetId the asset id, you can get it from getReserves() function
     * It is possible to get the borrow rate.
     */
    async getBorrowRate(assetId: number) {
        const result = await this.sui.moveInspect(`${config.ProtocolPackage}::calculator::calculate_borrow_rate`, [config.StorageId, assetId]);
        const borrowRate = new BigNumber(result[0]).div(1e27).multipliedBy(100).toString();
        console.log(`The borrow APY is: ${borrowRate}%`);
        return result[0];
    }

    /**
     *
     * @param assetId the asset id, you can get it from getReserves() function
     * @param borrowRate the borrow rate, you can get it from getBorrowRate() function
     * It is possible to get the supply rate
     */
    async getSupplyRate(assetId: number, borrowRate: string) {
        const result = await this.sui.moveInspect(`${config.ProtocolPackage}::calculator::calculate_supply_rate`, [config.StorageId, assetId, borrowRate]);
        const supplyRate = new BigNumber(result[0]).div(1e27).multipliedBy(100).toString();
        console.log(`The supply APY is: ${supplyRate}%`);
    }

    /**
     * Create an account and transfer it to the transaction sender
     */
    async createAccount() {
        const txb = new TransactionBlock();

        const ret = txb.moveCall({ target: `${config.ProtocolPackage}::lending::create_account` });

        txb.transferObjects([ret], txb.object(this.sui.address()));
        return await this.sui.moveExecute(txb);
    }

    /**
     *
     * @param coinObject Coin object Id, usually this is related to the pool. When you choose to deposit sui, you need to find the object id of the sui coin you own
     * @param amount The amount you want to deposit, carrying decimals. such as you want to deposit 1sui, you need type 1000000000
     * @param _pool Which token type do you want to deposit
     * @param account The account cap belonging to your address
     */
    async depositWithAccountCap(coinObject: string, _pool: PoolConfig, account: string) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::incentive_v2::deposit_with_account_cap`,
            [
                '0x06', // clock object id
                config.StorageId, // object id of storage
                _pool.poolId, // pool id of the asset
                _pool.assetId, // the id of the asset in the protocol
                coinObject, // the object id of the token you own.
                config.Incentive,
                config.IncentiveV2, // The incentive object v2
                account,
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(deposit_with_account_cap): ', txUrl);
    }

    /**
     *
     * @param withdrawAmount The amount you want to withdraw, carrying decimals. such as you want to withdraw 1sui, you need type 1000000000
     * @param _pool Which token type do you want to withdraw
     * @param account The account cap belonging to your address
     */
    async withdrawWithAccountCap(withdrawAmount: string, _pool: PoolConfig, account: string) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::incentive_v2::withdraw_with_account_cap`,
            [
                '0x06', // clock object id
                config.PriceOracle, // The object id of the price oracle
                config.StorageId, // Object id of storage
                _pool.poolId, // pool id of the asset
                _pool.assetId, // the id of the asset in the protocol
                withdrawAmount, // The amount you want to withdraw
                config.Incentive, // The object id of the incentive
                config.IncentiveV2, // The incentive object v2
                account,
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(withdraw_with_account_cap): ', txUrl);
    }

    /**
     *
     * @param borrowAmount The amount you want to borrow, carrying decimals. such as you want to borrow 1sui, you need type 1000000000
     * @param _pool Which token type do you want to borrow
     * @param account The account cap belonging to your address
     */
    async borrowWithAccountCap(borrowAmount: string, _pool: PoolConfig, account: string) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::incentive_v2::borrow_with_account_cap`,
            [
                '0x06', // clock object id
                config.PriceOracle, // The object id of the price oracle
                config.StorageId, // Object id of storage
                _pool.poolId, // pool id of the asset
                _pool.assetId, // The id of the asset in the protocol
                borrowAmount, // The amount you want to borrow
                config.IncentiveV2, // The incentive object v2
                account,
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(borrow_with_account_cap): ', txUrl);
    }

    /**
     *
     * @param coinObject Coin object Id, usually this is related to the pool. When you choose to deposit sui, you need to find the object id of the sui coin you own
     * @param amount The amount you want to repay, carrying decimals. such as you want to repay 1sui, you need type 1000000000
     * @param _pool Which token type do you want to repay
     * @param account The account cap belonging to your address
     */
    async repayWithAccountCap(coinObject: string, _pool: PoolConfig, account: string) {
        const txUrl = await this.sui.moveCall(
            `${config.ProtocolPackage}::incentive_v2::entry_repay`,
            [
                '0x06', // clock object id
                config.PriceOracle, // The object id of the price oracle
                config.StorageId, // Object id of storage
                _pool.poolId, // pool id of the asset
                _pool.assetId, // The id of the asset in the protocol
                coinObject, // the object id of the token you own.
                config.IncentiveV2, // The incentive object v2
                account,
            ],
            [_pool.type] // type arguments, for this just the coin type
        );
        console.log('Transaction URL(entry_repay): ', txUrl);
    }

    async main() {
        /** Active Functions */
        // await this.depositV2('YOUR_COIN_OBJECT_ID', '100000000', pool.sui);
        // await this.withdrawV2('10000000', pool.sui);
        // await this.borrowV2('10000', pool.usdc);
        // await this.repayV2('YOUR_COIN_OBJECT_ID', '10000', pool.usdc);
        // await this.liquidationV2('YOUR_COIN_OBJECT_ID', 'LIQUIDATE_USER', 'LIQUIDAT_AMOUNT', pool.sui, pool.usdc);
        // await this.depositWithAccountCap('YOUR_COIN_OBJECT_ID', pool.sui, 'ACCOUNT_CAP_BELONGING_TO_YOU');
        // await this.withdrawWithAccountCap('10000000', pool.sui, 'ACCOUNT_CAP_BELONGING_TO_YOU');
        // await this.borrowWithAccountCap('10000', pool.usdc, 'ACCOUNT_CAP_BELONGING_TO_YOU');
        // await this.repayWithAccountCap('YOUR_COIN_OBJECT_ID', pool.usdc, 'ACCOUNT_CAP_BELONGING_TO_YOU');

        /** Protocol Getter */
        // await this.getHealthFactor('YOUR_SUI_WALLET_ADDRESS');
        // await this.getReserves();
        // await this.getReserveDetailById(pool.weth.assetId);
        // await this.getUserBorrowAndSupplyBalanceByReserve('YOUR_SUI_WALLET_ADDRESS', pool.sui);
        // await this.getUserAssetIdList('YOUR_SUI_WALLET_ADDRESS');
        // await this.getUtilizationByAssetId(pool.sui.assetId);
        // const borrowRate = await this.getBorrowRate(pool.sui.assetId);
        // await this.getSupplyRate(pool.sui.assetId, borrowRate);

        /**Account Cap*/
        // await this.createAccount();
    }
}

function parseResult(msg: any) {
    console.log(JSON.stringify(msg, null, 2));
}

new SuiTools().main();
