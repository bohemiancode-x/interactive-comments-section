import { useDispatch, useSelector } from 'react-redux';
import { addReply, deleteReply, addReplyScore, decReplyScore, editReply } from "../redux/commentsSlice";
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
    const [openEdit, setOpenEdit] = useState(false);
    const [editedCom, setEditedCom] = useState(rep.content);
    const [reply, setReply] = useState('')
    const [modal, setModal] = useState(false);
    const [incFired, setIncFired] = useState(false);
    const [decFired, setDecFired] = useState(false);

    const toggleReply = () => {
        SetOpenReply(!openReply)
    };
    const toggleEdit = () => {
        setOpenEdit(!openEdit)
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
    };

    const incScore = (id) => {
        if (!incFired) {
            dispatch(addReplyScore(id))
        };
        setIncFired(true);
        setDecFired(false);
    };
    const decScore = (id) => {
        if (incFired) {
            if (!decFired) {
                dispatch(decReplyScore(id))
            };
            setDecFired(true);
            setIncFired(false); 
        }
    };
    const editCom = () => {
        const action = {
            cid: com.id,
            rid: rep.id,
            newReply: editedCom
        }
        dispatch(editReply(action));
        setOpenEdit(false);
    }


  return (
    <div>
        <div className='relative mb-1 flex flex-col-reverse md:flex-row gap-5 bg-white p-5 rounded-lg'>
            <div className='bg-veryLightGray w-[30%] md:w-[inherit] flex md:flex-col justify-around h-[inherit] p-2 px-3 items-center rounded'>
                <button onClick={() => incScore(action)}>
                    <img src={plusicon} alt="plus" />
                </button>
                <span className='font-bold text-moderateBlue'>{rep.score}</span>
                <button onClick={() => decScore(action)}>
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
                                Reply
                            </button>
                        }
                        {
                            rep.user.username === currentUser.username && 
                            <div className='flex gap-4 ml-2'>
                                <button onClick={() => toggleModal()} className='hover:opacity-50 button text-softRed'>
                                    <img src={deleteicon} alt="delete" />
                                    Delete
                                </button>
                                <button onClick={() => toggleEdit()} className='button hover:opacity-50'>
                                    <img src={editicon} alt="edit" />
                                    Edit
                                </button>
                            </div>
                        }
                    </div>
                    
                </div>

                <div>
                    {!openEdit ? 
                        <p className='text-grayishBlue'>
                        {rep.replyingTo && <span className='font-bold text-moderateBlue mr-1'>@{rep.replyingTo}</span>}{rep.content}
                        </p> :
                        <div>
                        {rep.user.username === currentUser.username && 
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
        <Modal modal={modal} toggleModal={toggleModal} func={handleDelete} />
    </div>
  )
}
