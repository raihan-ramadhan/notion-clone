"use client";

import {
  ClerkLoaded,
  SignUp as SignUpClerk,
} from "@clerk/nextjs/app-beta/client";
import Link from "next/link";
import Loader from "./Loader";
import CloseModal from "../CloseModal";
import { useShowMobileNav } from "@/hooks/use-show-mobile-nav";

interface SignUpProps {
  isModal?: boolean;
  isPage?: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ isModal = false, isPage }) => {
  const { showMobileNav } = useShowMobileNav();

  return (
    <div className="relative min-h-[260.25px]">
      <Loader />
      <ClerkLoaded>
        {isModal && (
          <div className="closeModal">
            <CloseModal />
          </div>
        )}
        <SignUpClerk signInUrl="/sign-in" />
        <div className="absolute text-sm bottom-[48px] left-[61px] hideAfterClerkLoaded">
          <span className="text-primary/60">Have an account? </span>
          {isPage ? (
            <a href="/sign-in" className="focus-visible:ring-2 ring-gray-500">
              Sign in
            </a>
          ) : (
            <Link
              href={`/sign-in${showMobileNav ? "?showMobileNav=1" : ""}`}
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
