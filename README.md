## Examples of contract call about [Navi Protocol](https://app.naviprotocol.io/)

### Setup Tools

-   ### Clone Repository: `git clone https://github.com/naviprotocol/examples.git`
-   ### Install nodejs dependencies: `yarn install`
-   ### Edit your mnemonic and the network names you need to use.
    ```
    $ cat .env
    MNEMONIC="test test test test test test test test test test test test" # Replace it with your mnemonic
    NETWORK="mainnet"
    FULL_NODE=""
    ```
-   ### The function entry is [main.ts](https://github.com/naviprotocol/examples/blob/main/main.ts#L178), Select the method you want to call and modify the parameters. And then, launch it

    ```
    $ yarn start
    ```

-   ### If you just want to query some pools about incentives v2, you can run: `npx ts-node ui_getter.ts`

### Contract Call Examples

-   ### Repository: `https://github.com/naviprotocol/protocol-example/tree/main/integration-example`
