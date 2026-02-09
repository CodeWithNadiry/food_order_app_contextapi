const Button = ({ children, textOnly, customClasses, ...props }) => {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + customClasses;

  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;