import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <div >

<footer >
  <div className=" sm:px-6">
    <div className="lg:flex lg:items-start lg:gap-8 bg-black p-4">
      <div className="mt-8 grid grid-cols-1 gap-20 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-medium  text-brandSecondary">Get in touch</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <Link href="#" className="text-white transition hover:opacity-75"> About Us </Link>
            </li>

            <li>
              <Link href="#" className="text-white transition hover:opacity-75"> Careers </Link>
            </li>

            <li>
              <Link href="#" className="text-white transition hover:opacity-75"> Press Realease </Link>
            </li>

            <li>
              <Link href="#" className="text-white transition hover:opacity-75">Blog</Link>
            </li>

          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
        <p className="font-medium  text-brandSecondary">Connections</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <Link href="#" className="text-white transition hover:opacity-75"> Facebook</Link>
            </li>

            <li>
              <Link href="#" className="text-white transition hover:opacity-75">Twitter </Link>
            </li>

            <li>
              <Link href="#" className="text-white transition hover:opacity-75">Instagram </Link>
            </li>
            <li>
              <Link href="#" className="text-white transition hover:opacity-75">Youtube </Link>
            </li>
            <li>
              <Link href="#" className="text-white transition hover:opacity-75">LinkedIn </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
        <p className="font-medium  text-brandSecondary">Earnings</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <Link href="#" className="text-white transition hover:opacity-75">Becaome an Affliate</Link>
            </li>

            <li>
              <Link href="#" className="text-white transition hover:opacity-75"> Advertise your Product </Link>
            </li>

            <li>
              <Link href="#" className="text-white transition hover:opacity-75"> Sell on Market </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
        <p className="font-medium  text-brandSecondary">Account</p>

          <ul className="mt-6 space-y-4 text-sm">
            <li>
              <Link href="#" className="text-white transition hover:opacity-75"> Your Account </Link>
            </li>

            <li>
              <Link href="#" className="text-white transition hover:opacity-75"> Returns Center</Link>
            </li>

            <li>
              <Link href="#" className="text-white transition hover:opacity-75"> 100% Purcahse Protction</Link>
            </li>

            <li>
              <Link href="#" className="text-white transition hover:opacity-75"> Chat With Us </Link>
            </li>
            
            <li>
              <Link href="#" className="text-white transition hover:opacity-75">Help</Link>
            </li>
          </ul>
        </div>

        <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-start">
          <li>
            <Link
              href="#"
              rel="noreferrer"
              target="_blank"
            >
             <Image src={'/fb.svg'}
             width={100}
             height={100}
             className='h-10 w-10'
             alt='fb'/>

            </Link>
          </li>

          <li>
            <Link
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-white transition hover:opacity-75"
            >
             <Image src={'/insta.svg'}
             width={100}
             height={100}
             className='h-10 w-10'
             alt='fb'/>
            </Link>
          </li>

          <li>
            <Link
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-white transition hover:opacity-75"
            >
             <Image src={'/whats.svg'}
             width={100}
             height={100}
             className='h-10 w-10'
             alt='fb'/>
            </Link>
          </li>

          <li>
            <Link
              href="#"
              rel="noreferrer"
              target="_blank"
              className="text-white transition hover:opacity-75"
            >
             <Image src={'/pin.svg'}
             width={100}
             height={100}
             className='h-10 w-10'
             alt='fb'/>
            </Link>
          </li>

        </ul>
      </div>
    </div>

    <div className="mt-8 border-t border-gray-100 pt-8 bg-white ">
      <div className="sm:flex sm:justify-between">
        <p className="text-xs text-gray-500">Copyright &copy; 2024 - fashion.asempabrand.com.</p>

      </div>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer