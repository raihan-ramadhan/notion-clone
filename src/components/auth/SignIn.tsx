"use client";

import { SignIn as SignInClerk, ClerkLoaded } from "@clerk/nextjs";
import Link from "next/link";
import Loader from "./Loader";
import CloseModal from "../CloseModal";

interface SignInProps {
  isModal?: boolean;
  isPage?: boolean;
}

const SignIn: React.FC<SignInProps> = ({ isModal = false, isPage }) => {
  return (
    <div className="relative min-h-[260.25px]">
      <Loader />
      <ClerkLoaded>
        {isModal && (
          <div className="closeModal">
            <CloseModal />
          </div>
        )}
        <SignInClerk afterSignInUrl="/app" signUpUrl="/sign-up" />
        <div className="hideAfterClerkLoaded absolute text-sm bottom-[48px] left-[61px]">
          <span className="text-primary/60">No account? </span>
          {isPage ? (
            <a href="/sign-up" className="focus-visible:ring-2 ring-gray-500">
              Sign up
            </a>
          ) : (
            <Link
              href="/sign-up"
              replace={isModal}
              className="focus-visible:ring-2 ring-gray-500"
            >
              Sign up
            </Link>
          )}
        </div>
      </ClerkLoaded>
    </div>
  );
};

export default SignIn;
