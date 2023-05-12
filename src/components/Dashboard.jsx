import React from 'react'

function Dashboard() {
  return (
    <>
  {/* <div style={{ display: 'flex', height: '100vh' }}>
  <div style={{ flex: '0 0 auto', width: '200px' }}>
    <Routes>
      <Route
        path={['/', '/account', '/input', '/dairy']}
        element={<SideBar visible={navVisible} show={showNavbar} />}
      />
    </Routes>
  </div>
  <div style={{ flex: '1', marginLeft: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ maxWidth: '600px', width: '100%' }}></div>
  */}
    <div className="flex-col gap-5 ">

      <h1
        className="text-2xl text-black  font-bold">Dashboard</h1>
    </div>
    </>
  )
}

export default Dashboard
