"use client";
import Link from "next/link";
import Container from "../Container";
import AdminNavItem from "./AdminNavItem";
import { FaClipboardList } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { MdLibraryAdd, MdDns, MdFormatListBulleted } from "react-icons/md";

function AdminNav() {
  const pathName = usePathname();
  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href={"/admin"}>
            <AdminNavItem
              label="Summary"
              icon={FaClipboardList}
              selected={pathName === "/admin"}
            />
          </Link>
          <Link href={"/admin/add-products"}>
            <AdminNavItem
              label="Add Products"
              icon={MdLibraryAdd}
              selected={pathName === "/admin/add-products"}
            />
          </Link>
          <Link href={"/admin/manage-products"}>
            <AdminNavItem
              label="Manage Products"
              icon={MdDns}
              selected={pathName === "/admin/manage-products"}
            />
          </Link>
          <Link href={"/admin/manage-orders"}>
            <AdminNavItem
              label="Manage Orders"
              icon={MdFormatListBulleted}
              selected={pathName === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default AdminNav;
