/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import chai, { assert, expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { setTimeout } from "timers/promises";

import {
  ORDER_STATUS,
  ORDER_SIDE,
  MinifiedCandleStick,
  BigNumber,
  ORDER_TYPE,
  Web3,
  bnStrToBaseNumber,
  MARKET_SYMBOLS,
} from "@firefly-exchange/library";

import {
  FireflyClient,
  GetMarketRecentTradesResponse,
  GetPositionResponse,
  Networks,
  PlaceOrderResponse,
  GetUserTradesResponse,
  GetAccountDataResponse,
  TickerData,
} from "../index";

chai.use(chaiAsPromised);

const testAcctKey =
  "4d6c9531e0042cc8f7cf13d8c3cf77bfe239a8fed95e198d498ee1ec0b1a7e83";
const testAcctPubAddr = "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF";

let client: FireflyClient;

describe("FireflyClient", () => {
  //* set environment from here
  const network = Networks.TESTNET_ARBITRUM;
  const symbol = "ETH-PERP";
  let defaultLeverage = 3;
  let buyPrice = 18000;
  let sellPrice = 20000;

  before(async () => {
    client = new FireflyClient(true, network, testAcctKey, false);
    await client.init();
    // TODO! uncomment below code when done testing specifically on BTC-PERP
    // const allSymbols = await client.getMarketSymbols();
    // get first symbol to run tests on
    // if (allSymbols.data) {
    //   symbol = allSymbols.data[0];
    // }
    // TODO! uncomment above code when done testing specifically on BTC-PERP

    console.log(`--- Trading symbol: ${symbol} ---`);

    // get default leverage
    defaultLeverage = await client.getUserDefaultLeverage(symbol);
    console.log(`- on leverage: ${defaultLeverage}`);

    // market data
    const marketData = await client.getMarketData(symbol);
    if (marketData.data && bnStrToBaseNumber(marketData.data.marketPrice) > 0) {
      const marketPrice = bnStrToBaseNumber(marketData.data.marketPrice);
      const percentChange = 3 / 100; // 3%
      buyPrice = Number((marketPrice - marketPrice * percentChange).toFixed(0));
      sellPrice = Number(
        (marketPrice + marketPrice * percentChange).toFixed(0)
      );
      console.log(`- market price: ${marketPrice}`);
    }
  });

  beforeEach(async () => {
    client = new FireflyClient(true, network, testAcctKey);
    await client.init();
  });

  afterEach(() => {
    client.sockets.close();
  });

  it("should initialize the client", async () => {
    expect(client).to.be.not.eq(undefined);
  });

  it("should return public address of account", async () => {
    expect(client.getPublicAddress()).to.be.equal(testAcctPubAddr);
  });
  it("should set sub account", async () => {
    const resp = await client.setSubAccount(
      "0xDa53d33E49F1f4689C3B9e1EB6E265244C77B92B",
      MARKET_SYMBOLS.ETH,
      true
    );
    expect(resp.ok).to.be.equal(true);
  });

  describe("Market", () => {
    it(`should add ${symbol} market`, async () => {
      expect(client.addMarket(symbol)).to.be.equal(true);
    });

    it(`should add ${symbol} market with custom orders contract address`, async () => {
      expect(
        client.addMarket(symbol, "0x36AAc8c385E5FA42F6A7F62Ee91b5C2D813C451C")
      ).to.be.equal(true);
    });

    it("should throw error as there is no market by name of TEST-PERP in deployedContracts", async () => {
      assert.throws(
        () => {
          client.addMarket("TEST-PERP");
        },
        Error,
        `Contract "IsolatedTrader" not found in contract addresses for network id ${network.chainId}`
      );
    });

    it("should add market despite not existing in deployed contracts", async () => {
      expect(
        client.addMarket(
          "TEST-PERP",
          "0x36AAc8c385E5FA42F6A7F62Ee91b5C2D813C451C"
        )
      ).to.be.equal(true);
    });

    it("should return False as BTC-PERP market is already added", async () => {
      expect(client.addMarket(symbol)).to.be.equal(true);
      expect(client.addMarket(symbol)).to.be.equal(false);
    });

    it("should remove the BTC market", async () => {
      expect(client.addMarket(symbol)).to.be.equal(true);
      expect(client.removeMarket(symbol)).to.be.equal(true);
    });

    it("should return false when trying to remove a non-existent market", async () => {
      expect(client.removeMarket(symbol)).to.be.equal(false);
    });
  });

  describe("Fund Gas", () => {
    it("fund gas token", async () => {
      // Given
      const web3 = new Web3(network.url);
      const wallet = web3.eth.accounts.create();
      const clientTemp = new FireflyClient(true, network, wallet.privateKey);
      await clientTemp.init();
      // When
      const response = await clientTemp.fundGas();
      // Then
      expect(response.ok).to.eq(true);
    });

    it("get boba token balance", async () => {
      // Given
      const web3 = new Web3(network.url);
      const wallet = web3.eth.accounts.create();
      const clientTemp = new FireflyClient(true, network, wallet.privateKey);
      await clientTemp.init();
      // When
      await clientTemp.fundGas(); // should fund 0.01 boba
      const response = await clientTemp.getChainNativeBalance();
      expect(new BigNumber(response).gte(new BigNumber(0))).to.eq(true);
    });
  });

  describe("Balance", () => {
    it("should get 10K Test USDCs", async () => {
      const usdcBalance = await client.getUSDCBalance();
      expect(await client.mintTestUSDC()).to.be.equal(true);
      expect(await client.getUSDCBalance()).to.be.gte(usdcBalance + 10000);
    });

    it("should move 1 USDC token to Margin Bank", async () => {
      const usdcBalance = await client.getUSDCBalance();
      expect((await client.depositToMarginBank(1))?.ok).to.be.equal(true);
      expect(await client.getMarginBankBalance()).to.be.gte(1);
      expect(await client.getUSDCBalance()).to.be.gte(usdcBalance - 1);
    });

    it("should withdraw 1 USDC token from Margin Bank", async () => {
      const usdcBalance = await client.getUSDCBalance();
      expect((await client.withdrawFromMarginBank(1))?.ok).to.be.equal(true);
      expect(await client.getUSDCBalance()).to.be.gte(usdcBalance + 1);
    });

    it("should move all USDC token from Margin Bank", async () => {
      expect((await client.withdrawFromMarginBank())?.ok).to.be.equal(true);
      expect(await client.getMarginBankBalance()).to.be.eql(0);
    });
  });

  describe("Leverage getter and setter", () => {
    beforeEach(async () => {
      client.addMarket(symbol);
    });

    it("set and get leverage", async () => {
      // Given
      const web3 = new Web3(network.url);
      const wallet = web3.eth.accounts.create();
      const clientTemp = new FireflyClient(true, network, wallet.privateKey);
      await clientTemp.init();
      // When
      const newLeverage = 4;
      const res = await clientTemp.adjustLeverage({
        symbol,
        leverage: newLeverage,
      }); // set leverage will do contract call as the account using is new
      const lev = await clientTemp.getUserDefaultLeverage(symbol); // get leverage
      // Then
      expect(res.ok).to.eq(true);
      expect(lev).to.equal(4);
    });

    it("set and get leverage on behalf of parent account", async () => {
      // make sure to first whitelist the subaccount with the below parent account to run this test.
      // To whitelist the subaccount use the above test {set sub account}
      // and subaccount must be authenticated/initialized with the client.
      // When
      const newLeverage = 5;
      const res = await client.adjustLeverage({
        symbol,
        leverage: newLeverage,
        parentAddress:
          "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF".toLowerCase(),
      }); // set leverage will do contract call as the account using is new
      const lev = await client.getUserDefaultLeverage(
        symbol,
        "0x90aDADD7C242A060d096409fb5cad9Bb8ACbC148".toLowerCase()
      ); // get leverage
      // Then
      expect(res.ok).to.eq(true);
      expect(lev).to.equal(newLeverage);
    });
  });

  describe("Create/Place/Post Orders", () => {
    beforeEach(async () => {
      client.addMarket(symbol);
    });

    it("should put 10K in margin bank", async () => {
      const minted = await client.mintTestUSDC();
      const deposited = await client.depositToMarginBank(10000);
      expect(minted).to.eq(true);
      expect(deposited.ok).to.eq(true);
    });

    it("should throw error as DOT market is not added to client", async () => {
      await expect(
        client.createSignedOrder({
          symbol: "DOT-TEST",
          price: 0,
          quantity: 0.1,
          side: ORDER_SIDE.SELL,
          orderType: ORDER_TYPE.MARKET,
        })
      ).to.be.eventually.rejectedWith(
        "Provided Market Symbol(DOT-TEST) is not added to client library"
      );
    });

    it("should create signed order", async () => {
      const signedOrder = await client.createSignedOrder({
        symbol,
        price: 0,
        quantity: 0.1,
        side: ORDER_SIDE.SELL,
        orderType: ORDER_TYPE.MARKET,
      });

      expect(signedOrder.leverage).to.be.equal(1);
      expect(signedOrder.price).to.be.equal(0);
      expect(signedOrder.quantity).to.be.equal(0.1);
    });

    it("should create signed order and verify the signature", async () => {
      const params = {
        symbol,
        price: 0,
        quantity: 0.1,
        side: ORDER_SIDE.SELL,
        orderType: ORDER_TYPE.MARKET,
      };
      const signedOrder = await client.createSignedOrder(params);
      const isValid = client.verifyOrderSignature(signedOrder);

      expect(isValid).to.be.equal(true);
    });

    it("should place a LIMIT SELL order on exchange", async () => {
      const signedOrder = await client.createSignedOrder({
        symbol,
        price: sellPrice,
        quantity: 0.1,
        side: ORDER_SIDE.SELL,
        leverage: defaultLeverage,
        orderType: ORDER_TYPE.LIMIT,
      });

      const response = await client.placeSignedOrder({ ...signedOrder });
      expect(response.ok).to.be.equal(true);
    });

    it("should place a MARKET BUY order on exchange", async () => {
      const signedOrder = await client.createSignedOrder({
        symbol,
        price: 0,
        quantity: 0.1,
        side: ORDER_SIDE.SELL,
        leverage: defaultLeverage,
        orderType: ORDER_TYPE.MARKET,
      });
      const response = await client.placeSignedOrder({ ...signedOrder });
      expect(response.ok).to.be.equal(true);
    });

    it("should place a MARKET BUY order on behalf of parent exchange", async () => {
      // make sure to first whitelist the subaccount with the below parent account to run this test.
      // To whitelist the subaccount use the above test {set sub account}
      // and subaccount must be authenticated/initialized with the client.
      const signedOrder = await client.createSignedOrder({
        symbol,
        price: 0,
        quantity: 0.01,
        side: ORDER_SIDE.BUY,
        leverage: defaultLeverage,
        orderType: ORDER_TYPE.MARKET,
        reduceOnly: false,
        expiration: 1674196912,
        // parent account
        maker: "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF",
      });
      const response = await client.placeSignedOrder({ ...signedOrder });
      expect(response.ok).to.be.equal(true);
    });

    it("should post a LIMIT order on exchange", async () => {
      const response = await client.postOrder({
        symbol,
        price: buyPrice,
        quantity: 0.1,
        side: ORDER_SIDE.BUY,
        leverage: defaultLeverage,
        orderType: ORDER_TYPE.LIMIT,
        clientId: "Test limit order",
      });

      expect(response.ok).to.be.equal(true);
    });
  });

  describe("Cancel Orders", () => {
    beforeEach(async () => {
      client.addMarket(symbol);
    });

    it("should cancel the open order", async () => {
      const signedOrder = await client.createSignedOrder({
        symbol,
        price: sellPrice,
        quantity: 0.001,
        side: ORDER_SIDE.SELL,
        leverage: defaultLeverage,
        orderType: ORDER_TYPE.LIMIT,
      });
      const response = await client.placeSignedOrder({
        ...signedOrder,
        clientId: "test cancel order",
      });
      const cancelSignature = await client.createOrderCancellationSignature({
        symbol,
        hashes: [response.response.data.hash],
      });

      const cancellationResponse = await client.placeCancelOrder({
        symbol,
        hashes: [response.response.data.hash],
        signature: cancelSignature,
      });

      expect(cancellationResponse.ok).to.be.equal(true);
    });

    it("should cancel the open order on behalf of parent account", async () => {
      // make sure to first whitelist the subaccount with the below parent account to run this test.
      // To whitelist the subaccount use the above test {set sub account}
      // and subaccount must be authenticated/initialized with the client.
      const signedOrder = await client.createSignedOrder({
        symbol,
        price: sellPrice,
        quantity: 0.01,
        side: ORDER_SIDE.SELL,
        leverage: defaultLeverage,
        orderType: ORDER_TYPE.LIMIT,
        maker: "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF",
      });
      const response = await client.placeSignedOrder({
        ...signedOrder,
        clientId: "test cancel order",
      });
      const cancelSignature = await client.createOrderCancellationSignature({
        symbol,
        hashes: [response.response.data.hash],
        parentAddress:
          "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF".toLowerCase(),
      });

      const cancellationResponse = await client.placeCancelOrder({
        symbol,
        hashes: [response.response.data.hash],
        signature: cancelSignature,
        parentAddress:
          "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF".toLowerCase(),
      });

      expect(cancellationResponse.ok).to.be.equal(true);
    });

    it("should get Invalid Order Signature error", async () => {
      const signedOrder = await client.createSignedOrder({
        symbol,
        price: sellPrice,
        quantity: 0.001,
        side: ORDER_SIDE.SELL,
        leverage: defaultLeverage,
        orderType: ORDER_TYPE.LIMIT,
      });
      const response = await client.placeSignedOrder({ ...signedOrder });

      const cancellationResponse = await client.placeCancelOrder({
        symbol,
        hashes: [response.response.data.hash],
        signature: "0xSomeRandomStringWhichIsNotACorrectSignature",
      });

      expect(cancellationResponse.ok).to.be.equal(false);
      expect(cancellationResponse.response.message).to.be.equal(
        "Invalid Order Signature"
      );
    });

    it("should post a cancel order on exchange", async () => {
      const response = await client.postOrder({
        symbol,
        price: sellPrice + 2,
        quantity: 0.1,
        side: ORDER_SIDE.SELL,
        leverage: defaultLeverage,
        orderType: ORDER_TYPE.LIMIT,
      });
      expect(response.ok).to.be.equal(true);

      const cancelResponse = await client.postCancelOrder({
        symbol,
        hashes: [response?.data?.hash as string],
      });

      expect(cancelResponse.ok).to.be.equal(true);
    });

    it("should cancel all open orders", async () => {
      const response = await client.cancelAllOpenOrders(symbol);
      expect(response.ok).to.be.equal(true);
    });

    it("should cancel all open orders on behalf of parent account", async () => {
      const response = await client.cancelAllOpenOrders(
        symbol,
        "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF"
      );
      expect(response.ok).to.be.equal(true);
    });
  });

  describe("Get User Orders", () => {
    it("should get all open orders", async () => {
      const data = await client.getUserOrders({
        statuses: [ORDER_STATUS.OPEN],
        symbol,
      });
      expect(data.ok).to.be.equals(true);
      expect(data.response.data.length).to.be.gte(0);
    });

    it("should get all open orders on behalf of parent account", async () => {
      // make sure to first whitelist the subaccount with the below parent account to run this test.
      // To whitelist the subaccount use the above test {set sub account}
      // and subaccount must be authenticated/initialized with the client.
      const data = await client.getUserOrders({
        statuses: [ORDER_STATUS.OPEN],
        symbol,
        parentAddress:
          "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF".toLowerCase(),
      });
      expect(data.ok).to.be.equals(true);
      expect(data.response.data.length).to.be.gte(0);
    });

    it("should handle get open orders of non-existent hashes", async () => {
      const data = await client.getUserOrders({
        statuses: [ORDER_STATUS.OPEN],
        symbol,
        orderHashes: ["test0"], // incorrect hash
      });
      expect(data.ok).to.be.equals(true);
      expect(data.response.data.length).to.be.eq(0);
    });

    it("should get open orders of specific hashes", async () => {
      const data = await client.getUserOrders({
        statuses: [ORDER_STATUS.OPEN],
        symbol,
      });
      if (data.ok && data.data!.length > 0) {
        const data1 = await client.getUserOrders({
          statuses: [ORDER_STATUS.OPEN],
          symbol,
          orderHashes: data.response.data[0].hash,
        });

        expect(data1.ok).to.be.equals(true);
        expect(data1.data!.length).to.be.eq(1);
      }

      expect(data.ok).to.be.equals(true);
    });

    it("should get all cancelled orders", async () => {
      const data = await client.getUserOrders({
        statuses: [ORDER_STATUS.CANCELLED],
        symbol,
      });
      expect(data.ok).to.be.equal(true);
    });

    it("should get cancelled orders", async () => {
      const data = await client.getUserOrders({
        statuses: [ORDER_STATUS.CANCELLED],
        symbol,
        pageSize: 1,
      });
      expect(data.ok).to.be.equals(true);
    });

    it("should get 0 expired orders as page 10 does not exist for expired orders", async () => {
      const data = await client.getUserOrders({
        statuses: [ORDER_STATUS.EXPIRED],
        symbol,
        pageNumber: 10,
      });
      expect(data.response.data.length).to.be.equals(0);
    });

    it("should get only LIMIT filled orders", async () => {
      const data = await client.getUserOrders({
        statuses: [ORDER_STATUS.FILLED],
        orderType: [ORDER_TYPE.LIMIT],
        symbol,
      });
      expect(data.ok).to.be.equals(true);
      expect(data.response.data.length).to.be.gte(0);
    });
  });

  describe("Get User Position", () => {
    beforeEach(async () => {
      client.addMarket(symbol);
    });

    it("should return zero open positions for the user", async () => {
      // Given
      const web3 = new Web3(network.url);
      const wallet = web3.eth.accounts.create();
      const clientTemp = new FireflyClient(true, network, wallet.privateKey);
      await clientTemp.init();

      // When
      clientTemp.addMarket(symbol);
      const response = await clientTemp.getUserPosition({});

      // Then
      expect(response.ok).to.be.equal(true);
      expect(response.response.data.length).to.be.equal(0);

      clientTemp.sockets.close();
    });

    it("should get user's BTC-PERP Position", async () => {
      const response = await client.getUserPosition({
        symbol,
      });

      const position = response.data as any as GetPositionResponse;
      if (Object.keys(position).length > 0) {
        expect(response.response.data.symbol).to.be.equal(symbol);
      }
    });

    it("should get user's Position on behalf of parent account", async () => {
      // make sure to first whitelist the subaccount with the below parent account to run this test.
      // To whitelist the subaccount use the above test {set sub account}
      // and subaccount must be authenticated/initialized with the client.
      const response = await client.getUserPosition({
        symbol,
        parentAddress: "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF",
      });

      const position = response.data as any as GetPositionResponse;
      if (Object.keys(position).length > 0) {
        expect(response.response.data.symbol).to.be.equal(symbol);
      }
    });

    it("should get all open positions for the user across all markets", async () => {
      const response = await client.getUserPosition({});
      expect(response.ok).to.be.equal(true);
    });
  });

  describe("Get User Trades", () => {
    beforeEach(async () => {
      client.addMarket(symbol);
    });

    it("should return zero trades for the user", async () => {
      // Given
      const web3 = new Web3(network.url);
      const wallet = web3.eth.accounts.create();
      const clientTemp = new FireflyClient(true, network, wallet.privateKey);
      await clientTemp.init();

      // When
      clientTemp.addMarket(symbol);
      const response = await clientTemp.getUserTrades({});

      // Then
      expect(response.ok).to.be.equal(true);
      expect(response.response.data.length).to.be.equal(0);
      clientTemp.sockets.close();
    });

    it("should get user's BTC-PERP Trades", async () => {
      const response = await client.getUserTrades({
        symbol,
      });
      expect(response.ok).to.be.equal(true);
    });

    it("should get user's Trades on behalf of parent account", async () => {
      // make sure to first whitelist the subaccount with the below parent account to run this test.
      // To whitelist the subaccount use the above test {set sub account}
      // and subaccount must be authenticated/initialized with the client.
      const response = await client.getUserTrades({
        symbol,
        parentAddress: "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF",
      });
      expect(response.ok).to.be.equal(true);
    });
  });

  describe("Get Market Orderbook", () => {
    it(`should get ${symbol} orderbook with best ask and bid`, async () => {
      const response = await client.getOrderbook({
        symbol,
        limit: 1,
      });
      expect(response.ok).to.be.equal(true);
      expect(response?.data?.limit).to.be.equal(1);
      expect(response?.data?.symbol).to.be.equal(symbol);
    });

    it("should get no orderbook data as market for DOGE-PERP does not exist", async () => {
      const response = await client.getOrderbook({
        symbol: "DODGE-PERP",
        limit: 1,
      });
      expect(response.ok).to.be.equal(false);
    });
  });

  describe("User History and Account Related Routes", async () => {
    it("should get User Account Data", async () => {
      const response = await client.getUserAccountData();
      expect(response.ok).to.be.equal(true);
    });

    it("should get User Account Data on behalf of parent account", async () => {
      // make sure to first whitelist the subaccount with the below parent account to run this test.
      // To whitelist the subaccount use the above test {set sub account}
      // and subaccount must be authenticated/initialized with the client.
      const response = await client.getUserAccountData(
        "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF"
      );
      expect(response.ok).to.be.equal(true);
    });

    it("should get Transaction History records for user", async () => {
      const response = await client.getUserTransactionHistory({
        symbol,
        pageSize: 2,
        pageNumber: 1,
      });
      expect(response.ok).to.be.equal(true);
    });

    it("should get Funding History records for user", async () => {
      const response = await client.getUserFundingHistory({
        pageSize: 2,
        cursor: 1,
      });
      expect(response.ok).to.be.equal(true);
    });

    it("should get Funding History records for user on behalf of parent account", async () => {
      // make sure to first whitelist the subaccount with the below parent account to run this test.
      // To whitelist the subaccount use the above test {set sub account}
      // and subaccount must be authenticated/initialized with the client.
      const response = await client.getUserFundingHistory({
        symbol,
        parentAddress: "0xFEa83f912CF21d884CDfb66640CfAB6029D940aF",
      });
      expect(response.ok).to.be.equal(true);
    });

    it(`should get Funding History records of ${symbol}`, async () => {
      const response = await client.getUserFundingHistory({
        symbol,
        pageSize: 2,
        cursor: 1,
      });
      expect(response.ok).to.be.equal(true);
    });

    it("should get all Transfer History records for user", async () => {
      const response = await client.getUserTransferHistory({});
      expect(response.ok).to.be.equal(true);
    });

    it("should get Transfer History of `Withdraw` records for user", async () => {
      const response = await client.getUserTransferHistory({
        action: "Withdraw",
      });
      expect(response.ok).to.be.equal(true);
    });
  });

  it("should get contract address", async () => {
    const response = await client.getContractAddresses();
    expect(response.ok).to.be.equal(true);
  });

  it("should get recent market trades of BTC-PERP Market", async () => {
    const response = await client.getMarketRecentTrades({
      symbol,
    });
    expect(response.ok).to.be.equal(true);
  });

  it("should get candle stick data", async () => {
    const response = await client.getMarketCandleStickData({
      symbol,
      interval: "1m",
    });
    expect(response.ok).to.be.equal(true);
  });

  it("should get exchange info for BTC Market", async () => {
    const response = await client.getExchangeInfo(symbol);
    expect(response.ok).to.be.equal(true);
    expect(response.data?.symbol).to.be.equal(symbol);
  });

  it("should get exchange info for all markets", async () => {
    const response = await client.getExchangeInfo();
    expect(response.ok).to.be.equal(true);
    expect(response.response.data.length).to.be.gte(1);
  });

  it("should get market data for BTC Market", async () => {
    const response = await client.getMarketData(symbol);
    expect(response.ok).to.be.equal(true);
  });

  it("should get market meta info for BTC Market", async () => {
    const response = await client.getMarketMetaInfo(symbol);
    expect(response.ok).to.be.equal(true);
  });

  it("should get market ticker data for BTC Market", async () => {
    const response = await client.getTickerData(symbol);
    expect(response.ok).to.be.equal(true);
  });

  it("should get master info of all markets", async () => {
    const response = await client.getMasterInfo();
    expect(response.ok).to.be.equal(true);
  });

  it(`should get master info of ${symbol}`, async () => {
    const response = await client.getMasterInfo(symbol);
    expect(response.ok).to.be.equal(true);
  });

  it("should get market symbols", async () => {
    const response = await client.getMarketSymbols();
    expect(response.ok).to.be.equal(true);
  });

  it("should get status of exchange to be alive", async () => {
    const response = await client.getExchangeStatus();
    expect(response.ok).to.be.equal(true);
    expect(response.data?.isAlive).to.be.equal(true);
  });

  it(`should return funding rate of ${symbol}`, async () => {
    const response = await client.getMarketFundingRate(symbol);
    expect(response.ok).to.be.equal(true);
  });

  it(`should return verification status`, async () => {
    const response = await client.verifyDeposit(100);
    expect(response.ok).to.be.equal(true);
  });

  describe("Sockets", () => {
    beforeEach(async () => {
      client.sockets.open();
      client.addMarket(symbol);
      client.sockets.subscribeGlobalUpdatesBySymbol(symbol);
      client.sockets.subscribeUserUpdateByToken();
    });

    it("should receive an event from candle stick", (done) => {
      const callback = (candle: MinifiedCandleStick) => {
        expect(candle[candle.length - 1]).to.be.equal(symbol);
        done();
      };
      client.sockets.onCandleStickUpdate(symbol, "1m", callback);
    });

    it("should receive an event for orderbook update when an order is placed on exchange", (done) => {
      const callback = ({ orderbook }: any) => {
        expect(orderbook.symbol).to.be.equal(symbol);
        done();
      };

      client.sockets.onOrderBookUpdate(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol,
          price: sellPrice + 3,
          quantity: 0.1,
          side: ORDER_SIDE.SELL,
          leverage: defaultLeverage,
          orderType: ORDER_TYPE.LIMIT,
        });
      });
    });

    it("should receive an event for ticker update", (done) => {
      const callback = (tickerUpdate: TickerData[]) => {
        expect(tickerUpdate.length).to.be.greaterThan(0);
        done();
      };

      client.sockets.onTickerUpdate(callback);
    });

    it("should receive an event when a trade is performed", (done) => {
      const callback = ({
        trades,
      }: {
        trades: GetMarketRecentTradesResponse[];
      }) => {
        expect(trades[0].symbol).to.be.equal(symbol);
        done();
      };

      client.sockets.onRecentTrades(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol,
          price: 0,
          quantity: 0.1,
          side: ORDER_SIDE.SELL,
          leverage: defaultLeverage,
          orderType: ORDER_TYPE.MARKET,
        });
      });
    });

    it("should receive order update event", (done) => {
      const callback = ({ order }: { order: PlaceOrderResponse }) => {
        expect(order.symbol).to.be.equal(symbol);
        done();
      };

      client.sockets.onUserOrderUpdate(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol,
          price: sellPrice + 1,
          quantity: 0.1,
          side: ORDER_SIDE.SELL,
          leverage: defaultLeverage,
          orderType: ORDER_TYPE.LIMIT,
        });
      });
    });

    it("should receive position update event", (done) => {
      const callback = ({ position }: { position: GetPositionResponse }) => {
        expect(position.userAddress).to.be.equal(
          client.getPublicAddress().toLocaleLowerCase()
        );
        done();
      };

      client.sockets.onUserPositionUpdate(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol,
          price: 0,
          quantity: 0.1,
          side: ORDER_SIDE.BUY,
          leverage: defaultLeverage,
          orderType: ORDER_TYPE.MARKET,
        });
      });
    });

    it("should receive user update event", (done) => {
      const callback = ({ trade }: { trade: GetUserTradesResponse }) => {
        expect(trade.maker).to.be.equal(false);
        expect(trade.symbol).to.be.equal(symbol);
        done();
      };

      client.sockets.onUserUpdates(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol,
          price: 0,
          quantity: 0.1,
          side: ORDER_SIDE.BUY,
          leverage: defaultLeverage,
          orderType: ORDER_TYPE.MARKET,
        });
      });
    });

    it("should receive user account update event", (done) => {
      const callback = ({
        accountData,
      }: {
        accountData: GetAccountDataResponse;
      }) => {
        expect(accountData.address).to.be.equal(
          client.getPublicAddress().toLocaleLowerCase()
        );
        done();
      };

      client.sockets.onUserAccountDataUpdate(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol,
          price: 0,
          quantity: 0.1,
          side: ORDER_SIDE.BUY,
          leverage: defaultLeverage,
          orderType: ORDER_TYPE.MARKET,
        });
      });
    });
  });

  describe("WebSockets", () => {
    beforeEach(async () => {
      client.addMarket(symbol);
      await client.webSockets?.open();
      client.webSockets?.subscribeGlobalUpdatesBySymbol(symbol);
      client.webSockets?.subscribeUserUpdateByToken();
    });

    afterEach(() => {
      client.webSockets?.close();
    });

    it("WebSocket Client: should receive an event from candle stick", (done) => {
      const callback = (candle: MinifiedCandleStick) => {
        expect(candle[candle.length - 1]).to.be.equal(symbol);
        done();
      };
      client.webSockets?.onCandleStickUpdate(symbol, "1m", callback);
    });

    it("WebSocket Client: should receive an event for orderbook update when an order is placed on exchange", (done) => {
      const callback = ({ orderbook }: any) => {
        expect(orderbook.symbol).to.be.equal(symbol);
        done();
      };

      client.webSockets?.onOrderBookUpdate(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol,
          price: sellPrice + 3,
          quantity: 0.1,
          side: ORDER_SIDE.SELL,
          leverage: defaultLeverage,
          orderType: ORDER_TYPE.LIMIT,
        });
      });
    });

    it("WebSocket Client: should receive an event for ticker update", (done) => {
      const callback = (tickerUpdate: TickerData[]) => {
        expect(tickerUpdate.length).to.be.greaterThan(0);
        done();
      };

      client.webSockets?.onTickerUpdate(callback);
    });

    it("WebSocket Client: should receive an event when a trade is performed", (done) => {
      const callback = ({
        trades,
      }: {
        trades: GetMarketRecentTradesResponse[];
      }) => {
        expect(trades[0].symbol).to.be.equal(symbol);
        done();
      };

      client.webSockets?.onRecentTrades(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol,
          price: 0,
          quantity: 0.1,
          side: ORDER_SIDE.BUY,
          leverage: defaultLeverage,
          orderType: ORDER_TYPE.MARKET,
        });
      });
    });

    it("WebSocket Client: should receive order update event", (done) => {
      const callback = ({ order }: { order: PlaceOrderResponse }) => {
        expect(order.symbol).to.be.equal(symbol);
        done();
      };

      client.webSockets?.onUserOrderUpdate(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol,
          price: sellPrice + 1,
          quantity: 0.1,
          side: ORDER_SIDE.BUY,
          leverage: defaultLeverage,
          orderType: ORDER_TYPE.LIMIT,
        });
      });
    });

    it("WebSocket Client: should receive position update event", (done) => {
      const callback = ({ position }: { position: GetPositionResponse }) => {
        expect(position.userAddress).to.be.equal(
          client.getPublicAddress().toLocaleLowerCase()
        );
        done();
      };

      client.webSockets?.onUserPositionUpdate(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol,
          price: 0,
          quantity: 0.1,
          side: ORDER_SIDE.BUY,
          leverage: defaultLeverage,
          orderType: ORDER_TYPE.MARKET,
        });
      });
    });

    it("WebSocket Client: should receive user update event", (done) => {
      const callback = ({ trade }: { trade: GetUserTradesResponse }) => {
        expect(trade.maker).to.be.equal(false);
        expect(trade.symbol).to.be.equal(symbol);
        done();
      };

      client.webSockets?.onUserUpdates(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol,
          price: 0,
          quantity: 0.1,
          side: ORDER_SIDE.BUY,
          leverage: defaultLeverage,
          orderType: ORDER_TYPE.MARKET,
        });
      });
    });

    it("WebSocket Client: should receive user account update event", (done) => {
      const callback = ({
        accountData,
      }: {
        accountData: GetAccountDataResponse;
      }) => {
        expect(accountData.address).to.be.equal(
          client.getPublicAddress().toLocaleLowerCase()
        );
        done();
      };

      client.webSockets?.onUserAccountDataUpdate(callback);

      // wait for 1 sec as room might not had been subscribed
      setTimeout(1000).then(() => {
        client.postOrder({
          symbol,
          price: 0,
          quantity: 0.1,
          side: ORDER_SIDE.BUY,
          leverage: defaultLeverage,
          orderType: ORDER_TYPE.MARKET,
        });
      });
    });
  });
});
