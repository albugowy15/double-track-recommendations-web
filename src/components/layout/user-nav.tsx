import AccountDropdown from "@/components/layout/account-dropdown";
import LoginAction from "@/components/layout/login-action";
import { ModeToggle } from "@/components/mode-toggle";
import { getServerAuthSession } from "@/config/auth";

const UserNav = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="flex items-center gap-2">
      <ModeToggle />
      {session?.user ? <AccountDropdown session={session} /> : <LoginAction />}
    </div>
  );
};

export default UserNav;
