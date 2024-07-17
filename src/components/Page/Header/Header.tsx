import { PopoverContent, PopoverListItemLink, PopoverPortal, PopoverRoot, PopoverTrigger } from "@/components/Popover/Popover";
import tw from "tailwind-styled-components";
import SignOutAltIcon from "@/assets/general/SignOutAlt-Icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/auth/auth.slice";
import Button from "@/components/Layout/Button/Button";

const HeaderWrapper = tw.header`
  px-5 py-5 w-full bg-antiqueWhite
  border-b-2 border-black border-opacity-10 
  flex justify-end
`;

const Header = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();


  const logoutUser = () => {
    dispatch(logout())

  }

  return (
    <HeaderWrapper>
      <PopoverRoot>
        <PopoverTrigger>
          <Button variant="text">
            Welcome, <span className="italic">{ user?.name }</span>
          </Button>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent className="w-[150px]" sideOffset={5} align="end">
            <Button variant="text" className="py-2 px-2 w-full" onClick={logoutUser}>
                <SignOutAltIcon className="w-4 h-4 [&>path]:fill-amaranthPurple group-hover:[&>path]:fill-antiqueWhite" />
                <span className="text-xs font-bold">Sign Out</span>
              </Button>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </HeaderWrapper>
  );

}

export default Header;