import {
  CommodityCreated as CommodityCreatedEvent,
  OrderMatched as OrderMatchedEvent,
  OrderPlaced as OrderPlacedEvent,
  OrderRemoved as OrderRemovedEvent
} from "../generated/Contract/Contract"
import {
  CommodityCreated,
  OrderMatched,
  OrderPlaced,
  OrderRemoved
} from "../generated/schema"

export function handleCommodityCreated(event: CommodityCreatedEvent): void {
  let entity = new CommodityCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.token = event.params.token

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderMatched(event: OrderMatchedEvent): void {
  let entity = new OrderMatched(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyOrderId = event.params.buyOrderId
  entity.sellOrderId = event.params.sellOrderId
  entity.matchedAmount = event.params.matchedAmount
  entity.matchedPrice = event.params.matchedPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderPlaced(event: OrderPlacedEvent): void {
  let entity = new OrderPlaced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Contract_id = event.params.id
  entity.user = event.params.user
  entity.amount = event.params.amount
  entity.price = event.params.price
  entity.isBuyOrder = event.params.isBuyOrder

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderRemoved(event: OrderRemovedEvent): void {
  let entity = new OrderRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.orderId = event.params.orderId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
