import { useDispatch, useSelector } from 'react-redux';
import { isOpen } from '../redux/modalslice';
import PostComment from './PostComment';
import { useState } from "react";

//icons
import plusicon from '../assets/images/icon-plus.svg';
import minusicon from '../assets/images/icon-minus.svg';
import replyicon from '../assets/images/icon-reply.svg';
import deleteicon from '../assets/images/icon-delete.svg';
import editicon from '../assets/images/icon-edit.svg';

export default function Comment({ com }) {
    const { currentUser } = useSelector((store) => store.comments)
    const dispatch = useDispatch();
    const [openReply, SetOpenReply] = useState(false);

    const toggleReply = () => {
        SetOpenReply(!openReply)
    }

  return (
    <div>
        <div className='relative mb-1 flex flex-col-reverse md:flex-row gap-5 bg-white p-5 rounded-lg'>
            <div className='bg-veryLightGray w-[30%] md:w-[15%] flex md:flex-col justify-around h-[inherit] p-2 items-center rounded'>
                <button>
                    <img src={plusicon} alt="plus" />
                </button>
                <span className='font-bold text-moderateBlue'>{com.score}</span>
                <button>
                    <img src={minusicon} alt="minus" />
                </button>
            </div>

            <div>
                <div className='flex gap-3 py-2 items-center'>
                    <img className='h-[30px]' src={com.user.image.png} alt="avatar" />
                    <h3 className='text-darkBlue font-bold'>{com.user.username}</h3>
                    {com.user.username === currentUser.username && <span className='bg-moderateBlue px-[2px] text-white text-sm'>you</span>}
                    <p className='text-grayishBlue'>{com.createdAt}</p>
                    <div className='absolute bottom-5 right-5 md:relative md:ml-auto'>
                        {
                            com.user.username != currentUser.username && 
                            <button onClick={() => toggleReply(com.id)} className='button hover:opacity-50'>
                                <img src={replyicon} alt="reply" />
                                <p>Reply</p>
                            </button>
                        }
                        {
                            com.user.username === currentUser.username && 
                            <div className='flex gap-4'>
                                <button onClick={() => dispatch(isOpen())} className='hover:opacity-50 button text-softRed'>
                                    <img src={deleteicon} alt="reply" />
                                    <p>Delete</p>
                                </button>
                                <button className='button hover:opacity-50'>
                                    <img src={editicon} alt="reply" />
                                    <p>Edit</p>
                                </button>
                            </div>
                        }
                    </div>
                    
                </div>

                <div>
                    
                    <p className='text-grayishBlue'>
                    {com.replyingTo && <span className='font-bold text-moderateBlue mr-1'>@{com.replyingTo}</span>}{com.content}
                    </p>
                </div>
            </div>
        </div>
        {openReply && <PostComment btnText={'REPLY'} />}

    </div>
  )
}
