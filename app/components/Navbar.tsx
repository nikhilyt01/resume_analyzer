import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
    const { auth } = usePuterStore();

    return (
        <nav className="navbar mt-4 border border-gray-100 shadow-sm">
            <Link to="/">
                <p className="text-2xl font-bold text-gradient">Resumind</p>
            </Link>
            <div className="flex items-center gap-4">
                {auth.isAuthenticated ? (
                    <>
                        <Link to="/upload" className="primary-button !w-fit px-6">
                            Upload Resume
                        </Link>
                        <button onClick={auth.signOut} className="text-gray-600 font-medium hover:text-gray-900 transition-colors cursor-pointer">
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={auth.signIn} className="text-gray-600 font-medium hover:text-gray-900 transition-colors cursor-pointer">
                            Login
                        </button>
                        <button onClick={auth.signIn} className="primary-button !w-fit px-6">
                            Get Started
                        </button>
                    </>
                )}
            </div>
        </nav>
    )
}
export default Navbar
