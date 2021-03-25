import "./Button.scss";

const Button = ({handleClick, disabled = true, children }) => {

  return (
    <button
    onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
