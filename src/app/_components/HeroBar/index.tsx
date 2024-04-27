import React from 'react';
import './herobar.scss';

interface Props {
    // Define your component props here
}

const HeroBar: React.FC<Props> = ({ /* Destructure your props here */ }) => {
    return (
        <div className='herobar'>

            <section className="herobar__container">
                <h1>Dummy writing</h1>
                <article className="herobar__content">
                    <h3 className="herobar__title">Hero Bar</h3>
                    <p className="herobar__description">This is a hero bar component</p>
                </article>
            </section>

            <section className="herobar__container">
                <h2>Dummy writing</h2>
                <article className="herobar__content">
                    <h3 className="herobar__title">Hero Bar</h3>
                    <p className="herobar__description">This is a hero bar component</p>
                </article>
            </section>

        </div>
    );
};

export default HeroBar;