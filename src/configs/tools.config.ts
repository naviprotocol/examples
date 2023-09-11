import * as dotenv from 'dotenv';
dotenv.config();

export const AccountConfig = {
    mnemonic: process.env.MNEMONIC ? process.env.MNEMONIC : '',
    network: process.env.NETWORK ? process.env.NETWORK : '',
    rpc: process.env.FULL_NODE ? process.env.FULL_NODE : 'https://fullnode.testnet.sui.io:443',
};
