import React, { useContext } from "react";
import Navbar from "./Navbar";
import NavbarFarmers from "./NavbarFarmers";
import NavbarEducator from "./NavbarEducator";
import { AuthContext } from "../context/AuthContext"; // ✅ Import AuthContext

const NavbarSwitcher = () => {
  const { user, loading } = useContext(AuthContext); // ✅ Get user from context

  if (loading) return null; // Prevent flashing incorrect navbar

  if (!user) {
    return <Navbar />; // Default Navbar for non-logged-in users
  } else if (user.role === "Educator") {
    return <NavbarEducator />; // Navbar for Educators
  } else if (user.role === "Farmer") {
    return <NavbarFarmers />; // Navbar for Farmers
  }
};

export default NavbarSwitcher;
