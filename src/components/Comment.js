import plusicon from '../assets/images/icon-plus.svg';
import minusicon from '../assets/images/icon-minus.svg';
import replyicon from '../assets/images/icon-reply.svg';
import deleteicon from '../assets/images/icon-delete.svg';
import editicon from '../assets/images/icon-edit.svg';
import amyrobson from '../assets/images/avatars/image-amyrobson.png'

export default function Comment() {
  return (
    <div>
        <div className='w-[50%] flex gap-5 m-auto bg-white p-5 rounded-lg'>
            <div className='bg-veryLightGray flex flex-col justify-around h-[inherit] p-2 items-center rounded'>
                <button>
                    <img src={plusicon} alt="plus" />
                </button>
                <span className='font-bold text-moderateBlue'>12</span>
                <button>
                    <img src={minusicon} alt="minus" />
                </button>
            </div>

            <div>
                <div className='flex gap-3 py-2 items-center'>
                    <img className='h-[30px]' src={amyrobson} alt="avatar" />
                    <h3 className='text-darkBlue font-bold'>amyrobson</h3>
                    <p className='text-grayishBlue'>1 month ago</p>
                    <button className='ml-auto flex items-center text-moderateBlue font-bold gap-2'>
                        <img src={replyicon} alt="reply" />
                        <p>Reply</p>
                    </button>
                </div>

                <div>
                    <p className='text-grayishBlue'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis velit, est tempora fugiat doloribus obcaecati quos eius, voluptatibus nulla minus rerum expedita possimus sequi suscipit! Omnis laudantium quibusdam quod iusto!
                    </p>
                </div>
            </div>
        </div>

    </div>
  )
}
