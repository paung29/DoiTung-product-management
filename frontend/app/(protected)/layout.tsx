export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <header>
                <h2>Protected Area</h2>
            </header>
            <main>{children}</main>
        </div>
    );
}