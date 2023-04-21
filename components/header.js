import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header>
      <div>
        <Image src={'/images/nyan.png'} width={50} height={50} alt={'logo'} />
        <nav>
          <Link href="/" passHref>
            Home
          </Link>
          <Link href="/events" passHref>
            Events
          </Link>
          <Link href="/about" passHref>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
