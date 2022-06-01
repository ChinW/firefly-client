/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { FundingOracle } from "../FundingOracle";

export class FundingOracle__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    fundingRateProvider: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<FundingOracle> {
    return super.deploy(
      fundingRateProvider,
      overrides || {}
    ) as Promise<FundingOracle>;
  }
  getDeployTransaction(
    fundingRateProvider: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(fundingRateProvider, overrides || {});
  }
  attach(address: string): FundingOracle {
    return super.attach(address) as FundingOracle;
  }
  connect(signer: Signer): FundingOracle__factory {
    return super.connect(signer) as FundingOracle__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FundingOracle {
    return new Contract(address, _abi, signerOrProvider) as FundingOracle;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "fundingRateProvider",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "fundingRateProvider",
        type: "address",
      },
    ],
    name: "LogFundingRateProviderSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "fundingWindow",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fundingSlot",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tradesCount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "aggTradePrice",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "aggOraclePrice",
        type: "uint256",
      },
    ],
    name: "LogFundingRateTradeRecorded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "fundingRate",
        type: "bytes32",
      },
    ],
    name: "LogFundingRateUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "FUNDING_RATE_SLOT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FUNDING_RATE_WINDOW",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_ABS_DIFF_PER_SECOND",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_ABS_VALUE",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_DEPLOYED_TIMESTAMP_",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_FUNDING_RATE_PROVIDER_",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fundingWindow",
        type: "uint256",
      },
    ],
    name: "calculateFundingRate",
    outputs: [
      {
        internalType: "uint256",
        name: "avgTradePrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "avgOraclePrice",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isPositive",
            type: "bool",
          },
        ],
        internalType: "struct SignedMath.Int",
        name: "newFundingRate",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentFundingSlot",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentFundingWindow",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timeDelta",
        type: "uint256",
      },
    ],
    name: "getFunding",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tradePrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "oraclePrice",
        type: "uint256",
      },
    ],
    name: "recordOrderTrade",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setFundingRate",
    outputs: [
      {
        components: [
          {
            internalType: "uint32",
            name: "timestamp",
            type: "uint32",
          },
          {
            internalType: "bool",
            name: "isPositive",
            type: "bool",
          },
          {
            internalType: "uint128",
            name: "value",
            type: "uint128",
          },
        ],
        internalType: "struct Types.Index",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newProvider",
        type: "address",
      },
    ],
    name: "setFundingRateProvider",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200158a3803806200158a833981016040819052620000349162000380565b60006200004062000214565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a3506200009462000360565b6040518060600160405280620000b5426200021860201b6200092a1760201c565b63ffffffff908116825260016020808401829052600060409485015284518254868301519587015163ffffffff19909116919094161760ff60201b19166401000000009415159490940293909317600160281b600160a81b031916650100000000006001600160801b0390931692909202919091179055600280546001600160a01b0319166001600160a01b0386161790559091506200017f90610e10906200016b90429083906200024e811b6200095817901c565b620002b960201b620009c11790919060201c565b6003819055507f2ebf65220b5046a8d9cff102710ef15de0a0bf3709dcc11c3af50abe472e1c22620001bc826200031e60201b62000a211760201c565b604051620001cb9190620003bd565b60405180910390a17f232d43841005a98dbf929d234a7a8d2c4c570becee067c9c81bcd4e0acd0ab9282604051620002049190620003a9565b60405180910390a150506200040c565b3390565b600064010000000082106200024a5760405162461bcd60e51b81526004016200024190620003c6565b60405180910390fd5b5090565b6000808211620002a5576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b818381620002af57fe5b0490505b92915050565b600082620002ca57506000620002b3565b82820282848281620002d857fe5b0414620003175760405162461bcd60e51b8152600401808060200182810382526021815260200180620015696021913960400191505060405180910390fd5b9392505050565b6000806088836000015163ffffffff16901b83602001516200034257600062000348565b600160801b5b60408501516001600160801b03161717915050919050565b604080516060810182526000808252602082018190529181019190915290565b60006020828403121562000392578081fd5b81516001600160a01b038116811462000317578182fd5b6001600160a01b0391909116815260200190565b90815260200190565b60208082526026908201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360408201526532206269747360d01b606082015260800190565b61114d806200041c6000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c8063715018a611610097578063d6dc815b11610066578063d6dc815b146101c7578063ea1f3acb146101dc578063ebed4bd4146101e4578063f2fde38b1461020557610100565b8063715018a6146101825780638da5cb5b1461018a578063bb81308314610192578063c779c55b146101b457610100565b8063234a2ff1116100d3578063234a2ff114610155578063499c9c6d1461015d5780634a1abee31461017257806356a281ea1461017a57610100565b80630b8781ee14610105578063109f60e314610123578063110cb1191461013857806318da5aa91461014d575b600080fd5b61010d610218565b60405161011a9190610edf565b60405180910390f35b610136610131366004610e7f565b610227565b005b6101406102f1565b60405161011a9190610f03565b6101406102f6565b6101406102fc565b610165610339565b60405161011a9190611077565b61014061034a565b610165610371565b61013661037f565b61010d61043d565b6101a56101a0366004610ea6565b61044c565b60405161011a9392919061108b565b6101366101c2366004610ebe565b610546565b6101cf610635565b60405161011a9190611045565b61014061079f565b6101f76101f2366004610ea6565b6107a5565b60405161011a929190610ef3565b610136610213366004610e7f565b610816565b6002546001600160a01b031681565b61022f610a61565b6001600160a01b031661024061043d565b6001600160a01b03161461029b576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600280546001600160a01b0319166001600160a01b0383161790556040517f232d43841005a98dbf929d234a7a8d2c4c570becee067c9c81bcd4e0acd0ab92906102e6908390610edf565b60405180910390a150565b603c81565b60035481565b600060035442101561030f576000610334565b610330610e1061032a60035442610a6590919063ffffffff16565b90610958565b6001015b905090565b62015180665543df729c00005b0481565b6000610334603c61032a61036a610e106103644282610958565b906109c1565b4290610a65565b610a8c648159b108e2610346565b610387610a61565b6001600160a01b031661039861043d565b6001600160a01b0316146103f3576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b600080610457610e48565b6000848152600760205260408120600554600654919291829190825b603c8110156104df5760008181526020879052604090206002810154156104be57600281015460018201546104a791610958565b600282015482549195506104bb9190610958565b92505b6104c88685610ac2565b95506104d48584610ac2565b945050600101610473565b5060408051808201909152848152600160208201526104fe9084610b1c565b80519096501561052057855161051d90620151809061032a9086610bc5565b86525b61052b84603c610958565b61053684603c610958565b9750975050505050509193909250565b6002546001600160a01b031633146105795760405162461bcd60e51b815260040161057090610f53565b60405180910390fd5b60006105836102fc565b9050600061058f61034a565b600083815260076020908152604080832084845290915290206001810154919250906105bb9086610ac2565b60018083019190915560028201546105d291610ac2565b600282015580546105e39085610ac2565b808255600282015460018301546040517fc756ecf37535eb7ceb8d9cceb98d3856c3ebb6eb5077702fba0ed0909b70d444936106269388938893919290916110ad565b60405180910390a15050505050565b61063d610e5f565b60006106476102fc565b9050806004541061066a5760405162461bcd60e51b815260040161057090610fb0565b6004819055610677610e48565b6106836001830361044c565b6006919091556005919091559050610699610e48565b6106a282610bdd565b90506106ac610e5f565b60405180606001604052806106c04261092a565b63ffffffff1681526020018360200151151581526020016106e48460000151610d23565b6001600160801b0390811690915281516001805460208501516040860151909416650100000000000274ffffffffffffffffffffffffffffffff0000000000199415156401000000000264ff000000001963ffffffff90951663ffffffff199093169290921793909316179290921617905590507f2ebf65220b5046a8d9cff102710ef15de0a0bf3709dcc11c3af50abe472e1c2261078282610a21565b60405161078f9190610f03565b60405180910390a1935050505090565b610e1081565b6000806107b0610e5f565b506040805160608101825260015463ffffffff8082168352640100000000820460ff1615156020840152650100000000009091046001600160801b03169282018390529091600091610805919087906109c116565b602090920151935090915050915091565b61081e610a61565b6001600160a01b031661082f61043d565b6001600160a01b03161461088a576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b0381166108cf5760405162461bcd60e51b81526004018080602001828103825260268152602001806110d16026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b600064010000000082106109505760405162461bcd60e51b815260040161057090610fff565b50805b919050565b60008082116109ae576040805162461bcd60e51b815260206004820152601a60248201527f536166654d6174683a206469766973696f6e206279207a65726f000000000000604482015290519081900360640190fd5b8183816109b757fe5b0490505b92915050565b6000826109d0575060006109bb565b828202828482816109dd57fe5b0414610a1a5760405162461bcd60e51b81526004018080602001828103825260218152602001806110f76021913960400191505060405180910390fd5b9392505050565b6000806088836000015163ffffffff16901b8360200151610a43576000610a49565b600160801b5b60408501516001600160801b03161717915050919050565b3390565b600082821115610abc576040805162461bcd60e51b815260206004820152601e60248201527f536166654d6174683a207375627472616374696f6e206f766572666c6f770000604482015290519081900360640190fd5b50900390565b600082820183811015610a1a576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b610b24610e48565b8260200151610b60576040518060400160405280610b4f856000015185610ac290919063ffffffff16565b8152600060209091015290506109bb565b8251821015610b92576040805180820190915283518190610b819085610a65565b8152600160209091015290506109bb565b6040518060400160405280610bb4856000015185610a6590919063ffffffff16565b815260006020909101529392505050565b6000610a1a8261032a85670de0b6b3a76400006109c1565b610be5610e48565b610bed610e5f565b506040805160608101825260015463ffffffff81168252640100000000810460ff16151560208301526501000000000090046001600160801b031691810191909152610c37610e48565b50604080518082018252908201516001600160801b031681526020808301511515908201528151600090610c7690429063ffffffff90811690610a6516565b90506000610c88630c43ab24836109c1565b9050610c948684610d48565b15610ce457610ca1610e48565b610ccc610cae8584610d9c565b604080518082019091526440acd88471815260016020820152610e13565b9050610cd88782610e13565b95505050505050610953565b610cec610e48565b610d17610cf98584610b1c565b604080518082019091526440acd88471815260006020820152610e36565b9050610cd88782610e36565b6000600160801b82106109505760405162461bcd60e51b815260040161057090610f0c565b6000826020015115610d7f57816020015115610d69575080518251116109bb565b8251151580610d785750815115155b90506109bb565b816020015115610d91575060006109bb565b5080518251106109bb565b610da4610e48565b826020015115610dd0576040518060400160405280610b81856000015185610ac290919063ffffffff16565b8251821115610dfb576040518060400160405280610b81856000015185610a6590919063ffffffff16565b6040805180820190915283518190610bb49085610a65565b610e1b610e48565b610e258284610d48565b610e2f5781610a1a565b5090919050565b610e3e610e48565b610e258383610d48565b604080518082019091526000808252602082015290565b604080516060810182526000808252602082018190529181019190915290565b600060208284031215610e90578081fd5b81356001600160a01b0381168114610a1a578182fd5b600060208284031215610eb7578081fd5b5035919050565b60008060408385031215610ed0578081fd5b50508035926020909101359150565b6001600160a01b0391909116815260200190565b9115158252602082015260400190565b90815260200190565b60208082526027908201527f53616665436173743a2076616c756520646f65736e27742066697420696e20316040820152663238206269747360c81b606082015260800190565b6020808252603d908201527f5468652066756e64696e6720726174652063616e206f6e6c792062652073657460408201527f206279207468652066756e64696e6720726174652070726f7669646572000000606082015260800190565b6020808252602f908201527f46756e64696e67207261746520616c72656164792063616c63756c617465642060408201526e666f7220746869732077696e646f7760881b606082015260800190565b60208082526026908201527f53616665436173743a2076616c756520646f65736e27742066697420696e203360408201526532206269747360d01b606082015260800190565b815163ffffffff1681526020808301511515908201526040918201516001600160801b03169181019190915260600190565b6001600160801b0391909116815260200190565b9283526020808401929092528051604084015201511515606082015260800190565b948552602085019390935260408401919091526060830152608082015260a0019056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77a26469706673582212208032dc3fa5188b634dfa9a7f60b4ba6888157cca161304b6d7f331b557e7840c64736f6c63430007050033536166654d6174683a206d756c7469706c69636174696f6e206f766572666c6f77";