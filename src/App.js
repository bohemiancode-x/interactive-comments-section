import CmtsContainer from "./pages/CmtsContainer";
import { useDispatch, useSelector } from 'react-redux';
import { getComments } from './redux/commentsSlice';
import { useEffect } from 'react';
import Modal from "./components/Modal";


function App() {
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getComments())
  },[])

  return (
    <div className="bg-veryLightGray h-full py-10 font-body">
      <CmtsContainer />
      <Modal />
    </div>
  );
}

export default App;
