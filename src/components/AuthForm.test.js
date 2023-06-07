import { render, screen } from "@testing-library/react";
import AuthForm from "./AuthForm";

describe("Authentication", () => {
  test("reenders when login is clicked", () => {
    render(<AuthForm />);

    const outputElement = screen.getByText("Login");
    expect(outputElement).toBeInTheDocument();
  });
});
