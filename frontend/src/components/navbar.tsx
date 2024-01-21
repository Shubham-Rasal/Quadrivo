import React from "react";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav style={{ padding: "20px" }}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold">
            Quadrivo
          </Link>
          <div className="flex space-x-4 ml-8">
            <Link href="/projects">Projects</Link>
            <Link href="/agreements">Agreements</Link>
            <Link href="/register">Register</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ConnectKitButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
