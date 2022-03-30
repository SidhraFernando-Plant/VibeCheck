import React from 'react'
import { useState } from 'react';
import { setAvatar } from '../data/userRepository';

// props: username (str) 
// User can upload an image to the database from react/public/img only, will not work if not from this directory
// This componentt can be embedded into other components
export default function ImageUpload(props) {
    const [file, setFile] = useState(null);
    const [displayFile, setDisplayFile] = useState('');

    // Params: file (file)  | Return: none
    // when a file is uploaded to the file input, save it to state and update the preview
    const onChange = (e) => {   
        setFile(e.target.files[0]);
        setDisplayFile(URL.createObjectURL(e.target.files[0]));
    }

    // Params: none  | Return: none
    // Call save image function of parent component, passing the name of the uploaded file
    function saveAvatar() {
        props.saveImage(file.name);
    }

    return (
        <div className="d-flex">
            {displayFile===''
            ?
            <div className="img-preview">
                Image preview will be shown here
            </div>
            :
            <img className="img-preview rounded-circle" src={displayFile} alt="avatar"/>
            }
            <div className="d-flex flex-column justify-content-between ml-3">
                <input type="file" onChange={(e) => onChange(e)} />
                <button data-toggle="modal" data-target="#exampleModal" onClick={(e) => {saveAvatar()}} type="submit" class="btn btn-1">SAVE</button>
            </div>
        </div>
    )

}

