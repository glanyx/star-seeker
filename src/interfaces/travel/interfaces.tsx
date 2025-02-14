
interface IGateLink {
  hu: string
  code: string
}

export interface IGate {
  uuid: string
  code: string
  createdAt: number
  links: Array<IGateLink>
  name: string
  updatedAt?: number
}

export interface IJourney {
  from: string
  route: Array<string>
  to: string
  totalCost: number
}

export interface ITransport {
  capacity: number
  name: string
  ratePerAu: number
}

export interface ITransportCost {
  currency: string
  journeyCost: number
  parkingFee: number
  recommendedTransport: ITransport
}

interface IDatabase {
  canConnect: boolean
  hasRequiredTableAccess: boolean
}

export interface IStatus {
  db: IDatabase
  version: string
}

export interface IJourneyPlannerParams {
  distance: number
  passengers: number
  parking: number
}

export interface IRoute {
  from: IGate
  to: IGate
  route: Array<string>
  totalCost: number
}