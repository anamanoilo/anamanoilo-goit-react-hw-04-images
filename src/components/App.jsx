import { useReducer } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import Modal from './Modal';
import GalleryCollection from './GalleryCollection/';
import { CONSTANT_TYPES, appReducer } from 'services/appReducer';
import api from 'services/Api';

const initialState = {
  query: '',
  modalIsShown: false,
  title: '',
  src: '',
};

const App = () => {
  const [{ src, title, modalIsShown, query }, dispatch] = useReducer(
    appReducer,
    initialState
  );

  const onSubmit = query => {
    dispatch({ type: CONSTANT_TYPES.QUERY, payload: query });
    api.resetPage();
  };

  const closeModal = () => {
    dispatch({ type: CONSTANT_TYPES.SRC, payload: '' });
    dispatch({ type: CONSTANT_TYPES.TITLE, payload: '' });
    dispatch({ type: CONSTANT_TYPES.MODAL, payload: false });
  };

  const onImageClick = e => {
    const modalSrc = e.target.dataset.src;
    const title = e.target.alt;
    dispatch({ type: CONSTANT_TYPES.SRC, payload: modalSrc });
    dispatch({ type: CONSTANT_TYPES.TITLE, payload: title });
    dispatch({ type: CONSTANT_TYPES.MODAL, payload: true });
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onSubmit} />
      <GalleryCollection query={query} onImageClick={onImageClick} />
      {modalIsShown && <Modal src={src} alt={title} closeModal={closeModal} />}
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
