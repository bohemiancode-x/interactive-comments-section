import CmtsContainer from "./pages/CmtsContainer";
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from './redux/commentsSlice';
import { useEffect } from 'react';


function App() {
  const dispatch = useDispatch();
  const { active } = useSelector((store) => store.modal);

  
  useEffect(() => {
    dispatch(getComments())
  },[])

  return (
    <div className={active ? "bg-veryLightGray h-[100vh] py-10 font-body overflow-y-hidden" : "bg-veryLightGray h-full py-10 font-body"}>
      <CmtsContainer />
    </div>
  );
}

export default App;
