import React from "react";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-teal-700 text-slate-200 text-sm mt-16 ">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="font-bold text-base mb-2">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">TVs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service </h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchange</Link>
            <Link href="#">Watches</Link>
            <Link href="#">TVs</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis, harum quis rerum voluptate, a dolorem tenetur maxime
              eaque sed placeat impedit. Veniam distinctio maxime necessitatibus
              fugiat error, autem non beatae similique incidunt expedita nostrum
              earum dicta deleniti cum. Saepe quis, eligendi distinctio ea
              laborum iure quisquam. Repellat facere hic magni.
            </p>
            <p>&copy;{new Date().getFullYear()} E-shop. All rights reserved</p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <FaFacebook size={24} />
              </Link>
              <Link href="#">
                <FaTwitter size={24} />
              </Link>
              <Link href="#">
                <FaYoutube size={24} />
              </Link>
              <Link href="#">
                <FaInstagram size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
}
