import imgjulius from '../assets/images/avatars/image-juliusomo.png'

export default function PostComment() {
  return (
    <div className='w-[50%] mt-5 flex gap-5 m-auto bg-white p-5 rounded-lg'>
        <img className='h-[35px]' src={imgjulius} alt="" />
        <textarea className='border-2 border-lightGray rounded w-[80%] p-2' placeholder='Add a comment..' />
        <button className='bg-moderateBlue text-white p-2 rounded h-[50%] text-sm px-5'>SEND</button>
    </div>
  )
}
