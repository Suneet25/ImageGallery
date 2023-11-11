import React from 'react'
import { Spinner } from '@/components/bootstrap'
type Props = {}

const loading = (props: Props) => {
  return <Spinner animation='border' className='d-block m-auto'/>
}

export default loading