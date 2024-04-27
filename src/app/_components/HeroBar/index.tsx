import React from 'react';
import './herobar.scss';

interface Props {
    // Define your component props here
}

const HeroBar: React.FC<Props> = ({ /* Destructure your props here */ }) => {
    return (
        <div className='herobar'>

            <div className="herobar__container">
                <div className="herobar__content">
                    <h1 className="herobar__title">Hero Bar</h1>
                    <p className="herobar__description">This is a hero bar component</p>
                </div>
            </div>

            <div className="herobar__container">
                <div className="herobar__content">
                    <h1 className="herobar__title">Hero Bar</h1>
                    <p className="herobar__description">This is a hero bar component</p>
                </div>
            </div>

        </div>
    );
};

export default HeroBar;