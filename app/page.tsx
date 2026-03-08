import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  // 1. SIGN-IN SCREEN (Light Theme Only)
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-8">
        <main className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-zinc-200 text-center">
          <h1 className="text-2xl font-bold mb-6 text-zinc-900">PunjabStack Dev Portal</h1>
          <p className="text-zinc-600 mb-8">Please sign in to access your project workspace.</p>
          <form action={async () => { "use server"; await signIn("github"); }}>
            <button className="w-full bg-[#003366] text-white py-3 rounded-lg hover:bg-[#002244] transition font-semibold">
              Sign in with GitHub
            </button>
          </form>
        </main>
      </div>
    );
  }

  // 2. MAIN PROJECT WORKSPACE (Light Theme Only)
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-zinc-200 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#003366] rounded-md flex items-center justify-center text-white font-bold">P</div>
          <span className="font-bold text-lg tracking-tight">PunjabStack Innovations</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             {session.user?.image && (
               <Image src={session.user.image} alt="User" width={32} height={32} className="rounded-full shadow-sm" />
             )}
             <span className="text-sm font-medium text-zinc-700">{session.user?.name}</span>
          </div>
          
          <form action={async () => { "use server"; await signOut(); }}>
            <button className="text-xs font-semibold text-red-600 hover:text-red-800 transition">
              Log Out
            </button>
          </form>
        </div>
      </nav>

      {/* Main Content Area - Start Building Here */}
      <main className="max-w-7xl mx-auto p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-extrabold text-zinc-900">Project Dashboard</h2>
          <p className="text-zinc-500">Welcome to your development workspace.</p>
        </header>
      </main>
    </div>
  );
}