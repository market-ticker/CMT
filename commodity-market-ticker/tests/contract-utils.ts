import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ChainlinkCancelled,
  ChainlinkFulfilled,
  ChainlinkRequested,
  CommodityCreated,
  OrderMatched,
  OrderPlaced,
  OwnershipTransferRequested,
  OwnershipTransferred,
  RequestEthereumPriceFulfilled,
  UIDAssigned,
  UserEvent
} from "../generated/Contract/Contract"

export function createChainlinkCancelledEvent(id: Bytes): ChainlinkCancelled {
  let chainlinkCancelledEvent = changetype<ChainlinkCancelled>(newMockEvent())

  chainlinkCancelledEvent.parameters = new Array()

  chainlinkCancelledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return chainlinkCancelledEvent
}

export function createChainlinkFulfilledEvent(id: Bytes): ChainlinkFulfilled {
  let chainlinkFulfilledEvent = changetype<ChainlinkFulfilled>(newMockEvent())

  chainlinkFulfilledEvent.parameters = new Array()

  chainlinkFulfilledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return chainlinkFulfilledEvent
}

export function createChainlinkRequestedEvent(id: Bytes): ChainlinkRequested {
  let chainlinkRequestedEvent = changetype<ChainlinkRequested>(newMockEvent())

  chainlinkRequestedEvent.parameters = new Array()

  chainlinkRequestedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return chainlinkRequestedEvent
}

export function createCommodityCreatedEvent(
  comId: BigInt,
  name: string,
  symbol: string
): CommodityCreated {
  let commodityCreatedEvent = changetype<CommodityCreated>(newMockEvent())

  commodityCreatedEvent.parameters = new Array()

  commodityCreatedEvent.parameters.push(
    new ethereum.EventParam("comId", ethereum.Value.fromUnsignedBigInt(comId))
  )
  commodityCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  commodityCreatedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )

  return commodityCreatedEvent
}

export function createOrderMatchedEvent(
  matchedOrderId: BigInt,
  buyer: Address,
  price: BigInt
): OrderMatched {
  let orderMatchedEvent = changetype<OrderMatched>(newMockEvent())

  orderMatchedEvent.parameters = new Array()

  orderMatchedEvent.parameters.push(
    new ethereum.EventParam(
      "matchedOrderId",
      ethereum.Value.fromUnsignedBigInt(matchedOrderId)
    )
  )
  orderMatchedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  orderMatchedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return orderMatchedEvent
}

export function createOrderPlacedEvent(
  orderId: BigInt,
  owner: Address,
  commodityId: BigInt,
  region: string,
  country: string,
  amount: BigInt,
  price: BigInt,
  currency: string,
  harvestDate: BigInt,
  validityPeriod: BigInt,
  isBuyOrder: boolean
): OrderPlaced {
  let orderPlacedEvent = changetype<OrderPlaced>(newMockEvent())

  orderPlacedEvent.parameters = new Array()

  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "commodityId",
      ethereum.Value.fromUnsignedBigInt(commodityId)
    )
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("region", ethereum.Value.fromString(region))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("country", ethereum.Value.fromString(country))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("currency", ethereum.Value.fromString(currency))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "harvestDate",
      ethereum.Value.fromUnsignedBigInt(harvestDate)
    )
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "validityPeriod",
      ethereum.Value.fromUnsignedBigInt(validityPeriod)
    )
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "isBuyOrder",
      ethereum.Value.fromBoolean(isBuyOrder)
    )
  )

  return orderPlacedEvent
}

export function createOwnershipTransferRequestedEvent(
  from: Address,
  to: Address
): OwnershipTransferRequested {
  let ownershipTransferRequestedEvent = changetype<OwnershipTransferRequested>(
    newMockEvent()
  )

  ownershipTransferRequestedEvent.parameters = new Array()

  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferRequestedEvent
}

export function createOwnershipTransferredEvent(
  from: Address,
  to: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferredEvent
}

export function createRequestEthereumPriceFulfilledEvent(
  requestId: Bytes,
  price: BigInt
): RequestEthereumPriceFulfilled {
  let requestEthereumPriceFulfilledEvent = changetype<
    RequestEthereumPriceFulfilled
  >(newMockEvent())

  requestEthereumPriceFulfilledEvent.parameters = new Array()

  requestEthereumPriceFulfilledEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromFixedBytes(requestId)
    )
  )
  requestEthereumPriceFulfilledEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return requestEthereumPriceFulfilledEvent
}

export function createUIDAssignedEvent(
  userAddress: Address,
  uid: BigInt
): UIDAssigned {
  let uidAssignedEvent = changetype<UIDAssigned>(newMockEvent())

  uidAssignedEvent.parameters = new Array()

  uidAssignedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  uidAssignedEvent.parameters.push(
    new ethereum.EventParam("uid", ethereum.Value.fromUnsignedBigInt(uid))
  )

  return uidAssignedEvent
}

export function createUserEventEvent(
  userAddress: Address,
  name: string,
  userType: string,
  location: string,
  verificationStatus: boolean,
  uid: BigInt
): UserEvent {
  let userEventEvent = changetype<UserEvent>(newMockEvent())

  userEventEvent.parameters = new Array()

  userEventEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  userEventEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  userEventEvent.parameters.push(
    new ethereum.EventParam("userType", ethereum.Value.fromString(userType))
  )
  userEventEvent.parameters.push(
    new ethereum.EventParam("location", ethereum.Value.fromString(location))
  )
  userEventEvent.parameters.push(
    new ethereum.EventParam(
      "verificationStatus",
      ethereum.Value.fromBoolean(verificationStatus)
    )
  )
  userEventEvent.parameters.push(
    new ethereum.EventParam("uid", ethereum.Value.fromUnsignedBigInt(uid))
  )

  return userEventEvent
}
