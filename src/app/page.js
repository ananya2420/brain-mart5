import Image from "next/image";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartPage from "./components/cartpage/CartPage";



export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <CartPage />
      <Footer />
    </div>
  );
}
