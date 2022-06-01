import { useNavigate } from "react-router-dom"
import { GiStopSign } from 'react-icons/gi'

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Unauthorized </h1>
            <GiStopSign />
            <br />
            <p>You need elevated permissions to view this page page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized
