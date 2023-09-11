export interface Pool {
    sui: PoolConfig;
    usdc: PoolConfig;
    usdt: PoolConfig;
    weth: PoolConfig;
}

export interface PoolConfig {
    assetId: number;
    poolId: string; // type must be ${PriceOraclePackage}::pool::Pool<${CoinType}>
    type: string; // CoinType
}
