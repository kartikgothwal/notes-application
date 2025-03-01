import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import { ThemeToggle } from "@/components/ThemeToggle";

import AuthLinks from "./AuthLinks";
import { useAuth } from "@/components/context/AuthContext";

interface NavigationProps {
  ulClass: string;
  handleClick?: () => void;
}

const Navigation: FC<NavigationProps> = ({ ulClass, handleClick }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const navLinks = [{ id: 1, name: "About Me", link: "/about" }];

  if (isAuthenticated) {
    navLinks.splice(
      0,
      1,
      { id: 1, name: "Dashboard", link: "/dashboard" },
      { id: 2, name: "Profile", link: "/profile" },
      { id: 3, name: "About Me", link: "/about" }
    );
  }
  return (
    <ul className={ulClass}>
      <ul className="flex flex-col items-center justify-start flex-1 gap-2 md:gap-5 md:flex-row">
        {navLinks.map(({ id, link, name }) => {
          const isActive = location.pathname === link;
          return (
            <li
              key={id}
              className={`md:px-2 capitalize font-medium text-lg cursor-pointer border-b-2 md:border-b-0 hover:border-b-accent-foreground/80 ${
                isActive
                  ? "text-accent-foreground border-b-accent-foreground/75"
                  : "text-accent-foreground/50"
              } duration-500 hover:text-accent-foreground/80 my-4 py-1 md:my-0 md:py-0`}
            >
              <Link onClick={handleClick} to={link}>
                {" "}
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center md:gap-1">
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
        <AuthLinks />
      </div>
    </ul>
  );
};

export default Navigation;
