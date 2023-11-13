import AccountDropdown from "@/components/layout/account-dropdown";
import LoginAction from "@/components/layout/login-action";
import { getServerAuthSession } from "@/config/auth";

const UserNav = async () => {
  const session = await getServerAuthSession();
  return (
    <div className="flex items-center gap-2">
      {session?.user ? <AccountDropdown session={session} /> : <LoginAction />}
    </div>
  );
};

export default UserNav;
