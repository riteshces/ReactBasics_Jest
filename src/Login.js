function Login() {
  return (
    <>
      <h1>Login</h1>
      <br />
      <input type="text" placeholder="Login Id" />
      <br />
      <input type="password" placeholder="Password" />
      <br />
      <input type="submit" value={"Login"} data-testid="btnSubmit" />
    </>
  );
}

export default Login;
