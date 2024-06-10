import { render, screen } from "@testing-library/react";
import Login from "../Login";

beforeAll(() => {
  console.log("test started");
});

afterAll(() => {
  console.log("test ended");
});

test('renders the "Login" message', () => {
  render(<Login />);
  const heading1 = screen.getByDisplayValue("Login");
  const txtloginid = screen.getByPlaceholderText("Login Id");
  const txtpassword = screen.getByPlaceholderText("Password");
  const btnsubmit = screen.getByTestId("btnSubmit");
  expect(heading1).toBeInTheDocument();
  expect(txtloginid).toBeInTheDocument();
  expect(txtpassword).toBeInTheDocument();
  expect(btnsubmit).toBeInTheDocument();
});
