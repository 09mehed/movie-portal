import React from 'react';
import { Helmet } from 'react-helmet';

const About = () => {
    return (
        <div className='w-11/12 lg:w-8/12  mx-auto py-3'>
            <Helmet>
                <title>Movie Portal | about</title>
            </Helmet>
            <h2 className='text-center text-3xl font-bold my-5'>About Us</h2>
            <div className="collapse collapse-arrow bg-base-200 my-3">
                <input type="radio" name="movie-accordion" defaultChecked />
                <div className="collapse-title text-2xl font-bold">Action Movies</div>
                <div className="collapse-content">
                    <p>Explore the latest action-packed movies full of adventure and thrill. The action film is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work. The specifics of what constitutes an action film has been in scholarly debate since the 1980s.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 my-3">
                <input type="radio" name="movie-accordion" />
                <div className="collapse-title text-2xl font-bold">Romantic Movies</div>
                <div className="collapse-content">
                    <p>Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters. Typically their journey through dating, courtship or marriage is featured.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 my-3">
                <input type="radio" name="movie-accordion" />
                <div className="collapse-title text-2xl font-bold">Comedy Movies</div>
                <div className="collapse-content">
                    <p>The comedy film is a film genre that emphasizes humor. These films are designed to amuse audiences and make them laugh. Films in this genre typically have a happy ending, with dark comedy being an exception to this rule. Comedy is one of the oldest genres in film, and it is derived from classical comedy in theatre.</p>
                </div>
            </div>
        </div>
    );
};

export default About;