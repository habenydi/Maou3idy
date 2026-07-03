import Link from "next/link";

export default function PrivacyPolicy() {
    const year = new Date().getFullYear();
    return (
        <>
        <footer className="w-full border-t border-slate-200 bg-slate-50">
            <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-screen-2xl mx-auto">
            <div className="text-xs text-slate-500 font-inter">© {year} Maou<span className="text-blue-500">3</span>idy Clinical Systems. All rights reserved.</div>
            <div className="flex flex-wrap justify-center gap-8 font-inter text-xs">
                <Link href="/privacy-policy" className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Privacy Policy</Link>
                <Link href="/terms-of-service" className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Terms of Service</Link>
                <Link href="/contact-support" className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Contact Support</Link>
                <Link href="/healthcare-partners" className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer">Healthcare Partners</Link>
            </div>
            </div>
        </footer>
        </>
    );
}