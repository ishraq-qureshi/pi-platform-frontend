import tw from "tailwind-styled-components";
import DashboardIcon from "@/assets/general/Dashboard-Icon.svg";
import SettingIcon from "@/assets/general/Settings-Icon.svg";
import RasberryPiIcon from "@/assets/general/Projects-Icon.svg";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import CustomLink from "@/components/CustomLink/CustomLink";


const SidebarWrapper = tw.div`
  flex flex-col w-[250px]
  bg-amaranthPurple h-[100vh]
  fixed top-0 bottom-0 left-0
  shadow-lg gap-2
`;

const AppLogo = tw.div`
  px-5 py-5
  shadow-md
`;

const NavList = tw.ul`
  flex flex-col px-2
  gap-2
`;

const ListItem = tw.li``;

const ListItemLink = tw(CustomLink)`
  text-antiqueWhite
  block py-4 px-5
  rounded-md group
  hover:bg-antiqueWhite hover:text-amaranthPurple
  flex gap-2 items-center
`;

const Sidebar = () => {

  const pathName = usePathname();

  return (
    <SidebarWrapper>
      <AppLogo>
        <h3 className="text-lg text-antiqueWhite font-bold">RasberryPi Platform</h3>        
      </AppLogo>
      <NavList>
        <ListItem>
          <ListItemLink href="/dashboard" className={pathName === "/dashboard" ? "bg-antiqueWhite text-amaranthPurple" : ""}>
            <DashboardIcon className={cn(pathName === "/dashboard" ? "[&>path]:fill-amaranthPurple" : "[&>path]:fill-antiqueWhite group-hover:[&>path]:fill-amaranthPurple", "w-5 h-5" )}/>
            Dashboard
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink href="/manage-rasberrypi" className={pathName === "/manage-rasberrypi" ? "bg-antiqueWhite text-amaranthPurple" : ""}>
            <RasberryPiIcon className={cn(pathName === "/manage-rasberrypi" ? "[&>path]:fill-amaranthPurple" : "[&>path]:fill-antiqueWhite group-hover:[&>path]:fill-amaranthPurple", "w-5 h-5" )}/>
            Manage RasberryPi
          </ListItemLink>
        </ListItem>
        <ListItem>
          <ListItemLink href="setting" className={pathName === "/setting" ? "bg-antiqueWhite text-amaranthPurple" : ""}>
            <SettingIcon className={cn(pathName === "/setting" ? "[&>path]:fill-amaranthPurple" : "[&>path]:fill-antiqueWhite group-hover:[&>path]:fill-amaranthPurple", "w-5 h-5" )}/>
            Settings
          </ListItemLink>
        </ListItem>
      </NavList>
    </SidebarWrapper>
  );
}

export default Sidebar;