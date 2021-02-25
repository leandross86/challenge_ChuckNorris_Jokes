import React from 'react'

export default function Button ({onClick}) {
  return (
    <div className='btn-container'>
      <button
        onClick={onClick}
      >
        Get a new random fact!
      </button>
    </div>
  )
}