import { useDispatch, useSelector } from 'react-redux';
import { isNotOpen } from '../redux/modalslice';


export default function Modal({ func, modal, toggleModal }) {
    //const dispatch = useDispatch();
    //const { active } = useSelector((store) => store.modal);


  return (
    <div className={modal ? 'absolute top-0 left-0 bg-black/30 h-[100vh] w-full flex justify-center z-[999]' : 'hidden'}>
        <div className='w-[90%] md:w-[30%] bg-white rounded m-auto p-5'>
            <h2 className='font-bold text-lg my-3'>Delete comment</h2>
            <p className='text-sm text-grayishBlue w-[95%]'>
                Are you sure you want to delete this comment? This will remove the comment and can't be undone.
            </p>
            <div className='my-3 flex justify-around'>
                <button onClick={() => toggleModal()} className='bg-grayishBlue text-white px-5 py-2 rounded-md'>NO, CANCEL</button>
                <button onClick={() => func()} className='bg-softRed text-white px-5 py-2 rounded-md'>YES, DELETE</button>
            </div>
        </div>
    </div>
  )
}
