import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function HeaderEducation({ option, onClick, isSelected, imageToShow }) {
  const router = useRouter();
  const isWhiteText =
    router.pathname === "/college" ||
    router.pathname === "/courses" ||
    router.pathname === "/profile" ||
    router.pathname === "/scholarship" ||
    router.pathname === "/competition";

  const additionalMargin =
    option.label ==="Scholarship" || option.label === "Competitive Exam" || option.label === "Find Occupation" ? "mt-1.5" : "mt-1";                         

  return (
    <div onClick={onClick} className="text-center">
      <Link href={option.url}>
        <img
          src={imageToShow}
          alt={option.alt}
          width={100}
          height={100}
          className="mx-auto"
        />
      </Link>
      <p
        className={`${additionalMargin} ${
          isWhiteText ? "text-white" : "text-black"
        } text-sm`}
      >
        {option.label}
      </p>
    </div>
  );
}

export default HeaderEducation;