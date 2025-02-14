'use server'
import AxiosClient from '@/utils/axios'
import { IGate, IRoute, ITransportCost } from '@/interfaces/travel'

type IOverload = {
  (): Promise<Array<IGate>>
  (gateCode: string): Promise<IGate>
}

export const fetchGateDetails: IOverload = async (gateCode?: string) => {

  const res = await AxiosClient(`/gates${gateCode ? `/${gateCode}` : ''}`, {
    method: 'GET',
  })

  return res.data

}

interface ITransportParams {
  distance: number
  passengers: number
  parkingDays: number
}

export const calculateTransport = async ({ distance, passengers, parkingDays }: ITransportParams) => {

  const res = await AxiosClient<ITransportCost>(`/transport/${distance}`, {
    method: 'GET',
    params: {
      'passengers': passengers,
      'parking': parkingDays
    }
  })

  return res.data

}

interface IRouteParams {
  from: string
  to: string
}

export const calculateCheapestRoute = async ({ from, to }: IRouteParams) => {

  const res = await AxiosClient<IRoute>(`/gates/${from}/to/${to}`, {
    method: 'GET',
  })

  return res.data

}