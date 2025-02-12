/** @format */

import { HomeNavBar } from "@/components/ui";

const HomePageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <HomeNavBar />
      <main>{children}</main>
    </>
  );
};

export default HomePageLayout;
