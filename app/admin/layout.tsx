import AdminMenu from "@/components/admin/AdminMenu";
import Logo from "@/components/ui/Logo";
import ToastNotification from "@/components/ui/ToastNotification";
import { verifySession } from "@/src/auth/dal";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const { user } = await verifySession()

  return (
    <>
      <header className='bg-purple-950 py-5'>
        <div className='max-w-5xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
          <div className='w-96'>
            <Link href={'/admin'}>
              <Logo />
            </Link>
          </div>
          <AdminMenu
            user={user}
          />
        </div>
      </header>
      <section className='max-w-5xl mx-auto mt-20 p-3 py-10'>
        {children}
      </section>
      <ToastNotification />

      <footer className='py-5'>
        <p className='text-center'>
          All Rights Reserved {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}