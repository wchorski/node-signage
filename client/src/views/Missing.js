import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

const Missing = () => {
    return (
      <>
        <Navbar />
        <article style={{ padding: "100px" }}>
            <h1>Oops! 404</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
            </div>
        </article>
      </>
    )
}

export default Missing
