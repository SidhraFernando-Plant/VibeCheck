import React from 'react'
import ImageUpload from './ImageUpload';
import { useState } from 'react';
import {sanitiseInput} from "../util/Sanitise"

// props: heading (str), formTitle (str), txtAreaLabel (str), handleSubmit (function)
//Heading and collapsible form for submitting text (post/reply) used in multiple components
export default function CollapsibleForm(props) {
  const [imageName, setImageName] = useState(false);
  //State used to store input as if var is used, it is erased when image upload pop up is closed
  const [fieldText, setFieldText] = useState("");
    
    // Params: val (string)  | Return: none
    // when input val is entered into textarea field, update fieldtext
    function handleChange(val) {
      setFieldText(sanitiseInput(val));
    }

    function storeImage(val) {
      setImageName(val);
    }
    
    // Params: val (string)  | Return: none
    // when user submits the input, call the parent components handleSubmit function to save the input in appropriate location
    function sendVal(val) {
      //600 character limit for posts and replies
      if(fieldText.length>600) {
        alert("Your post is too long! Please make it 600 characters or less.");
      }
      // Don't allow empty posts to be submitted
      else if(fieldText.length===0||fieldText===" ") {
        alert("You can't submit a post with no text");
      }
      else {
        props.handleSubmit(val, imageName);
      }
    }
    
    return (
      <div>
      <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Upload image
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <ImageUpload username={props.username} saveImage={storeImage}/>
              </div>
              
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center m-auto post">
          <h2>{props.heading}</h2>
          <button className="btn bg-grey white-hover dark-button"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            ar
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            {props.formTitle}
          </button>
        </div>
        <div className="collapse" id="collapseExample">
          <div className="card card-body mb-3 post m-auto collapsible-form ">
            <div className="form-group">
              <label for="exampleFormControlTextarea1">
                {props.txtAreaLabel}.
              </label>
              <textarea
                id="reply-input"
                className="form-control"
                rows="3"
                onChange={(e) => handleChange(e.target.value)}
              ></textarea>
            </div>
            <div className="d-flex align-items-center mt-2">
            <button
              className=" btn btn-outline-info d-inline text-dark"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              Upload image
            </button>
            <button
              type="submit"
              className=" ml-3 btn btn-1 d-inline"
              data-toggle="collapse"
              data-target="#collapseExample"
              ar
              aria-expanded="false"
              aria-controls="collapseExample"
              onClick={() => sendVal(fieldText)}
            >
              Submit
            </button>
            {imageName
            ?
            <span className="ml-3 text-muted">Attached image: {imageName}</span>
            :
            <span className="ml-3 text-muted">No images uploaded</span>
            }
            </div>
          </div>
        </div>
      </div>
    );
}
