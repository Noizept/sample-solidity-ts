/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SimpleStorage, SimpleStorageInterface } from "../SimpleStorage";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_favoriteNumber",
        type: "uint256",
      },
    ],
    name: "addPerson",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "nameToFavoriteNumber",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "people",
    outputs: [
      {
        internalType: "uint256",
        name: "favoriteNumber",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "retrieve",
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
        name: "_favoriteNumber",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610741806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100965780638bab8dd5146100b25780639e7a13ad146100e2575b600080fd5b610064610113565b604051610071919061050e565b60405180910390f35b610094600480360381019061008f9190610455565b61011c565b005b6100b060048036038101906100ab9190610401565b610126565b005b6100cc60048036038101906100c791906103c0565b6101b6565b6040516100d9919061050e565b60405180910390f35b6100fc60048036038101906100f79190610455565b6101e4565b60405161010a929190610529565b60405180910390f35b60008054905090565b8060008190555050565b6001604051806040016040528083815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908051906020019061018c9291906102a0565b505050806002836040516101a091906104f7565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600181815481106101f457600080fd5b906000526020600020906002020160009150905080600001549080600101805461021d90610622565b80601f016020809104026020016040519081016040528092919081815260200182805461024990610622565b80156102965780601f1061026b57610100808354040283529160200191610296565b820191906000526020600020905b81548152906001019060200180831161027957829003601f168201915b5050505050905082565b8280546102ac90610622565b90600052602060002090601f0160209004810192826102ce5760008555610315565b82601f106102e757805160ff1916838001178555610315565b82800160010185558215610315579182015b828111156103145782518255916020019190600101906102f9565b5b5090506103229190610326565b5090565b5b8082111561033f576000816000905550600101610327565b5090565b60006103566103518461057e565b610559565b90508281526020810184848401111561036e57600080fd5b6103798482856105e0565b509392505050565b600082601f83011261039257600080fd5b81356103a2848260208601610343565b91505092915050565b6000813590506103ba816106f4565b92915050565b6000602082840312156103d257600080fd5b600082013567ffffffffffffffff8111156103ec57600080fd5b6103f884828501610381565b91505092915050565b6000806040838503121561041457600080fd5b600083013567ffffffffffffffff81111561042e57600080fd5b61043a85828601610381565b925050602061044b858286016103ab565b9150509250929050565b60006020828403121561046757600080fd5b6000610475848285016103ab565b91505092915050565b6000610489826105af565b61049381856105ba565b93506104a38185602086016105ef565b6104ac816106e3565b840191505092915050565b60006104c2826105af565b6104cc81856105cb565b93506104dc8185602086016105ef565b80840191505092915050565b6104f1816105d6565b82525050565b600061050382846104b7565b915081905092915050565b600060208201905061052360008301846104e8565b92915050565b600060408201905061053e60008301856104e8565b8181036020830152610550818461047e565b90509392505050565b6000610563610574565b905061056f8282610654565b919050565b6000604051905090565b600067ffffffffffffffff821115610599576105986106b4565b5b6105a2826106e3565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561060d5780820151818401526020810190506105f2565b8381111561061c576000848401525b50505050565b6000600282049050600182168061063a57607f821691505b6020821081141561064e5761064d610685565b5b50919050565b61065d826106e3565b810181811067ffffffffffffffff8211171561067c5761067b6106b4565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6106fd816105d6565b811461070857600080fd5b5056fea26469706673582212206c348347ffadd67abd99059f4fb6926c7e22a44a961d3b41ed8fd1ecda6d098a64736f6c63430008040033";

export class SimpleStorage__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SimpleStorage> {
    return super.deploy(overrides || {}) as Promise<SimpleStorage>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SimpleStorage {
    return super.attach(address) as SimpleStorage;
  }
  connect(signer: Signer): SimpleStorage__factory {
    return super.connect(signer) as SimpleStorage__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SimpleStorageInterface {
    return new utils.Interface(_abi) as SimpleStorageInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SimpleStorage {
    return new Contract(address, _abi, signerOrProvider) as SimpleStorage;
  }
}
