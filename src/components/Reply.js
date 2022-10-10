import { useDispatch, useSelector } from 'react-redux';
import { addReply, deleteReply } from "../redux/commentsSlice";
import { isOpen, isNotOpen } from '../redux/modalslice';
import Modal from "./Modal";
import { useState } from "react";
import PostComment from './PostComment';
import { formatDistanceToNow } from "date-fns";

//icons
import plusicon from '../assets/images/icon-plus.svg';
import minusicon from '../assets/images/icon-minus.svg';
import replyicon from '../assets/images/icon-reply.svg';
import deleteicon from '../assets/images/icon-delete.svg';
import editicon from '../assets/images/icon-edit.svg';

export default function Reply({ rep, com }) {
    const { currentUser } = useSelector((store) => store.comments)
    const dispatch = useDispatch();
    const [openReply, SetOpenReply] = useState(false);
    const [reply, setReply] = useState('')
    const [modal, setModal] = useState(false);

    const toggleReply = () => {
        SetOpenReply(!openReply)
    };

    const toggleModal = () => {
        if (modal) {
            dispatch(isNotOpen())
        } else if (!modal) {
            dispatch(isOpen())
        };
        setModal(!modal)
    };

    const postReply = () => {   
        const date = formatDistanceToNow(new Date(), {addSuffix: true}); 
        const data = {
            "cid": com.id,
            "user": {...currentUser},
            "content": reply,
            "id": Math.random(),
            "score": 0,
            "replyingTo": rep.user.username,
            "createdAt": date,
        };
        {reply.length && dispatch(addReply(data))};
        setReply('');
        SetOpenReply(false);
    }

    const action = {
        cid: com.id,
        rid: rep.id
    };

    const handleDelete = () => {
        dispatch(deleteReply(action));
        dispatch(isNotOpen());
        setModal(false);
    }


  return (
    <div>
        <div className='relative mb-1 flex flex-col-reverse md:flex-row gap-5 bg-white p-5 rounded-lg'>
            <div className='bg-veryLightGray w-[30%] md:w-[inherit] flex md:flex-col justify-around h-[inherit] p-2 px-3 items-center rounded'>
                <button>
                    <img src={plusicon} alt="plus" />
                </button>
                <span className='font-bold text-moderateBlue'>{rep.score}</span>
                <button>
                    <img src={minusicon} alt="minus" />
                </button>
            </div>

            <div>
                <div className='flex gap-3 py-2 items-center'>
                    <img className='h-[30px]' src={rep.user.image.png} alt="avatar" />
                    <h3 className='text-darkBlue font-bold'>{rep.user.username}</h3>
                    {rep.user.username === currentUser.username && <span className='bg-moderateBlue px-[2px] text-white text-sm'>you</span>}
                    <p className='text-grayishBlue text-sm'>{rep.createdAt}</p>
                    <div className='absolute bottom-5 right-5 md:bottom-1 md:right-0 md:relative md:ml-auto'>
                        {
                            rep.user.username !== currentUser.username && 
                            <button onClick={() => toggleReply(rep.id)} className='button hover:opacity-50'>
                                <img src={replyicon} alt="reply" />
                                <p>Reply</p>
                            </button>
                        }
                        {
                            rep.user.username === currentUser.username && 
                            <div className='flex gap-4 ml-2'>
                                <button onClick={() => toggleModal()} className='hover:opacity-50 button text-softRed'>
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
                    {rep.replyingTo && <span className='font-bold text-moderateBlue mr-1'>@{rep.replyingTo}</span>}{rep.content}
                    </p>
                </div>
            </div>
        </div>
        {openReply && <PostComment comment={reply} setComment={setReply} func={postReply} btnText={'REPLY'} />}
        <Modal modal={modal} toggleModal={toggleModal} func={handleDelete} />
    </div>
  )
}
