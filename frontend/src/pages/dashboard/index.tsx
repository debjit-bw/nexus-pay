import Layout from "@/components/Layout/Layout";
import ReceiveModal from "@/components/ReceiveModal/ReceiveModal";
import ScannerModal from "@/components/ScannerModal/ScannerModal";
import TransferModal from "@/components/TransferModal/TransferModal";
import { get_nexus_ids_starting_with, getBalances } from "@/core/transactions";
import { divideByTenMillion } from "@/core/utils";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home: NextPage = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferError, setTransferError] = useState("");

  const { activeAccount, idToken } = useSelector(
    (state: any) => state.authSlice
  );

  const router = useRouter();

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchBalances = async () => {
      if (activeAccount) {
        const getBalancesResponse = await getBalances(activeAccount);
        console.log(divideByTenMillion(getBalancesResponse[0]?.amount));

        setBalance(divideByTenMillion(getBalancesResponse[0]?.amount));
      }
    };

    fetchBalances();
  }, [activeAccount]);

  const handleGoogleSignIn = () => {
    router.push("/LoginPage");
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setRecipientAddress(value);

    if (value.length > 2) {
      try {
        const id_token = idToken?.state?.accounts[0]?.idToken?.raw;
        const results: string[] = await get_nexus_ids_starting_with(
          id_token,
          value
        );

        setSuggestions(results);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Transfer | NexusPay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center px-4 py-12 text-center lg:mr-[10px]">
        <h1 className="mb-8 mt-8 text-4xl font-bold text-secondary">
          Transfer <span className="text-white">anywhere</span>
        </h1>

        <div className="w-full max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="0x123... or yourname.nexus"
              className="input input-bordered input-primary w-full rounded-full pr-12"
              // value={recipientAddress}
              // onChange={handleInputChange}
              value={recipientAddress}
              onChange={handleInputChange}
            />
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-primary"
              onClick={() => handlePopupOpen()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </button>

            {suggestions?.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {suggestions?.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setRecipientAddress(suggestion);
                      setSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {isPopupOpen && (
            <div className="mt-4">
              <ScannerModal
                onClose={handlePopupClose}
                setRecipientAddress={setRecipientAddress}
                handlePopupClose={handlePopupClose}
              />
            </div>
          )}
          {isReceiveModalOpen && (
            <ReceiveModal
              onClose={() => setIsReceiveModalOpen(false)}
              activeAccount={activeAccount}
            />
          )}

          <div className="mt-6 flex justify-center gap-4">
            <button
              className="btn btn-primary"
              onClick={() => setIsReceiveModalOpen(true)}
            >
              Receive
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsTransferModalOpen(true)}
            >
              Transfer
            </button>
          </div>
        </div>

        {isTransferModalOpen && (
          <TransferModal
            onClose={() => setIsTransferModalOpen(false)}
            balance={balance}
            transferAmount={transferAmount}
            setTransferAmount={setTransferAmount}
            setTransferError={setTransferError}
            recipientAddress={recipientAddress}
            transferError={transferError}
          />
        )}
      </main>
    </Layout>
  );
};

export default Home;
