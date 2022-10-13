import imgjulius from '../assets/images/avatars/image-juliusomo.png'

export default function PostComment({ comment, func, btnText, setComment }) {
  return (
    <div className='relative w-full h-[20vh] md:h-[15vh] flex md:items-center gap-5 m-auto bg-white p-5 rounded-lg'>
        <img className='absolute bottom-5 left-5 md:relative h-[35px]' src={imgjulius} alt="" />
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment} 
          className='w-full border-2 border-lightGray rounded md:w-[80%] h-[60%] md:h-[80%] md:mx-2 p-2' placeholder='Add a comment..' />
        <button
          onClick={() => func()} 
          className='absolute bottom-5 right-5 md:relative bg-moderateBlue text-white p-2 rounded md:h-[40%] text-sm px-5 hover:opacity-50'>
            {btnText}
          </button>
    </div>
  )
}
