import React from "react";
import "./styles.css"
import logo from "./logo.png";

export const Splash = () => {
    return (
        <div className={'splash-container'}>

            <div className={'splash-screen-container'} >
                <div className={'splash-content'}>
                    <div className={'splash-logo'}>
                        <img src={logo} alt={'logo'} />
                    </div>
                    <div className={'splash-text'}>
                        <div className="loading__letter">L</div>
                        <div className="loading__letter">o</div>
                        <div className="loading__letter">a</div>
                        <div className="loading__letter">d</div>
                        <div className="loading__letter">i</div>
                        <div className="loading__letter">n</div>
                        <div className="loading__letter">g</div>
                        <div className="loading__letter">.</div>
                        <div className="loading__letter">.</div>
                        <div className="loading__letter">.</div>
                    </div>
                </div>

            </div>
        </div>
    )
}