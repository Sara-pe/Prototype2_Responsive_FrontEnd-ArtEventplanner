import { useNavigate } from "react-router-dom";

export const Error = () => {

    const navigate = useNavigate();
    
    return (
        <div className='pageError'>
            <div className='containerError'>

                <h1>500 Internal Server Error</h1>
                <h4>Please try again later.</h4>
                <button className="btn-1" onClick={() => navigate(-1)}>Go back</button>

            </div>
        </div>
    )
}