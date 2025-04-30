import Image from "next/image";
import Link from "next/link";


function Header(){
    return( 
    
    <header className="bg-white border-b shadow-sm px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link href='/'>
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-800">BrainMart</span>
            </div>
            </Link >

            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <Link href="/category">Category</Link>
              <Link href="/brain">Brainn</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/faqs" className="text-red-600 font-semibold">FAQs</Link>
            </nav>

            <div className="flex items-center gap-4">
                <Link href="/" className="text-sm font-medium text-yellow-500 hover:underline"></Link>

                <Link href="/">
                <Image src='/images/guy.png' alt='' width={24} height={24} />
                </Link>

                <Link href="/" className="text-sm text-gray-700 hover:underline">Login</Link>
            </div>
        </div>
    </header>
    )

}
export default Header;