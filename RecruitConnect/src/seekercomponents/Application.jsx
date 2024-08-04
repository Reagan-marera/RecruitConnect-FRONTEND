import React from 'react'

const Application = () => {
  return (
    <div>
      <h1>Application page.</h1>
      <p>You do not have any job applications yet</p>
      <button onClick={() => alert("find your dream job")}>Find Dream Job</button>
    </div>
  )
}

export default Application