import { AccountConfig } from './configs/tools.config';
import { Connection, DevInspectResults, Ed25519Keypair, JsonRpcProvider, RawSigner, SuiObjectResponse, SuiTransactionBlockResponse, TransactionBlock, bcs, devnetConnection, mainnetConnection, testnetConnection } from '@mysten/sui.js';

export class SuiClient {
    public keypair: Ed25519Keypair;
    public provider: JsonRpcProvider;
    public signer: RawSigner;

    constructor() {
        this.keypair = this.loadKeyPair();
        this.provider = this.createProvider();
        this.signer = new RawSigner(this.keypair, this.provider);
    }

    /**
     * Loading mnemonic
     * @returns KeyPair
     */
    loadKeyPair() {
        const keypair = Ed25519Keypair.deriveKeypair(AccountConfig.mnemonic);
        return keypair;
    }

    /**
     * Create RPC Provider by network name or rpc url
     * @returns Json RPC Provider
     */
    createProvider() {
        let connection: Connection;
        switch (AccountConfig.network) {
            case 'mainnet':
                connection = mainnetConnection;
                break;
            case 'testnet':
                connection = testnetConnection;
                break;
            case 'devnet' || '':
                connection = devnetConnection;
                break;
            default:
                connection = new Connection({ fullnode: AccountConfig.rpc });
                break;
        }

        return new JsonRpcProvider(connection);
    }

    /**
     *
     * @returns Get the sui address by the mnemonic
     */
    address() {
        return this.keypair.getPublicKey().toSuiAddress();
    }

    /**
     * Parse and print transaction results
     * @param data Transactions sent results
     */
    async resultParseAndPrint(data: SuiTransactionBlockResponse) {
        if (data.objectChanges) {
            for (let obj of data.objectChanges) {
                if (obj.type != 'mutated') {
                    console.log(obj);
                }
            }
        }
    }

    /**
     * Parse and print inspect result
     * @param data Inspect Result
     * @returns
     */
    async inspectResultParseAndPrint(data: DevInspectResults, parseType?: string): Promise<any[]> {
        if (data.results && data.results.length > 0) {
            if (data.results[0].returnValues && data.results[0].returnValues.length > 0) {
                let values: any[] = [];
                for (let v of data.results[0].returnValues) {
                    const _type = parseType ? parseType : v[1];
                    let result = bcs.de(_type, Uint8Array.from(v[0]));
                    values.push(result);
                }
                return values;
            }
        } else if (data.error) {
            console.log(`Get an error, msg: ${data.error}`);
        }
        return [];
    }

    /**
     * Sign and send the transaction
     * @param tx Sui transaction
     * @returns Transactions sent results
     */
    private async moveExecuteImpl(tx: TransactionBlock) {
        const result = await this.signer.signAndExecuteTransactionBlock({
            transactionBlock: tx,
            options: {
                showInput: true,
                showEffects: true,
                showEvents: true,
                showObjectChanges: true,
                showBalanceChanges: true,
            },
        });
        return result;
    }

    /**
     * Execute transaction and print result
     * @param tx Sui transaction
     * @returns The explorer link
     */
    async moveExecute(tx: TransactionBlock) {
        const result = await this.moveExecuteImpl(tx);
        this.resultParseAndPrint(result);

        return `https://explorer.sui.io/txblock/${result.digest}?network=${AccountConfig.network}`;
    }

    /**
     * Transaction assembly and execution
     * @param target Function Methods, Format: `PackageId::ModuleName::FunctionName`
     * @param args The function Args
     * @param typeArgs The function Type Args
     * @returns The explorer link
     */
    async moveCall(target: `${string}::${string}::${string}`, args: any[], typeArgs?: string[]) {
        const tx = new TransactionBlock();
        const args_: {
            kind: 'Input';
            index: number;
            type?: 'object' | 'pure' | undefined;
            value?: any;
        }[] = [];

        for (let arg of args) {
            args_.push(tx.pure(arg));
        }

        tx.moveCall({
            target: target,
            arguments: args_,
            typeArguments: typeArgs,
        });
        return await this.moveExecute(tx);
    }

    /**
     * Print The Explorer Link
     * @param target Function Methods, Format: `PackageId::ModuleName::FunctionName`
     * @param args The function Args
     * @param typeArgs The function Type Args
     */
    async moveCallAndPrint(target: `${string}::${string}::${string}`, args: any[], typeArgs?: string[]) {
        const result = await this.moveCall(target, args, typeArgs);
        console.log(result);
    }

    /**
     * Calling the view function of the move contract and print result
     * @param tx Sui transaction
     * @returns Transactions sent results
     */
    async moveInspectImpl(tx: TransactionBlock, parseType?: string): Promise<any[]> {
        const result = await this.provider.devInspectTransactionBlock({
            transactionBlock: tx,
            sender: this.address(),
        });
        return this.inspectResultParseAndPrint(result, parseType);
    }

    /**
     * Transaction assembly and inspect this transaction
     * @param target Function Methods, Format: `PackageId::ModuleName::FunctionName`
     * @param args The function Args
     * @param typeArgs The function Type Args
     */
    async moveInspect(target: `${string}::${string}::${string}`, args: any[], typeArgs?: string[], parseType?: string): Promise<any[]> {
        const tx = new TransactionBlock();

        const args_: {
            kind: 'Input';
            index: number;
            type?: 'object' | 'pure' | undefined;
            value?: any;
        }[] = [];

        for (let arg of args) {
            args_.push(tx.pure(arg));
        }

        tx.moveCall({
            target: target,
            arguments: args_,
            typeArguments: typeArgs,
        });
        return await this.moveInspectImpl(tx, parseType);
    }

    private async getObjectParseAndPrint(result: SuiObjectResponse) {
        if (result && result.data && result.data.content) {
            const content = result.data.content;
            console.log(JSON.stringify(content, null, 2));
            return;
        }
        console.log('Object non-data.');
    }

    async getObject(objectId: string) {
        const result = await this.provider.getObject({ id: objectId, options: { showContent: true } });
        this.getObjectParseAndPrint(result);
    }
}
