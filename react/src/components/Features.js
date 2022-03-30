import React from 'react'
import Book from '../img/book.svg'
import Chat from '../img/chat.svg'
import People from '../img/people.svg'
import Post from '../img/post.svg'

// props: none | Feature section for homepage, extracted into separate component to simplify Home.js and make more versatile
export default function Features() {
    return (
      <React.Fragment>
        <div className="d-flex flex-column features justify-content-around">
          <div className="d-flex">
            <img src={Book}></img>
            <span className="">Ask questions about your studies</span>
          </div>
          <div className="d-flex-inline">
            <img src={Chat}></img>
            <span className="">Discuss subjects with fellow students</span>
          </div>
          <div className="d-flex-inline">
            <img src={Post}></img>
            <span className="">Make posts and reply to others' posts</span>
          </div>
          <div className="d-flex-inline">
            <img src={People}></img>
            <span className="">Connect with your peers</span>
          </div>
        </div>
      </React.Fragment>
    );
}
