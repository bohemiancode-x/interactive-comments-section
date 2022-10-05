import Comment from "./components/Comment";
import PostComment from "./components/PostComment";
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from './redux/commentsSlice';
import { useEffect } from 'react';


function App() {
  const dispatch = useDispatch();
  const { comments } = useSelector((store) => store.comments)
  console.log(comments);

  
  useEffect(() => {
    dispatch(getComments())
  },[])

  return (
    <div className="bg-veryLightGray h-[100vh] py-10 font-body">
      <Comment />
      <PostComment />
    </div>
  );
}

export default App;
