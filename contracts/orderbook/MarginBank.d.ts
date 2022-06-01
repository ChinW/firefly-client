/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface MarginBankInterface extends ethers.utils.Interface {
  functions: {
    "depositToBank(address,uint256)": FunctionFragment;
    "getAccountBankBalance(address)": FunctionFragment;
    "getAdmin()": FunctionFragment;
    "hasAccountPermissions(address,address)": FunctionFragment;
    "setAdmin(address)": FunctionFragment;
    "setBankOperator(address,bool)": FunctionFragment;
    "settleTradeMargin(tuple[2],address[2])": FunctionFragment;
    "transferFromBank(address,address,uint256)": FunctionFragment;
    "transferToPerpetual(address,address,uint256,bytes32)": FunctionFragment;
    "withdrawFromBank(address,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "depositToBank",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAccountBankBalance",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "getAdmin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "hasAccountPermissions",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "setAdmin", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setBankOperator",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "settleTradeMargin",
    values: [
      [
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        },
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        }
      ],
      [string, string]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFromBank",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferToPerpetual",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFromBank",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "depositToBank",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAccountBankBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "hasAccountPermissions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setBankOperator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "settleTradeMargin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFromBank",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferToPerpetual",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFromBank",
    data: BytesLike
  ): Result;

  events: {
    "LogBankDeposit(address,uint256,uint256,uint256)": EventFragment;
    "LogBankTransferToPerpetual(address,address,uint256,uint256,uint256)": EventFragment;
    "LogBankWithdraw(address,address,uint256,uint256,uint256)": EventFragment;
    "LogSetMarginBankOperator(address,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "LogBankDeposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogBankTransferToPerpetual"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogBankWithdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogSetMarginBankOperator"): EventFragment;
}

export class MarginBank extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MarginBankInterface;

  functions: {
    depositToBank(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "depositToBank(address,uint256)"(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAccountBankBalance(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    "getAccountBankBalance(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getAdmin(overrides?: CallOverrides): Promise<[string]>;

    "getAdmin()"(overrides?: CallOverrides): Promise<[string]>;

    hasAccountPermissions(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "hasAccountPermissions(address,address)"(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    setAdmin(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setAdmin(address)"(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setBankOperator(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "setBankOperator(address,bool)"(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    settleTradeMargin(
      collat: [
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        },
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        }
      ],
      accounts: [string, string],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "settleTradeMargin(tuple[2],address[2])"(
      collat: [
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        },
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        }
      ],
      accounts: [string, string],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFromBank(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "transferFromBank(address,address,uint256)"(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferToPerpetual(
      perpetual: string,
      account: string,
      amount: BigNumberish,
      memo: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "transferToPerpetual(address,address,uint256,bytes32)"(
      perpetual: string,
      account: string,
      amount: BigNumberish,
      memo: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawFromBank(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "withdrawFromBank(address,address,uint256)"(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  depositToBank(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "depositToBank(address,uint256)"(
    account: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAccountBankBalance(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  "getAccountBankBalance(address)"(
    account: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getAdmin(overrides?: CallOverrides): Promise<string>;

  "getAdmin()"(overrides?: CallOverrides): Promise<string>;

  hasAccountPermissions(
    account: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "hasAccountPermissions(address,address)"(
    account: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  setAdmin(
    admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setAdmin(address)"(
    admin: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setBankOperator(
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "setBankOperator(address,bool)"(
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  settleTradeMargin(
    collat: [
      {
        flags: BigNumberish;
        collateral: BigNumberish;
        pnl: BigNumberish;
        fee: BigNumberish;
        openInterest: BigNumberish;
      },
      {
        flags: BigNumberish;
        collateral: BigNumberish;
        pnl: BigNumberish;
        fee: BigNumberish;
        openInterest: BigNumberish;
      }
    ],
    accounts: [string, string],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "settleTradeMargin(tuple[2],address[2])"(
    collat: [
      {
        flags: BigNumberish;
        collateral: BigNumberish;
        pnl: BigNumberish;
        fee: BigNumberish;
        openInterest: BigNumberish;
      },
      {
        flags: BigNumberish;
        collateral: BigNumberish;
        pnl: BigNumberish;
        fee: BigNumberish;
        openInterest: BigNumberish;
      }
    ],
    accounts: [string, string],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFromBank(
    account: string,
    destination: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "transferFromBank(address,address,uint256)"(
    account: string,
    destination: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferToPerpetual(
    perpetual: string,
    account: string,
    amount: BigNumberish,
    memo: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "transferToPerpetual(address,address,uint256,bytes32)"(
    perpetual: string,
    account: string,
    amount: BigNumberish,
    memo: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawFromBank(
    account: string,
    destination: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "withdrawFromBank(address,address,uint256)"(
    account: string,
    destination: string,
    amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    depositToBank(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "depositToBank(address,uint256)"(
      account: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getAccountBankBalance(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAccountBankBalance(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAdmin(overrides?: CallOverrides): Promise<string>;

    "getAdmin()"(overrides?: CallOverrides): Promise<string>;

    hasAccountPermissions(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "hasAccountPermissions(address,address)"(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setAdmin(admin: string, overrides?: CallOverrides): Promise<boolean>;

    "setAdmin(address)"(
      admin: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setBankOperator(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    "setBankOperator(address,bool)"(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    settleTradeMargin(
      collat: [
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        },
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        }
      ],
      accounts: [string, string],
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
          flags: BigNumber;
          collateral: BigNumber;
          pnl: BigNumber;
          fee: BigNumber;
          openInterest: BigNumber;
        },
        [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
          flags: BigNumber;
          collateral: BigNumber;
          pnl: BigNumber;
          fee: BigNumber;
          openInterest: BigNumber;
        }
      ]
    >;

    "settleTradeMargin(tuple[2],address[2])"(
      collat: [
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        },
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        }
      ],
      accounts: [string, string],
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
          flags: BigNumber;
          collateral: BigNumber;
          pnl: BigNumber;
          fee: BigNumber;
          openInterest: BigNumber;
        },
        [BigNumber, BigNumber, BigNumber, BigNumber, BigNumber] & {
          flags: BigNumber;
          collateral: BigNumber;
          pnl: BigNumber;
          fee: BigNumber;
          openInterest: BigNumber;
        }
      ]
    >;

    transferFromBank(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "transferFromBank(address,address,uint256)"(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferToPerpetual(
      perpetual: string,
      account: string,
      amount: BigNumberish,
      memo: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "transferToPerpetual(address,address,uint256,bytes32)"(
      perpetual: string,
      account: string,
      amount: BigNumberish,
      memo: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawFromBank(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "withdrawFromBank(address,address,uint256)"(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    LogBankDeposit(
      account: string | null,
      amount: null,
      balance: null,
      timestamp: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber, BigNumber],
      {
        account: string;
        amount: BigNumber;
        balance: BigNumber;
        timestamp: BigNumber;
      }
    >;

    LogBankTransferToPerpetual(
      account: string | null,
      destination: null,
      amount: null,
      balance: null,
      timestamp: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber, BigNumber],
      {
        account: string;
        destination: string;
        amount: BigNumber;
        balance: BigNumber;
        timestamp: BigNumber;
      }
    >;

    LogBankWithdraw(
      account: string | null,
      destination: null,
      amount: null,
      balance: null,
      timestamp: null
    ): TypedEventFilter<
      [string, string, BigNumber, BigNumber, BigNumber],
      {
        account: string;
        destination: string;
        amount: BigNumber;
        balance: BigNumber;
        timestamp: BigNumber;
      }
    >;

    LogSetMarginBankOperator(
      operator: null,
      approved: null
    ): TypedEventFilter<
      [string, boolean],
      { operator: string; approved: boolean }
    >;
  };

  estimateGas: {
    depositToBank(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "depositToBank(address,uint256)"(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAccountBankBalance(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getAccountBankBalance(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getAdmin(overrides?: CallOverrides): Promise<BigNumber>;

    "getAdmin()"(overrides?: CallOverrides): Promise<BigNumber>;

    hasAccountPermissions(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "hasAccountPermissions(address,address)"(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setAdmin(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setAdmin(address)"(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setBankOperator(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "setBankOperator(address,bool)"(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    settleTradeMargin(
      collat: [
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        },
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        }
      ],
      accounts: [string, string],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "settleTradeMargin(tuple[2],address[2])"(
      collat: [
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        },
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        }
      ],
      accounts: [string, string],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFromBank(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "transferFromBank(address,address,uint256)"(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferToPerpetual(
      perpetual: string,
      account: string,
      amount: BigNumberish,
      memo: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "transferToPerpetual(address,address,uint256,bytes32)"(
      perpetual: string,
      account: string,
      amount: BigNumberish,
      memo: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawFromBank(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "withdrawFromBank(address,address,uint256)"(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    depositToBank(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "depositToBank(address,uint256)"(
      account: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAccountBankBalance(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getAccountBankBalance(address)"(
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getAdmin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "getAdmin()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    hasAccountPermissions(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "hasAccountPermissions(address,address)"(
      account: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setAdmin(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setAdmin(address)"(
      admin: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setBankOperator(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "setBankOperator(address,bool)"(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    settleTradeMargin(
      collat: [
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        },
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        }
      ],
      accounts: [string, string],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "settleTradeMargin(tuple[2],address[2])"(
      collat: [
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        },
        {
          flags: BigNumberish;
          collateral: BigNumberish;
          pnl: BigNumberish;
          fee: BigNumberish;
          openInterest: BigNumberish;
        }
      ],
      accounts: [string, string],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFromBank(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "transferFromBank(address,address,uint256)"(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferToPerpetual(
      perpetual: string,
      account: string,
      amount: BigNumberish,
      memo: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "transferToPerpetual(address,address,uint256,bytes32)"(
      perpetual: string,
      account: string,
      amount: BigNumberish,
      memo: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFromBank(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "withdrawFromBank(address,address,uint256)"(
      account: string,
      destination: string,
      amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}