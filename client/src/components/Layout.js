import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App">

          <div className="body-container">
            <Outlet />
          </div>

        </main>
    )
}

export default Layout
