import { TooltipProvider } from "@/components/ui/tooltip";
import UserProvider from "@/context/UserContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </UserProvider>
  );
};

export default Providers;
