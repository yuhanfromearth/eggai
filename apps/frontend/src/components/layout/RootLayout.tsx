import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-screen h-screen flex flex-col min-h-screen">
      {children}
    </div>
  );
}

export default RootLayout;
