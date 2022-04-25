import { useReducer } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import Modal from './Modal';
import GalleryCollection from './GalleryCollection/';

const initialState = { query: '', modalIsShown: false, title: '', src: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit = query => {
    this.setState({ query });
  };

  const closeModal = () => {
    this.setState(prev => ({
      ...prev,
      modalIsShown: false,
      title: '',
      src: '',
    }));
  };

  const onImageClick = e => {
    const modalSrc = e.target.dataset.src;
    const title = e.target.alt;
    this.setState(prev => ({
      ...prev,
      src: modalSrc,
      title,
      modalIsShown: true,
    }));
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      {/* <GalleryCollection query={query} onImageClick={onImageClick} /> */}
      {/* {modalIsShown && <Modal src={src} alt={title} closeModal={closeModal} />} */}
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
