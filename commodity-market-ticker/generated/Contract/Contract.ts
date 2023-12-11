// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ChainlinkCancelled extends ethereum.Event {
  get params(): ChainlinkCancelled__Params {
    return new ChainlinkCancelled__Params(this);
  }
}

export class ChainlinkCancelled__Params {
  _event: ChainlinkCancelled;

  constructor(event: ChainlinkCancelled) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class ChainlinkFulfilled extends ethereum.Event {
  get params(): ChainlinkFulfilled__Params {
    return new ChainlinkFulfilled__Params(this);
  }
}

export class ChainlinkFulfilled__Params {
  _event: ChainlinkFulfilled;

  constructor(event: ChainlinkFulfilled) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class ChainlinkRequested extends ethereum.Event {
  get params(): ChainlinkRequested__Params {
    return new ChainlinkRequested__Params(this);
  }
}

export class ChainlinkRequested__Params {
  _event: ChainlinkRequested;

  constructor(event: ChainlinkRequested) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class CommodityCreated extends ethereum.Event {
  get params(): CommodityCreated__Params {
    return new CommodityCreated__Params(this);
  }
}

export class CommodityCreated__Params {
  _event: CommodityCreated;

  constructor(event: CommodityCreated) {
    this._event = event;
  }

  get comId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }

  get symbol(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class OrderMatched extends ethereum.Event {
  get params(): OrderMatched__Params {
    return new OrderMatched__Params(this);
  }
}

export class OrderMatched__Params {
  _event: OrderMatched;

  constructor(event: OrderMatched) {
    this._event = event;
  }

  get matchedOrderId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get buyer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get price(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class OrderPlaced extends ethereum.Event {
  get params(): OrderPlaced__Params {
    return new OrderPlaced__Params(this);
  }
}

export class OrderPlaced__Params {
  _event: OrderPlaced;

  constructor(event: OrderPlaced) {
    this._event = event;
  }

  get orderId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get commodityId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get region(): string {
    return this._event.parameters[3].value.toString();
  }

  get country(): string {
    return this._event.parameters[4].value.toString();
  }

  get amount(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get price(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }

  get currency(): string {
    return this._event.parameters[7].value.toString();
  }

  get harvestDate(): BigInt {
    return this._event.parameters[8].value.toBigInt();
  }

  get validityPeriod(): BigInt {
    return this._event.parameters[9].value.toBigInt();
  }

  get isBuyOrder(): boolean {
    return this._event.parameters[10].value.toBoolean();
  }
}

export class OwnershipTransferRequested extends ethereum.Event {
  get params(): OwnershipTransferRequested__Params {
    return new OwnershipTransferRequested__Params(this);
  }
}

export class OwnershipTransferRequested__Params {
  _event: OwnershipTransferRequested;

  constructor(event: OwnershipTransferRequested) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class RequestEthereumPriceFulfilled extends ethereum.Event {
  get params(): RequestEthereumPriceFulfilled__Params {
    return new RequestEthereumPriceFulfilled__Params(this);
  }
}

export class RequestEthereumPriceFulfilled__Params {
  _event: RequestEthereumPriceFulfilled;

  constructor(event: RequestEthereumPriceFulfilled) {
    this._event = event;
  }

  get requestId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get price(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class UIDAssigned extends ethereum.Event {
  get params(): UIDAssigned__Params {
    return new UIDAssigned__Params(this);
  }
}

export class UIDAssigned__Params {
  _event: UIDAssigned;

  constructor(event: UIDAssigned) {
    this._event = event;
  }

  get userAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get uid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class UserEvent extends ethereum.Event {
  get params(): UserEvent__Params {
    return new UserEvent__Params(this);
  }
}

export class UserEvent__Params {
  _event: UserEvent;

  constructor(event: UserEvent) {
    this._event = event;
  }

  get userAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get name(): string {
    return this._event.parameters[1].value.toString();
  }

  get userType(): string {
    return this._event.parameters[2].value.toString();
  }

  get location(): string {
    return this._event.parameters[3].value.toString();
  }

  get verificationStatus(): boolean {
    return this._event.parameters[4].value.toBoolean();
  }

  get uid(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class Contract__s_requestsResult {
  value0: boolean;
  value1: boolean;

  constructor(value0: boolean, value1: boolean) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromBoolean(this.value1));
    return map;
  }

  getFulfilled(): boolean {
    return this.value0;
  }

  getExists(): boolean {
    return this.value1;
  }
}

export class Contract extends ethereum.SmartContract {
  static bind(address: Address): Contract {
    return new Contract("Contract", address);
  }

  commodities(param0: string): BigInt {
    let result = super.call("commodities", "commodities(string):(uint256)", [
      ethereum.Value.fromString(param0)
    ]);

    return result[0].toBigInt();
  }

  try_commodities(param0: string): ethereum.CallResult<BigInt> {
    let result = super.tryCall("commodities", "commodities(string):(uint256)", [
      ethereum.Value.fromString(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  commodityContract(): Address {
    let result = super.call(
      "commodityContract",
      "commodityContract():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_commodityContract(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "commodityContract",
      "commodityContract():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  currentPrice(): BigInt {
    let result = super.call("currentPrice", "currentPrice():(uint256)", []);

    return result[0].toBigInt();
  }

  try_currentPrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("currentPrice", "currentPrice():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  registerUser(
    name: string,
    userType: string,
    location: string,
    verificationStatus: boolean
  ): BigInt {
    let result = super.call(
      "registerUser",
      "registerUser(string,string,string,bool):(uint256)",
      [
        ethereum.Value.fromString(name),
        ethereum.Value.fromString(userType),
        ethereum.Value.fromString(location),
        ethereum.Value.fromBoolean(verificationStatus)
      ]
    );

    return result[0].toBigInt();
  }

  try_registerUser(
    name: string,
    userType: string,
    location: string,
    verificationStatus: boolean
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "registerUser",
      "registerUser(string,string,string,bool):(uint256)",
      [
        ethereum.Value.fromString(name),
        ethereum.Value.fromString(userType),
        ethereum.Value.fromString(location),
        ethereum.Value.fromBoolean(verificationStatus)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  s_requests(param0: BigInt): Contract__s_requestsResult {
    let result = super.call("s_requests", "s_requests(uint256):(bool,bool)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return new Contract__s_requestsResult(
      result[0].toBoolean(),
      result[1].toBoolean()
    );
  }

  try_s_requests(
    param0: BigInt
  ): ethereum.CallResult<Contract__s_requestsResult> {
    let result = super.tryCall(
      "s_requests",
      "s_requests(uint256):(bool,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Contract__s_requestsResult(value[0].toBoolean(), value[1].toBoolean())
    );
  }

  userToken(): Address {
    let result = super.call("userToken", "userToken():(address)", []);

    return result[0].toAddress();
  }

  try_userToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("userToken", "userToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get subscriptionId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AcceptOwnershipCall extends ethereum.Call {
  get inputs(): AcceptOwnershipCall__Inputs {
    return new AcceptOwnershipCall__Inputs(this);
  }

  get outputs(): AcceptOwnershipCall__Outputs {
    return new AcceptOwnershipCall__Outputs(this);
  }
}

export class AcceptOwnershipCall__Inputs {
  _call: AcceptOwnershipCall;

  constructor(call: AcceptOwnershipCall) {
    this._call = call;
  }
}

export class AcceptOwnershipCall__Outputs {
  _call: AcceptOwnershipCall;

  constructor(call: AcceptOwnershipCall) {
    this._call = call;
  }
}

export class CreateCommodityCall extends ethereum.Call {
  get inputs(): CreateCommodityCall__Inputs {
    return new CreateCommodityCall__Inputs(this);
  }

  get outputs(): CreateCommodityCall__Outputs {
    return new CreateCommodityCall__Outputs(this);
  }
}

export class CreateCommodityCall__Inputs {
  _call: CreateCommodityCall;

  constructor(call: CreateCommodityCall) {
    this._call = call;
  }

  get name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get symbol(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class CreateCommodityCall__Outputs {
  _call: CreateCommodityCall;

  constructor(call: CreateCommodityCall) {
    this._call = call;
  }
}

export class FulfillUgxPriceCall extends ethereum.Call {
  get inputs(): FulfillUgxPriceCall__Inputs {
    return new FulfillUgxPriceCall__Inputs(this);
  }

  get outputs(): FulfillUgxPriceCall__Outputs {
    return new FulfillUgxPriceCall__Outputs(this);
  }
}

export class FulfillUgxPriceCall__Inputs {
  _call: FulfillUgxPriceCall;

  constructor(call: FulfillUgxPriceCall) {
    this._call = call;
  }

  get _requestId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _price(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class FulfillUgxPriceCall__Outputs {
  _call: FulfillUgxPriceCall;

  constructor(call: FulfillUgxPriceCall) {
    this._call = call;
  }
}

export class MatchOrderCall extends ethereum.Call {
  get inputs(): MatchOrderCall__Inputs {
    return new MatchOrderCall__Inputs(this);
  }

  get outputs(): MatchOrderCall__Outputs {
    return new MatchOrderCall__Outputs(this);
  }
}

export class MatchOrderCall__Inputs {
  _call: MatchOrderCall;

  constructor(call: MatchOrderCall) {
    this._call = call;
  }

  get orderId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get symbolCommodity(): string {
    return this._call.inputValues[1].value.toString();
  }

  get amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get price(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get currency(): string {
    return this._call.inputValues[4].value.toString();
  }
}

export class MatchOrderCall__Outputs {
  _call: MatchOrderCall;

  constructor(call: MatchOrderCall) {
    this._call = call;
  }
}

export class PlaceOrderCall extends ethereum.Call {
  get inputs(): PlaceOrderCall__Inputs {
    return new PlaceOrderCall__Inputs(this);
  }

  get outputs(): PlaceOrderCall__Outputs {
    return new PlaceOrderCall__Outputs(this);
  }
}

export class PlaceOrderCall__Inputs {
  _call: PlaceOrderCall;

  constructor(call: PlaceOrderCall) {
    this._call = call;
  }

  get symbolCommodity(): string {
    return this._call.inputValues[0].value.toString();
  }

  get region(): string {
    return this._call.inputValues[1].value.toString();
  }

  get country(): string {
    return this._call.inputValues[2].value.toString();
  }

  get amount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get price(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get currency(): string {
    return this._call.inputValues[5].value.toString();
  }

  get harvestDate(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }

  get validityPeriod(): BigInt {
    return this._call.inputValues[7].value.toBigInt();
  }

  get isBuyOrder(): boolean {
    return this._call.inputValues[8].value.toBoolean();
  }
}

export class PlaceOrderCall__Outputs {
  _call: PlaceOrderCall;

  constructor(call: PlaceOrderCall) {
    this._call = call;
  }
}

export class RawFulfillRandomWordsCall extends ethereum.Call {
  get inputs(): RawFulfillRandomWordsCall__Inputs {
    return new RawFulfillRandomWordsCall__Inputs(this);
  }

  get outputs(): RawFulfillRandomWordsCall__Outputs {
    return new RawFulfillRandomWordsCall__Outputs(this);
  }
}

export class RawFulfillRandomWordsCall__Inputs {
  _call: RawFulfillRandomWordsCall;

  constructor(call: RawFulfillRandomWordsCall) {
    this._call = call;
  }

  get requestId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get randomWords(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }
}

export class RawFulfillRandomWordsCall__Outputs {
  _call: RawFulfillRandomWordsCall;

  constructor(call: RawFulfillRandomWordsCall) {
    this._call = call;
  }
}

export class RegisterUserCall extends ethereum.Call {
  get inputs(): RegisterUserCall__Inputs {
    return new RegisterUserCall__Inputs(this);
  }

  get outputs(): RegisterUserCall__Outputs {
    return new RegisterUserCall__Outputs(this);
  }
}

export class RegisterUserCall__Inputs {
  _call: RegisterUserCall;

  constructor(call: RegisterUserCall) {
    this._call = call;
  }

  get name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get userType(): string {
    return this._call.inputValues[1].value.toString();
  }

  get location(): string {
    return this._call.inputValues[2].value.toString();
  }

  get verificationStatus(): boolean {
    return this._call.inputValues[3].value.toBoolean();
  }
}

export class RegisterUserCall__Outputs {
  _call: RegisterUserCall;

  constructor(call: RegisterUserCall) {
    this._call = call;
  }

  get requestId(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RequestUgxPriceCall extends ethereum.Call {
  get inputs(): RequestUgxPriceCall__Inputs {
    return new RequestUgxPriceCall__Inputs(this);
  }

  get outputs(): RequestUgxPriceCall__Outputs {
    return new RequestUgxPriceCall__Outputs(this);
  }
}

export class RequestUgxPriceCall__Inputs {
  _call: RequestUgxPriceCall;

  constructor(call: RequestUgxPriceCall) {
    this._call = call;
  }

  get _oracle(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _jobId(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class RequestUgxPriceCall__Outputs {
  _call: RequestUgxPriceCall;

  constructor(call: RequestUgxPriceCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}