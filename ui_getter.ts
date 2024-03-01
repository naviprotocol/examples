import { bcs } from '@mysten/sui.js';
import { SuiClient } from './src/sui-client';
import { config, pool } from './main';

const uiConfig = {
    Package: '0x1ee4061d3c78d6244b5f32eb4011d081e52f5f4b484ca4a84de48b1146a779f7',
};

enum OptionType {
    OptionSupply = 1,
    OptionWithdraw = 2,
    OptionBorrow = 3,
    OptionRepay = 4,
}

enum PoolStatus {
    All = 0,
    Enable = 1,
    Closed = 2,
    NotStarted = 3,
}

export class UIGetter {
    private sui: SuiClient;

    constructor() {
        this.sui = new SuiClient();
        this.structRegistry();
    }

    structRegistry() {
        bcs.registerStructType('IncentiveAPYInfo', {
            asset_id: 'u8',
            apy: 'u256',
            coin_types: 'vector<string>',
        });

        bcs.registerStructType('IncentivePoolInfo', {
            pool_id: 'address',
            funds: 'address',
            phase: 'u64',
            start_at: 'u64',
            end_at: 'u64',
            closed_at: 'u64',
            total_supply: 'u64',
            asset_id: 'u8',
            option: 'u8',
            factor: 'u256',
            distributed: 'u64',
            available: 'u256',
            total: 'u256',
        });

        bcs.registerStructType('IncentivePoolInfoByPhase', {
            phase: 'u64',
            pools: 'vector<IncentivePoolInfo>',
        });

        bcs.registerStructType('UserStateInfo', {
            asset_id: 'u8',
            borrow_balance: 'u256',
            supply_balance: 'u256',
        });

        bcs.registerStructType('ReserveDataInfo', {
            id: 'u8',
            oracle_id: 'u8',
            coin_type: 'string',
            supply_cap: 'u256',
            borrow_cap: 'u256',
            supply_rate: 'u256',
            borrow_rate: 'u256',
            supply_index: 'u256',
            borrow_index: 'u256',
            total_supply: 'u256',
            total_borrow: 'u256',
            last_update_at: 'u64',
            ltv: 'u256',
            treasury_factor: 'u256',
            treasury_balance: 'u256',
            base_rate: 'u256',
            multiplier: 'u256',
            jump_rate_multiplier: 'u256',
            reserve_factor: 'u256',
            optimal_utilization: 'u256',
            liquidation_ratio: 'u256',
            liquidation_bonus: 'u256',
            liquidation_threshold: 'u256',
        });
    }

    async getIncentivePools(asset_id: number, option: OptionType, user?: string) {
        const result = await this.sui.moveInspect(
            `${uiConfig.Package}::incentive_getter::get_incentive_pools`,
            [
                '0x06', // clock object id
                config.IncentiveV2, // the incentive object v2
                config.StorageId, // object id of storage
                asset_id,
                option,
                user ? user : '0x0000000000000000000000000000000000000000000000000000000000000000', // If you provide your address, the rewards that have been claimed by your address and the total rewards will be returned.
            ],
            [], // type arguments is null
            'vector<IncentivePoolInfo>' // parse type
        );
        console.log('The Incentive Pool Array: ', result);
    }

    async getIncentiveAPY(option: OptionType) {
        const result = await this.sui.moveInspect(
            `${uiConfig.Package}::incentive_getter::get_incentive_apy`,
            [
                '0x06', // clock object id
                config.IncentiveV2, // the incentive object v2
                config.StorageId, // object id of storage
                config.PriceOracle, // The price oracle object
                option,
            ],
            [], // type arguments is null
            'vector<IncentiveAPYInfo>' // parse type
        );
        console.log('The Incentive APY: ', JSON.stringify(result, null, 2));
    }

    async getIncentivePoolsGroupByPhase(status: PoolStatus, option: OptionType, user?: string) {
        const result = await this.sui.moveInspect(
            `${uiConfig.Package}::incentive_getter::get_incentive_pools_group_by_phase`,
            [
                '0x06', // clock object id
                config.IncentiveV2, // the incentive object v2
                config.StorageId, // object id of storage
                status,
                option,
                user ? user : '0x0000000000000000000000000000000000000000000000000000000000000000',
            ],
            [], // type arguments is null
            'vector<IncentivePoolInfoByPhase>' // parse type
        );
        console.log('The Incentive Pool Info By Phase: ', JSON.stringify(result, null, 2));
    }

    async getUserState(address: string) {
        const result = await this.sui.moveInspect(`${uiConfig.Package}::getter::get_user_state`, [config.StorageId, address], [], 'vector<UserStateInfo>');
        console.log('The User State: ', JSON.stringify(result, null, 2));
    }

    async getReserveData() {
        const result = await this.sui.moveInspect(`${uiConfig.Package}::getter::get_reserve_data`, [config.StorageId], [], 'vector<ReserveDataInfo>');
        console.log('The Reserve Data: ', JSON.stringify(result, null, 2));
    }

    async main() {
        // await this.getIncentivePools(pool.sui.assetId, OptionType.OptionSupply); // get all incentive pools issued to supply users in the sui pool
        // await this.getIncentiveAPY(OptionType.OptionSupply); // get the current incentive apy of all supply pools, provide the option type and get the apy, should be div 1e27
        // await this.getIncentivePoolsGroupByPhase(PoolStatus.All, OptionType.OptionSupply); // get the pool aggregated by phase based on status

        // await this.getUserState('YOUR_ADDRESS');
        // await this.getReserveData();
    }
}

new UIGetter().main();
