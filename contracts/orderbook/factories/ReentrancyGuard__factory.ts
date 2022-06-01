/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { ReentrancyGuard } from "../ReentrancyGuard";

export class ReentrancyGuard__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ReentrancyGuard> {
    return super.deploy(overrides || {}) as Promise<ReentrancyGuard>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ReentrancyGuard {
    return super.attach(address) as ReentrancyGuard;
  }
  connect(signer: Signer): ReentrancyGuard__factory {
    return super.connect(signer) as ReentrancyGuard__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReentrancyGuard {
    return new Contract(address, _abi, signerOrProvider) as ReentrancyGuard;
  }
}

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b506001600055603f8060226000396000f3fe6080604052600080fdfea26469706673582212204cd62a5d8813b90030c5794caaf81f1f7d60c0d0916e023676b348642c457e8364736f6c63430007050033";