import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
    return (
        <header className="mx-auto flex max-w-screen-xl items-center px-3 py-2.5 2xl:max-w-screen-2xl">
            <Link href={'/'} className="mr-auto text-2xl flex items-center gap-2">
                <Image
                    src="/logo.svg"
                    alt="resumave"
                    height={30}
                    width={30}
                />
                <span className="text-gradient">Resumave</span>
            </Link>
        </header>
    );
};

export default Header;
