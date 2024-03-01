export interface Pool {
    sui: PoolConfig;
    usdc: PoolConfig;
    usdt: PoolConfig;
    weth: PoolConfig;
    cetus: PoolConfig;
    voloSui: PoolConfig;
    haSui: PoolConfig;
    navx: PoolConfig;
}

export interface PoolConfig {
    name: string; // Customized Names
    assetId: number;
    poolId: string; // Type must be ${PriceOraclePackage}::pool::Pool<${CoinType}>
    type: string; // CoinType
    reserveObjectId: string; // Get it from dynamic object, type must be ${ProtocolPackage}::storage::ReserveData
    borrowBalanceParentId: string; // Get it from dynamic object, type must be ${ProtocolPackage}::storage::TokenBalance
    supplyBalanceParentId: string; // Get it from dynamic object, type must be ${ProtocolPackage}::storage::TokenBalance
}
