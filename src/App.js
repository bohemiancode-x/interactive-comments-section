import Comment from "./components/Comment";
import PostComment from "./components/PostComment";


function App() {
  return (
    <div className="bg-veryLightGray h-[100vh] py-10 font-body">
      <Comment />
      <PostComment />
    </div>
  );
}

export default App;
