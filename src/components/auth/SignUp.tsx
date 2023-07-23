"use client";

import { ClerkLoaded, SignUp as SignUpClerk } from "@clerk/nextjs";
import Link from "next/link";
import Loader from "./Loader";

interface SignUpProps {
  isModal?: boolean;
  isPage?: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ isModal = false, isPage }) => {
  return (
    <div className="relative min-h-[260.25px]">
      <Loader />
      <ClerkLoaded>
        <SignUpClerk afterSignUpUrl="/app" signInUrl="/sign-in" />
        <div className="absolute text-sm bottom-[48px] left-[61px] link-on-signInUp">
          <span className="text-black/60">Have an account? </span>
          {isPage ? (
            <a href="/sign-in" className="focus-visible:ring-2 ring-gray-500">
              Sign in
            </a>
          ) : (
            <Link
              href="/sign-in"
              replace={isModal}
              className="focus-visible:ring-2 ring-gray-500"
            >
              Sign in
            </Link>
          )}
        </div>
      </ClerkLoaded>
    </div>
  );
};

export default SignUp;
