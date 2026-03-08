"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
// import Burger from "../ui/Burger/Burger";
import "./Navbar.scss";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import useHasMounted from "@/hooks/useHasMounted";
// import { NextResponse } from "next/server";
// import { LOGOUT_USER } from "@/apolo/mutations";
// import { useStateContext } from "@/providers/StateProvider";
// import { User } from "@/types/user";
import Image from "next/image";

const Navbar: React.FC = () => {
  const hasMounted = useHasMounted();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");
  //------------------
  const pages = [
    { title: "Home", path: "/" },
    { title: "ADTV", path: "/adtv" },
  ];

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname, isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Ждём, пока смонтируется компонент
  if (!hasMounted) return null;

  return (
    <nav className="fixed top-0 left-0 w-full bg-[var(--lightest-navy)] py-6 shadow-md z-500">
      <div className="container">
        <div className="relative flex items-center ">
          <ul className={`navigation `}>
            {pages.map(({ title, path }) => (
              <li key={path}>
                <Link href={path} tabIndex={-1}>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="navigationItem"
                    initial={false}
                    animate={{
                      color: pathname === path ? "#101046" : "grey",
                    }}
                  >
                    {pathname === path && (
                      <motion.div
                        className="indicator"
                        style={{ borderRadius: 32 }}
                      />
                    )}
                    {title}
                  </motion.button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
