import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { EmojiHappyIcon } from '@heroicons/react/outline';

import { useSession } from 'next-auth/client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import firebase from 'firebase';
import { db, storage } from '../firebase';

function InputBox() {
  const [session] = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);


  const sendPost = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    db.collection('posts').add({
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(doc => {
      if (imageToPost) {
        const uploadTask = storage
          .ref(`posts/${doc.id}`)
          .putString(imageToPost, 'data_url');

        removeImage();

        uploadTask.on(
          'state_change',
          null,
          err => console.error(err),
          () => {
            storage
              .ref(`posts/${doc.id}`)
              .getDownloadURL()
              .then(url => {
                db.collection('posts').doc(doc.id).set({
                  postImage: url
                }, {
                  merge: true
                });
              });
          }
        );
      }
    });

    inputRef.current.value = '';
  }

  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    }
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
      <div className='flex space-x-4 p-4 items-center'>
        <Image
          className='rounded-full'
          src={session.user.image}
          width={40}
          height={40}
          layout='fixed'
        />

        <form className="flex flex-1">
          <input
            ref={inputRef}
            type="text"
            placeholder={`Whats on your mind, ${session.user.name}?`}
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
          />
          <button hidden onClick={sendPost}>Submit</button>
        </form>

        {imageToPost && (
          <div onClick={removeImage} className='flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'>
            <img
              className='h-10 object-contain'
              src={imageToPost}
              alt=""
            />
          </div>
        )}
      </div>

      <div className='flex justify-evenly p-3 border-t'>
        <div className='inputIcon'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className="inputIconText">
            Live Video
          </p>
        </div>
        <div
          onClick={() => filePickerRef.current.click()}
          className='inputIcon'
        >
          <CameraIcon className='h-7 text-green-400' />
          <p className="inputIconText">Photo/Video</p>
          <input ref={filePickerRef} type="file" hidden onClick={addImageToPost} />
        </div>
        <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-300' />
          <p className="inputIconText">Feeling/Activity</p>
        </div>
      </div>
    </div>
  )
}

export default InputBox
