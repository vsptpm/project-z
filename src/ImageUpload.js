import React, { useState } from 'react'
import { Button, Input } from '@material-ui/core'
import { db, storage, TextField } from './firebase';
import firebase from "firebase";
import './ImageUpload.css';


function ImageUpload({ username,openUploadModal }) {
    const [image, setImage] = useState('');
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        if(image?.length == 0 && caption.length == 0){
            alert('Please add caption and image to submit')
            return
        }
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function goeas here..
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgress(progress);
            },
            (error) => {
                //error function...
                console.log(error);
                alert(error.message);
            },
            () => {
                //upload complete function and gets a urls
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image into db
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
                    openUploadModal(false)
            }
        )
    }

    return (
        <div className="ImageUpload">
            <progress className="imageUpload__progress" value={progress} max="100" />
            <br />
            <Input className='caption' placeholder="Enter a caption..." type="text"
                onChange={event => setCaption(event.target.value)} value={caption}
            />
            <br />

            <input className="imageupload__select" type="file" onChange={handleChange} />
            <br />
            <Button variant="outlined" className="imageupload__button" onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
