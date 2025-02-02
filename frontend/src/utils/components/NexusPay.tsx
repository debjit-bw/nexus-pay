import React, { useState } from "react";
import { RequestIframeProps } from "./types";

type RequiredRequestIframeProps = Required<RequestIframeProps>;
const NexusPay: React.FC<RequiredRequestIframeProps> = ({
  name,
  onClick,
  details,
  amount,
  buttonClassName,
  onClose,
  open,
  token,
  recipient_wallet,
}) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(
        "https://nexus-send-request-876401151866.us-central1.run.app",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 12345890",
          },
          body: JSON.stringify({
            name: name,
            details: details,
            amount: amount,
            token: token,
            email_to_request: email,
            callback_url:
              "https://nexus-test-txfill-callback-876401151866.us-central1.run.app",
            recipient_wallet: recipient_wallet,
          }),
        }
      );
      const data = await response.json();
      setRequestSent(true);
      setMessage("Request sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      setMessage("Failed to send request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={onClick}
          className={
            buttonClassName ||
            "px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          }
        >
          Pay with NexusPay
        </button>
      )}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 p-4">
          <div
            className="rounded-lg shadow-xl w-full max-w-sm sm:max-w-md relative"
            style={{ backgroundColor: "#141a1f" }}
          >
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-200"
              onClick={onClose}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="p-4 sm:p-6 md:p-8">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  NexusPay Payment Request
                </h2>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm sm:text-base text-gray-300">
                    {details}
                  </p>
                </div>
              </div>

              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2"
              >
                Amount to Process:
              </label>
              <div className="bg-gray-700 rounded-lg p-3 mb-4 flex items-center justify-between cursor-not-allowed">
                <div className="flex w-full justify-between">
                  <p className="text-base sm:text-lg font-bold text-white">
                    {token === "USD" ? `$${amount}` : `${amount}`}
                  </p>
                  <span className="text-md sm:text-sm text-gray-400">
                    {token === "USD" ? "USD" : "APT"}
                  </span>
                </div>
              </div>
              {!requestSent ? (
                <>
                  <div className="mb-4 sm:mb-6">
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2"
                    >
                      Email to request payment:
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white text-sm sm:text-base rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : "Send Payment Request"}
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Request Sent Successfully!
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    Please open your NexusPay app and approve the request.
                  </p>
                </div>
              )}

              {message && (
                <p
                  className={`mt-4 text-sm ${
                    message.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NexusPay;
