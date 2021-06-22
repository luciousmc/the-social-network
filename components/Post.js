import { ChatIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/outline';
import { ChatAltIcon } from '@heroicons/react/solid';
import Image from 'next/image';

function Post({ name, email, message, postImage, image, timestamp }) {
  return (
    <div className='flex flex-col'>
      <div className='p-5 bg-white shadow-sm rounded-t-2xl mt-5'>
        <div className='flex items-center space-x-2'>
          <Image
            className='rounded-full'
            src={image}
            width={40}
            height={40}
            alt=""
          />
          
          <div>
            <p className='font-medium'>{name}</p>
            <p className="text-xs text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleString()}
            </p>
          </div>
        </div>

        <p className="pt-4">{message}</p>
      </div>

      {postImage && (
        <div className='relative h-56 md:h-96 bg-white'>
          <Image
            src={postImage}
            objectFit='cover'
            layout='fill'
            alt=''
          />
        </div>
      )}

      {/* Footer (post) */}

      <div className='flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t'>
        <div className='inputIcon rounded-none rounded-bl-2xl'>
          <ThumbUpIcon className='h-4' />
          <p className='inputIconText'>Like</p>
        </div>

        <div className='inputIcon'>
          <ChatAltIcon className='h-4' />
          <p className='inputIconText'>Comment</p>
        </div>

        <div className='inputIcon'>
          <ShareIcon className='h-4' />
          <p className='inputIconText'>Share</p>
        </div>
      </div>
    </div>
  )
}

export default Post
