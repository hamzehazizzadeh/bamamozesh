const AuthLayout = ({ children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-page-height">{children}</div>
    </div>
  );
};

export default AuthLayout;
