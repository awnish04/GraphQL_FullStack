// "use client";
// import { AppSidebar } from "@/components/app-sidebar";
// import BreadcrumbCurrentPage from "@/components/BreadcrumbCurrentPage";
// import { ThemeProvider } from "@/components/theme-provider";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Toaster } from "@/components/ui/sonner";
// import { SessionProvider } from "next-auth/react";
// import { ReactNode } from "react";

// export default function DashboardLayout({ children }: { children: ReactNode }) {
//   return (
//     <div>
//       <SessionProvider>
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <SidebarProvider>
//             <AppSidebar />
//             <SidebarInset>
//               <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
//                 <div className="flex items-center gap-2 px-4">
//                   <SidebarTrigger className="-ml-1" />
//                   <Separator
//                     orientation="vertical"
//                     className="mr-2 data-[orientation=vertical]:h-4"
//                   />
//                   <Breadcrumb>
//                     <BreadcrumbList>
//                       <BreadcrumbSeparator className="hidden md:block" />
//                       <BreadcrumbItem>
//                         <BreadcrumbCurrentPage />
//                       </BreadcrumbItem>
//                     </BreadcrumbList>
//                   </Breadcrumb>
//                 </div>
//               </header>

//               <main className="flex-1 p-4 overflow-auto">{children}</main>
//             </SidebarInset>
//           </SidebarProvider>
//           <Toaster richColors position="top-right" />
//         </ThemeProvider>
//       </SessionProvider>
//     </div>
//   );
// }

// app/dashboard/layout.tsx
// import { redirect } from "next/navigation";
// import { auth } from "@/auth";
// import DashboardClientLayout from "./DashboardClientLayout";

// export default async function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await auth();

//   if (!session?.user) {
//     redirect("/");
//   }

//   return <DashboardClientLayout>{children}</DashboardClientLayout>;
// }



// app/dashboard/layout.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BreadcrumbCurrentPage from "@/components/BreadcrumbCurrentPage";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) redirect("/");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b bg-background/50 backdrop-blur-md">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbCurrentPage />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
