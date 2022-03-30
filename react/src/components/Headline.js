import React from 'react'
import Stars from '../img/stars.png'

// props: none | Block headline section for homepage, extracted into separate component to simplify Home.js and make more versatile

export default function Headline() {
    return (
      <div>
        <div className="jumbotron d-flex justify-content-between">
          <div>
            <h1 className="display-4 bold">Stay connected with VibeCheck</h1>
            <p className="lead m-0">
              Feeling disconnected because of online study and lockdowns?
            </p>
            <p className="lead">
              VibeCheck makes connecting with fellow students and building
              communities online easy and fun!
            </p>
            <p className="lead">
              <a
                className="btn bg-grey white-hover dark-button"
                href="/signup"
                role="button"
              >
                Sign up
              </a>
            </p>
          </div>
          <img className="d-inline float-right stars" src={Stars}></img>
        </div>
      </div>
    );
}
