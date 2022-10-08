import Comment from "../components/Comment"
import PostComment from "../components/PostComment";
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from "../redux/commentsSlice";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function CmtsContainer() {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const { comments } = useSelector((store) => store.comments);
    const { currentUser } = useSelector((store) => store.comments)

    const postComment = () => {
        const date = formatDistanceToNow(new Date(), {addSuffix: true}); 
        const data = {
            "user": {...currentUser},
            "content": comment,
            "id": Math.random(),
            "score": 0,
            "replies": [],
            "createdAt": date,
        };
        {comment.length && dispatch(addComment(data))};
        setComment('');
    }
 

  return (
    <div className="flex flex-col gap-3 w-[90%] md:w-[50%] m-auto">
        {comments && comments.map((com) => (
            <>
            <Comment com={com} key={com.id} />
            <div>
                <div className="flex flex-col gap-3 w-[95%] ml-auto border-l-2 border-lightGray pl-8">
                    {com.replies.length > 0 && 
                        com.replies.map((reply) => (
                            <Comment key={reply.id} com={reply} />
                        ))
                    }
                </div>
            </div>
            </>
        ))}
        <PostComment comment={comment} func={postComment} setComment={setComment} btnText={'SEND'} /> 
    </div>
  )
}
