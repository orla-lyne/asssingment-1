import { Outlet } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import "./Layouts.css";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="main-content"><Outlet /></main>
    </>
  );
}
