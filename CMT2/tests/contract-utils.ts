import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CommodityCreated,
  OrderMatched,
  OrderPlaced,
  OrderRemoved
} from "../generated/Contract/Contract"

export function createCommodityCreatedEvent(
  token: Address,
  name: string,
  symbol: string
): CommodityCreated {
  let commodityCreatedEvent = changetype<CommodityCreated>(newMockEvent())

  commodityCreatedEvent.parameters = new Array()

  commodityCreatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
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
  buyOrderId: BigInt,
  sellOrderId: BigInt,
  matchedAmount: BigInt,
  matchedPrice: BigInt
): OrderMatched {
  let orderMatchedEvent = changetype<OrderMatched>(newMockEvent())

  orderMatchedEvent.parameters = new Array()

  orderMatchedEvent.parameters.push(
    new ethereum.EventParam(
      "buyOrderId",
      ethereum.Value.fromUnsignedBigInt(buyOrderId)
    )
  )
  orderMatchedEvent.parameters.push(
    new ethereum.EventParam(
      "sellOrderId",
      ethereum.Value.fromUnsignedBigInt(sellOrderId)
    )
  )
  orderMatchedEvent.parameters.push(
    new ethereum.EventParam(
      "matchedAmount",
      ethereum.Value.fromUnsignedBigInt(matchedAmount)
    )
  )
  orderMatchedEvent.parameters.push(
    new ethereum.EventParam(
      "matchedPrice",
      ethereum.Value.fromUnsignedBigInt(matchedPrice)
    )
  )

  return orderMatchedEvent
}

export function createOrderPlacedEvent(
  id: BigInt,
  user: Address,
  amount: BigInt,
  price: BigInt,
  isBuyOrder: boolean
): OrderPlaced {
  let orderPlacedEvent = changetype<OrderPlaced>(newMockEvent())

  orderPlacedEvent.parameters = new Array()

  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  orderPlacedEvent.parameters.push(
    new ethereum.EventParam(
      "isBuyOrder",
      ethereum.Value.fromBoolean(isBuyOrder)
    )
  )

  return orderPlacedEvent
}

export function createOrderRemovedEvent(orderId: BigInt): OrderRemoved {
  let orderRemovedEvent = changetype<OrderRemoved>(newMockEvent())

  orderRemovedEvent.parameters = new Array()

  orderRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId)
    )
  )

  return orderRemovedEvent
}
