/** @format */

import { HomeNavBar } from "@/components/ui";
import Footer from "@/components/ui/footer";

const HomePageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <HomeNavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default HomePageLayout;
