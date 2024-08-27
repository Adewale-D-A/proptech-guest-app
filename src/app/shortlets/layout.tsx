/** @format */

import { HomeNavBar } from "@/components/ui";
import Footer from "@/components/ui/footer";

const ShortletsLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <HomeNavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default ShortletsLayout;
