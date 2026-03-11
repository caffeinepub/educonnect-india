import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Blog from "./pages/Blog";
import BookClass from "./pages/BookClass";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Messaging from "./pages/Messaging";
import Payment from "./pages/Payment";
import PostRequirement from "./pages/PostRequirement";
import StudentRegistration from "./pages/StudentRegistration";
import StudyMaterials from "./pages/StudyMaterials";
import Subjects from "./pages/Subjects";
import TutorListing from "./pages/TutorListing";
import TutorProfile from "./pages/TutorProfile";
import TutorRegistration from "./pages/TutorRegistration";

const queryClient = new QueryClient();

function RootLayout() {
  const routerState = useRouterState();
  const isAdminPage = routerState.location.pathname.startsWith("/admin");
  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <Navbar />}
      <div className="flex-1">
        <Outlet />
      </div>
      {!isAdminPage && <Footer />}
      <Toaster />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const subjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subjects",
  component: Subjects,
});
const bookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book",
  component: BookClass,
});
const materialsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/materials",
  component: StudyMaterials,
});
const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: Blog,
});
const tutorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tutors",
  component: TutorListing,
});
const tutorProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tutors/$tutorId",
  component: TutorProfile,
});
const tutorRegRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register-tutor",
  component: TutorRegistration,
});
const studentRegRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register-student",
  component: StudentRegistration,
});
const postReqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/post-requirement",
  component: PostRequirement,
});
const messagingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/messaging",
  component: Messaging,
});
const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment",
  component: Payment,
  validateSearch: (search: Record<string, unknown>) => ({
    tutorId: (search.tutorId as string) || "",
    tutorName: (search.tutorName as string) || "",
    amount: Number(search.amount) || 500,
  }),
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboard,
});
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-login",
  component: AdminLogin,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  subjectsRoute,
  bookRoute,
  materialsRoute,
  blogRoute,
  tutorsRoute,
  tutorProfileRoute,
  tutorRegRoute,
  studentRegRoute,
  postReqRoute,
  messagingRoute,
  paymentRoute,
  adminRoute,
  adminLoginRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
