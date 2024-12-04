import React, { useContext } from 'react';
// import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../authProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Featured = ({ movies }) => {
    const { user } = useContext(AuthContext) 
    const navigate = useNavigate()

    const handleSeeDetailsClick = (id) => {
        if (!user) {
            navigate("/signin", { state: { from: `movie-details/${id}` } });
        } else {
          navigate(`movie-details/${id}`);
        }
      };
    

    const { _id,photo, title, genre, duration, year, rating } = movies
    return (
        <div>
            <div className="card card-compact bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src={photo}
                        alt="Shoes" className='h-48 w-full' />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Title: {title}</h2>
                    <p>Genre: {genre}</p>
                    <p>Duration: {duration}</p>
                    <p>Year: {year}</p>
                    <p>Rating: {rating}</p>
                    <div className="card-actions justify-end">
                        {/* <Link to={`/movie-details/${movies._id}`} className="btn btn-primary">See Details</Link> */}
                        <button className="btn btn-primary" onClick={() => handleSeeDetailsClick(_id)}>
                            See Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;