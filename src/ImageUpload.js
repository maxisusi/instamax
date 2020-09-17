import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { db, storage } from './firebase';
import firebase from 'firebase';
import './ImageUpload.css';

const ImageUpload = ({ username }) => {

    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
    const [uploadActive, setUploadActive] = useState(false);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //Progress function...
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(progress);
            },
            (error) => {
                //Error function...
                console.log(error);
                alert(error.message);
            },
            () => {
                //Complete function...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        //Post image inside the database
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageURL: url,
                            username: username
                        })

                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }
        )
    }

    return (
        <div className="imageUpload">
            <div className="imageUpload__progress" style={{ width: `${progress}%` }}></div>
            <div className="imageUpload__content">

                {/* <progress className="imageUpload__progress" value={progress} max={100}></progress> */}
                <div className="imageUpload__uploadInputs">
                    <label for="file" className="imageUpload__labelFile">Upload your file</label>
                    <input className="imageUpload__fileInput" type="file" onChange={handleChange} id="file" />
                </div>


                <input
                    className="imageUpload__input"
                    type="text"
                    placeholder="Enter a caption..."
                    onChange={event => setCaption(event.target.value)}
                    value={caption} />


                <Button onClick={handleUpload}>Upload</Button>
            </div>

        </div>
    )
}

export default ImageUpload
