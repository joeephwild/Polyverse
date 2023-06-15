import React, { useState } from "react";
import { Navbar, ProfileForm } from "../components";
import { usePolyverseContext } from "../context/Auth";

const SignIn = () => {
  const [active, setActive] = useState(false);
  const { address } = usePolyverseContext();

  
  return (
    <>
      <Navbar />
      <div className="min-h-[800px] w-full flex items-center justify-center">
        {!address && (
          <button
            onClick={() => setActive(true)}
            className="gradient-border-button border-4 w-[300px] rounded-full relative  py-4 text-lg font-medium text-white"
          >
            Connect Wallet
          </button>
        )}

        {address && (
          <ProfileForm />
        )}
      </div>
    </>
  );
};

export default SignIn;
