'use client'
import React, { useEffect, useState } from 'react'
import { fetchGateDetails } from './actions'
import { IGate } from '@/interfaces/travel'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Loader } from '../Loader'

const GateInfo = ({

}) => {

  const [gates, setGates] = useState<Array<IGate>>([])
  const [loading, setLoading] = useState<boolean>(false)


  const [expanded, setExpanded] = useState<string>('')

  const [gateDetails, setGateDetails] = useState<IGate>()
  const [detailsLoading, setDetailsLoading] = useState<boolean>(false)

  const setExpandedState = (code: string) => {
    code !== expanded && setDetailsLoading(true);
    code === expanded ? setExpanded('') : setExpanded(code)
  }

  useEffect(() => {
    setLoading(true)
    fetchGateDetails().then(gates => {
      setGates(gates)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    setDetailsLoading(true)
    fetchGateDetails(expanded).then(gate => {
      setGateDetails(gate)
      setDetailsLoading(false)
    })
  }, [expanded])

  return(
    <div className='table-auto overflow-x-auto bg-neutral-800 rounded-lg w-1/2'>
      <table className='w-full text-md text-left rtl:text-right text-gray-400 overflow-hidden'>
        <thead className='uppercase bg-gray-700 text-gray-400'>
          <tr>
            <td scope='col' className='pl-6 pr-2 py-3' />
            <td colSpan={4} scope='col' className='pl-2 pr-32 py-3'>Gate Name</td>
          </tr>
        </thead>
        <tbody>
          {!loading ? gates.map(gate => (
            <React.Fragment key={gate.uuid}>
              <tr key={gate.code} onClick={() => setExpandedState(gate.code)} className='cursor-pointer hover:bg-neutral-700'>
                <td className='pl-6 py-3 w-16'>{gate.code}</td>
                <td className='pl-2 pr-32 py-3'>{gate.name}</td>
                <td className='px-6 py-3 text-right'>
                  <div>
                    {expanded === gate.code ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </div>
                </td>
              </tr>
              {!(expanded && gate.code === expanded && gateDetails)
                ? <></>
                : (!detailsLoading && gateDetails)
                  ? (
                    <tr key={`${gate.code}-details`} className='bg-gray-600'>
                      <td colSpan={3} className='p-0'>
                        <table className='w-full text-md text-left rtl:text-right'>
                          <thead className='uppercase bg-gray-700 text-gray-400'>
                            <tr className='bg-gray-800'>
                              <td className='px-6 py-3'>UUID</td>
                              <td className='px-6 py-3'>Created</td>
                              <td className='px-6 py-3'>Updated</td>
                              <td className='px-6 py-3'>Connections</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className='px-6 py-3'>{gateDetails.uuid}</td>
                              <td className='px-6 py-3'>{new Date(gateDetails.createdAt).getTime()}</td>
                              <td className='px-6 py-3'>{gateDetails.updatedAt ? new Date(gateDetails.updatedAt).getTime() : 'Never'}</td>
                              <td className='px-6 py-3'>{gateDetails.links?.length > 0 ? gateDetails.links.map(l => l.code).join(', ') : 'None'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )
                  :
                  <tr key='loader'>
                    <td colSpan={4}>
                      <Loader />
                    </td>
                  </tr>
              }
            </React.Fragment>
          ))
          :
          <tr key='loader'>
            <td colSpan={3}>
              <Loader />
            </td>
          </tr>
        }
        </tbody>
      </table>
    </div>
  )
}

export default GateInfo