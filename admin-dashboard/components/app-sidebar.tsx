// "use client";

// import * as React from "react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from "@/components/ui/sidebar";

// import { NavMain } from "@/components/nav-main";
// // import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
// import { sidebarNavItems } from "@/config/sidebar-nav";
// import { GalleryVerticalEnd } from "lucide-react";

// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     // avatar: "/avatars/shadcn.jpg",
//   },
//   teams: [
//     {
//       name: "Awnish",
//       logo: GalleryVerticalEnd,
//       plan: "Portfolio",
//     },
//   ],
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <TeamSwitcher teams={data.teams} />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={sidebarNavItems} />
//       </SidebarContent>
//       <SidebarFooter>
//         {/* <NavUser user={data.user} /> */}
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

// "use client";

// import * as React from "react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import { NavMain } from "@/components/nav-main";
// import { TeamSwitcher } from "@/components/team-switcher";
// import { sidebarNavItems } from "@/config/sidebar-nav";
// import { GalleryVerticalEnd, LogOut } from "lucide-react";
// import { logout } from "@/lib/actions/auth";
// import { Button } from "@/components/ui/button";

// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//   },
//   teams: [
//     {
//       name: "Awnish",
//       logo: GalleryVerticalEnd,
//       plan: "Portfolio",
//     },
//   ],
// };

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <TeamSwitcher teams={data.teams} />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavMain items={sidebarNavItems} />
//       </SidebarContent>
//       <SidebarFooter>
//         <form action={logout} className="w-full">
//           <Button
//             type="submit"
//             variant="ghost"
//             className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
//           >
//             <LogOut className="mr-2 h-4 w-4" />
//             Logout
//           </Button>
//         </form>
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

// components/app-sidebar.tsx
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { sidebarNavItems } from "@/config/sidebar-nav";
import { GalleryVerticalEnd } from "lucide-react";

const teams = [
  { name: "Awnish", logo: GalleryVerticalEnd, plan: "Portfolio" },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={sidebarNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}