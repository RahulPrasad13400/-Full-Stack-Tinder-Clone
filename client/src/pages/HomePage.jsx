import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>HomePage
      <Link to={'/profile'}>
        profile
      </Link>
    </div>
  )
}

export default HomePage