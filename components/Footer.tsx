import React from 'react';
import Link from "next/link";

const Footer = () => {
    return (
        <div className="flex items-center justify-center gap-4 w-full pt-10">
            <Link href='/privacy-policy'>Privacy Policy</Link>
            <Link href='/terms-of-service'>Terms of Service</Link>
        </div>
    );
}

export default Footer;
