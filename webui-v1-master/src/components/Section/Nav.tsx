import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import Link from "next/link";
import Darkmode from "../ui/Darkmode";
import Logoutbtn from "../ui/Logoutbutton";
import UserNav from "../ui/UserNav";

const Nav = () => {
  return (
    <Navbar className="" isBlurred isBordered maxWidth="xl">
      <NavbarBrand className="text-2xl font-semibold">
        <Link className="ml-2 sm:ml-8" href={"/"}>
          DEV Commits
        </Link>
      </NavbarBrand>
      <NavbarBrand className="text-2xl font-semibold">
        {/* <Input
              className="lg:w-[500px] w-40"
              placeholder="Search user"
              endContent={
                <>
                  <button>
                    <Search size={20} />
                  </button>
                </>
              }
            /> */}
      </NavbarBrand>

      <NavbarContent justify="end" className="sm:hidden">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent justify="end" className="hidden sm:flex">
        <NavbarItem>
          <UserNav />
        </NavbarItem>
        <NavbarItem>
          <Darkmode />
        </NavbarItem>
        <NavbarItem>
          <Logoutbtn />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="items-center justify-center">
        <NavbarMenuItem>
          <UserNav />
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Darkmode />
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Logoutbtn />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Nav;
