import {
  ChainlinkCancelled as ChainlinkCancelledEvent,
  ChainlinkFulfilled as ChainlinkFulfilledEvent,
  ChainlinkRequested as ChainlinkRequestedEvent,
  CommodityCreated as CommodityCreatedEvent,
  OrderMatched as OrderMatchedEvent,
  OrderPlaced as OrderPlacedEvent,
  OwnershipTransferRequested as OwnershipTransferRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  RequestEthereumPriceFulfilled as RequestEthereumPriceFulfilledEvent,
  UIDAssigned as UIDAssignedEvent,
  UserEvent as UserEventEvent
} from "../generated/Contract/Contract"
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
} from "../generated/schema"

export function handleChainlinkCancelled(event: ChainlinkCancelledEvent): void {
  let entity = new ChainlinkCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Contract_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChainlinkFulfilled(event: ChainlinkFulfilledEvent): void {
  let entity = new ChainlinkFulfilled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Contract_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChainlinkRequested(event: ChainlinkRequestedEvent): void {
  let entity = new ChainlinkRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Contract_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCommodityCreated(event: CommodityCreatedEvent): void {
  let entity = new CommodityCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.comId = event.params.comId
  entity.name = event.params.name
  entity.symbol = event.params.symbol

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderMatched(event: OrderMatchedEvent): void {
  let entity = new OrderMatched(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.matchedOrderId = event.params.matchedOrderId
  entity.buyer = event.params.buyer
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOrderPlaced(event: OrderPlacedEvent): void {
  let entity = new OrderPlaced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.orderId = event.params.orderId
  entity.owner = event.params.owner
  entity.commodityId = event.params.commodityId
  entity.region = event.params.region
  entity.country = event.params.country
  entity.amount = event.params.amount
  entity.price = event.params.price
  entity.currency = event.params.currency
  entity.harvestDate = event.params.harvestDate
  entity.validityPeriod = event.params.validityPeriod
  entity.isBuyOrder = event.params.isBuyOrder

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferRequested(
  event: OwnershipTransferRequestedEvent
): void {
  let entity = new OwnershipTransferRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRequestEthereumPriceFulfilled(
  event: RequestEthereumPriceFulfilledEvent
): void {
  let entity = new RequestEthereumPriceFulfilled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.requestId = event.params.requestId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUIDAssigned(event: UIDAssignedEvent): void {
  let entity = new UIDAssigned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.uid = event.params.uid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserEvent(event: UserEventEvent): void {
  let entity = new UserEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddress = event.params.userAddress
  entity.name = event.params.name
  entity.userType = event.params.userType
  entity.location = event.params.location
  entity.verificationStatus = event.params.verificationStatus
  entity.uid = event.params.uid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
