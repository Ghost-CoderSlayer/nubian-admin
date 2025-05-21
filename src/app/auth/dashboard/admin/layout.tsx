import { ReactNode } from 'react';
import { UserButton, auth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { useRouter } from 'next/navigation';



export default function AdminLayout({ children }: {children: ReactNode }) {
    const { userId, sessionClaims } = auth();
    const router = useRouter();

    if (!userId || sessionClaims?.role !== 'admin') {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center space-y-4'>
                    <p className='text-muted-foreground'>You must be signed in as an <strong>Admin</strong>to access this page.</p>
                    <Button onClick={() => {
                        toast('Redirecting to login...', {
                            position: 'top-center',
                            duration: 2000,
                            className: 'bg-yellow-100 text-yellow-800 border border-yellow-300 shadow-lg animate-slide-in',
                            icon: '🔐',
                            dismissible: true
                            });
                        router.push('/admin-login')
                    }}>
                        Go to Login
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-background text-foreground'>
            <header className='bordor-b px-6 py-4 flex justify-between items-center bg-white shadow-sm'>
                <h1 className='text-xl font-bold text-yellow-600'>Admin Dashboard</h1>
                <div className='flex gap-3 items-center'>
                    <UserButton afterSignOutUrl="/admin-login" />
                </div>
            </header>
            <main className='px-6 py-8 max-w-7xl mx-auto'>
                {children}
            </main>
        </div>
    )

}

