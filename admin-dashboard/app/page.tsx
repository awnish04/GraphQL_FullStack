// "use client";
// import { ChartBarInteractive } from "@/components/ui/AreaChart/chart-bar-interactive";
// import { ChartAreaInteractive } from "@/components/ui/AreaChart/salesdetailschart";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Users, Box, ChartLine, History } from "lucide-react";
// export default function DashboardPage() {
//   // const pageTitle = useActivePage();
//   return (
//     <div className="space-y-4">
//       {/* <h2 className="text-3xl font-bold tracking-tight">{pageTitle}</h2> */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//             <Users className="h-10 w-10 text-primary" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">24</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Projects
//             </CardTitle>
//             <Box className="h-10 w-10 text-primary" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">12</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
//             <ChartLine className="h-10 w-10 text-primary" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">8</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Pending Projects
//             </CardTitle>
//             <History className="h-10 w-10 text-primary" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">6</div>
//           </CardContent>
//         </Card>
//       </div>
//       {/* <SalesDetailsChart /> */}
//       <ChartAreaInteractive />
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2"></div>
//       <ChartBarInteractive />
//     </div>
//   );
// }

// "use client";

// import { login, logout } from "@/lib/actions/auth";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function LoginPage() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (session) router.push("/dashboard");
//   }, [session, router]);
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
//       <div className="rounded-lg bg-white p-8 shadow-md">
//         <h1 className="mb-6 text-2xl font-bold text-black">
//           Admin Dashboard Login
//         </h1>
//         <button
//           onClick={() => login()}
//           className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
//         >
//           Sign in with GitHub
//         </button>

//         <button onClick={async () => await logout()}>Logout</button>
//       </div>
//     </div>
//   );
// }

// app/page.tsx
"use client";

import { login } from "@/lib/actions/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md max-w-sm w-full">
        <h1 className="mb-6 text-2xl font-bold text-center">Admin Dashboard</h1>
        <button
          onClick={() => login()}
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 transition"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
