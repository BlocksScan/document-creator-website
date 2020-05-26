/* eslint-disable @typescript-eslint/no-empty-function */
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { WalletDecryption } from "./WalletDecryption";

describe("walletDecryption", () => {
  it("should fire onDecryptConfigFile with password when login button is clicked", () => {
    expect.assertions(1);
    const onDecryptConfigFile = jest.fn();
    render(
      <WalletDecryption
        isIncorrectPassword={false}
        isDecrypting={false}
        onDecryptConfigFile={onDecryptConfigFile}
        onResetConfigFile={() => {}}
      />
    );
    fireEvent.change(screen.getByTestId("password-field"), { target: { value: "foobar" } });
    fireEvent.click(screen.getByTestId("login-button"));
    expect(onDecryptConfigFile).toHaveBeenCalledWith("foobar");
  });

  it("should fire onResetConfigFile when reset button is clicked", () => {
    expect.assertions(1);
    const onResetConfigFile = jest.fn();
    render(
      <WalletDecryption
        isIncorrectPassword={false}
        isDecrypting={false}
        onResetConfigFile={onResetConfigFile}
        onDecryptConfigFile={() => {}}
      />
    );
    fireEvent.click(screen.getByTestId("reset-button"));
    // eslint-disable-next-line jest/prefer-called-with
    expect(onResetConfigFile).toHaveBeenCalled();
  });

  it("should disable onDecryptConfigFile and input when isDecrypting is true", () => {
    expect.assertions(2);
    const onDecryptConfigFile = jest.fn();
    render(
      <WalletDecryption
        isIncorrectPassword={false}
        isDecrypting={true}
        onDecryptConfigFile={onDecryptConfigFile}
        onResetConfigFile={() => {}}
      />
    );
    fireEvent.click(screen.getByTestId("login-button"));
    fireEvent.change(screen.getByTestId("password-field"), { target: { value: "foobar" } });
    expect(onDecryptConfigFile).not.toHaveBeenCalled();
    expect(screen.getByTestId("password-field")).not.toHaveTextContent("foobar");
  });

  it("should display error message if any", () => {
    expect.assertions(1);
    render(
      <WalletDecryption
        isIncorrectPassword={true}
        isDecrypting={false}
        onDecryptConfigFile={() => {}}
        onResetConfigFile={() => {}}
      />
    );
    expect(screen.queryByText(/Invalid password. Please try again./)).not.toBeNull();
  });
});
