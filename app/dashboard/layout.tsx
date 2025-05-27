import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <section>
      <main>{children}</main>
    </section>
  );
}

export default DashboardLayout;
