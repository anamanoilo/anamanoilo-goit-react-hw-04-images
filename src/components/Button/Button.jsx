import PropTypes from 'prop-types';

function Button({ onClick }) {
  return (
    <button type="button" className="Button" onClick={onClick}>
      Load More
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
