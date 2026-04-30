"use client";

import { useState } from "react";

const INPUT_CLASS =
  "w-full rounded-full border border-[#DCCFB3] bg-white px-5 py-3 text-sm text-[#1A1A1A] outline-none transition placeholder:text-[#9A9285] focus:border-[#B89B5E]";

const BUTTON_CLASS =
  "inline-flex w-full items-center justify-center rounded-full border border-[#B89B5E] bg-[#1A1A1A] px-6 py-3 text-sm tracking-wide text-white transition hover:bg-[#2A2A2A] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto";

type ResendState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

export default function ResendSetupLinkForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ResendState>({
    status: "idle",
    message: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !normalizedEmail.includes("@")) {
      setState({
        status: "error",
        message: "Please enter the same email address used at checkout.",
      });
      return;
    }

    setState({
      status: "loading",
      message: "Sending secure setup link...",
    });

    try {
      const response = await fetch("/api/auth/resend-setup-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || data.ok === false) {
        setState({
          status: "error",
          message:
            data.message ??
            "We could not resend the setup link right now. Please try again.",
        });
        return;
      }

      setState({
        status: "success",
        message:
          data.message ??
          "If this email is connected to advisory access, a secure setup link will be sent shortly.",
      });
    } catch {
      setState({
        status: "error",
        message:
          "We could not resend the setup link right now. Please try again.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="resend-setup-email"
          className="mb-2 block text-sm font-medium text-[#1A1A1A]"
        >
          Checkout email address
        </label>

        <input
          id="resend-setup-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter the email used at checkout"
          className={INPUT_CLASS}
          autoComplete="email"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className={BUTTON_CLASS}
          disabled={state.status === "loading"}
        >
          {state.status === "loading"
            ? "Sending Setup Link..."
            : "Resend Setup Link"}
        </button>
      </div>

      {state.message ? (
        <p
          className={`text-sm leading-relaxed ${
            state.status === "error" ? "text-red-700" : "text-[#5F584C]"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <p className="text-xs leading-relaxed text-[#6A6256]">
        For privacy, this form does not confirm whether an email address exists.
        If the email is connected to paid advisory access, a new secure setup
        link will be sent.
      </p>
    </form>
  );
}