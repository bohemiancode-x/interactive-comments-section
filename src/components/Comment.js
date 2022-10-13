import { useDispatch, useSelector } from 'react-redux';
import { addReply, deleteComment, increaseScore, decreaseScore, editComment } from "../redux/commentsSlice"
import { isOpen, isNotOpen } from '../redux/modalslice';
import PostComment from './PostComment';
import Modal from "./Modal";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

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
    const [openEdit, setOpenEdit] = useState(false);
    const [editedCom, setEditedCom] = useState(com.content);
    const [modal, setModal] = useState(false);
    const [reply, setReply] = useState('');
    const [incFired, setIncFired] = useState(false);
    const [decFired, setDecFired] = useState(false);

    const toggleModal = () => {
        if (modal) {
            dispatch(isNotOpen())
        } else if (!modal) {
            dispatch(isOpen())
        };
        setModal(!modal)
    }

    const postReply = () => {   
        const date = formatDistanceToNow(new Date(), {addSuffix: true}); 
        const data = {
            "cid": com.id,
            "user": {...currentUser},
            "content": reply,
            "id": Math.random(),
            "score": 0,
            "replyingTo": com.user.username,
            "createdAt": date,
        };
        {reply.length && dispatch(addReply(data))};
        setReply('');
        SetOpenReply(false);
    }

    const toggleReply = () => {
        SetOpenReply(!openReply)
    };
    const toggleEdit = () => {
        setOpenEdit(!openEdit)
    };

    const handleDelete = () => {
        dispatch(deleteComment(com.id))
        dispatch(isNotOpen());
        setModal(false);
    };
    const incScore = (id) => {
        if (!incFired) {
            dispatch(increaseScore(id))
        };
        setIncFired(true);
        setDecFired(false);
    };
    const decScore = (id) => {
        if (incFired) {
            if (!decFired) {
                dispatch(decreaseScore(id))
            };
            setDecFired(true);
            setIncFired(false); 
        }
    };
    const editCom = () => {
        const action = {
            cid: com.id,
            newComment: editedCom
        }
        dispatch(editComment(action));
        setOpenEdit(false);
    }


  return (
    <div>
        <div className='relative mb-1 flex flex-col-reverse md:flex-row gap-5 bg-white p-5 rounded-lg'>
            <div className='bg-veryLightGray w-[30%] md:w-[inherit] flex md:flex-col justify-around h-[inherit] p-2 px-3 items-center rounded'>
                <button onClick={() => incScore(com.id)}>
                    <img src={plusicon} alt="plus" />
                </button>
                <span className='font-bold text-moderateBlue'>{com.score}</span>
                <button onClick={() => decScore(com.id)}>
                    <img src={minusicon} alt="minus" />
                </button>
            </div>

            <div>
                <div className='flex gap-3 py-2 items-center'>
                    <img className='h-[30px]' src={com.user.image.png} alt="avatar" />
                    <h3 className='text-darkBlue font-bold'>{com.user.username}</h3>
                    {com.user.username === currentUser.username && <span className='bg-moderateBlue px-[2px] text-white text-sm'>you</span>}
                    <p className='text-grayishBlue text-sm'>{com.createdAt}</p>
                    <div className='absolute bottom-5 right-5 md:bottom-1 md:right-0 md:relative md:ml-auto'>
                        {
                            com.user.username !== currentUser.username && 
                            <button onClick={() => toggleReply()} className='button hover:opacity-50'>
                                <img src={replyicon} alt="reply" />
                                <p>Reply</p>
                            </button>
                        }
                        {
                            com.user.username === currentUser.username && 
                            <div className='flex gap-4 ml-16'>
                                <button onClick={() => toggleModal()} className='hover:opacity-50 button text-softRed'>
                                    <img src={deleteicon} alt="reply" />
                                    <p>Delete</p>
                                </button>
                                <button onClick={() => toggleEdit()} className='button hover:opacity-50'>
                                    <img src={editicon} alt="reply" />
                                    <p>Edit</p>
                                </button>
                            </div>
                        }
                    </div>
                    
                </div>

                <div>
                    {!openEdit ? 
                        <p className='text-grayishBlue'>
                        {com.replyingTo && <span className='font-bold text-moderateBlue mr-1'>@{com.replyingTo}</span>}{com.content}
                        </p> :
                        <div>
                        {com.user.username === currentUser.username && 
                            <div className='flex flex-col gap-3'>
                                <textarea onChange={(e) => setEditedCom(e.target.value)} className='w-full border-2 border-lightGray rounded h-[60%] md:h-[80%] md:mx-2 p-2' value={editedCom} />
                                <button onClick={() => editCom()} className='ml-auto bg-moderateBlue text-white p-2 rounded md:h-[30%] text-sm px-5 hover:opacity-50'>UPDATE</button>
                            </div>}
                        </div>
                    } 
                    
                </div>
            </div>
        </div>
        {openReply && <PostComment comment={reply} setComment={setReply} func={postReply} btnText={'REPLY'} />}
        <Modal func={handleDelete} modal={modal} toggleModal={toggleModal} />
    </div>
  )
}
