import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export const viewport: Viewport = {
  themeColor:"#fffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* <div className="w-full h-screen">
          <section id="bottom-navigation" className=" fixed inset-x-0 bottom-2 mx-2 py-2 z-10 rounded-full bg-green-600  shadow">
            <div id="tabs" className="flex justify-between">
              <a href="#" className="w-full text-gray-50 focus:text-gray-900 hover:text-gray-900 justify-center inline-block text-center pt-1 pb-1">
                <svg className="feather feather-home inline-block mb-1" fill="none" height="30" width="30" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="tab tab-home block text-xs">Home</span>
              </a>
              <a href="#" className="w-full text-gray-50 focus:text-gray-900 hover:text-gray-900 justify-center inline-block text-center pt-1 pb-1">
                <svg className="feather feather-help-circle inline-block mb-1" fill="none" height="30" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="30" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" x2="12.01" y1="17" y2="17" />
                </svg>
                <span className="tab tab-kategori block text-xs">Help</span>
              </a>
              <a href="#" className="w-full text-gray-50 focus:text-gray-900 hover:text-gray-900 justify-center inline-block text-center pt-1 pb-1">
                <svg className=" inline-block mb-1" height="30" version="1.1" viewBox="0 0 60 60" width="30" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <desc /><defs />
                  <g fill="currentColor" fill-rule="evenodd" id="People" stroke="none" stroke-width="1">
                    <g fill="currentColor" id="Icon-27">
                      <path d="M20,22 C20,20.897 19.103,20 18,20 C16.897,20 16,20.897 16,22 C16,23.103 16.897,24 18,24 C19.103,24 20,23.103 20,22 L20,22 Z M27,16 L13,16 C12.448,16 12,16.447 12,17 L12,29 C12,29.553 12.448,30 13,30 L15,30 C15.552,30 16,29.553 16,29 C16,28.447 15.552,28 15,28 L14,28 L14,18 L26,18 L26,26.586 L23.707,24.293 C23.316,23.902 22.684,23.902 22.293,24.293 L18.293,28.293 C17.902,28.684 17.902,29.316 18.293,29.707 C18.684,30.098 19.316,30.098 19.707,29.707 L23,26.414 L26.293,29.707 C26.484,29.898 26.74,30 27,30 C27.129,30 27.259,29.976 27.383,29.924 C27.756,29.77 28,29.404 28,29 L28,17 C28,16.447 27.552,16 27,16 L27,16 Z M47,34 L39,34 C38.448,34 38,34.447 38,35 C38,35.553 38.448,36 39,36 L47,36 C47.552,36 48,35.553 48,35 C48,34.447 47.552,34 47,34 L47,34 Z M33,30 L45,30 C45.552,30 46,29.553 46,29 C46,28.447 45.552,28 45,28 L33,28 C32.448,28 32,28.447 32,29 C32,29.553 32.448,30 33,30 L33,30 Z M43,16 L33,16 C32.448,16 32,16.447 32,17 C32,17.553 32.448,18 33,18 L43,18 C43.552,18 44,17.553 44,17 C44,16.447 43.552,16 43,16 L43,16 Z M47,22 L41,22 C40.448,22 40,22.447 40,23 C40,23.553 40.448,24 41,24 L47,24 C47.552,24 48,23.553 48,23 C48,22.447 47.552,22 47,22 L47,22 Z M33,24 L37,24 C37.552,24 38,23.553 38,23 C38,22.447 37.552,22 37,22 L33,22 C32.448,22 32,22.447 32,23 C32,23.553 32.448,24 33,24 L33,24 Z M28,35 C28,35.553 28.448,36 29,36 L35,36 C35.552,36 36,35.553 36,35 C36,34.447 35.552,34 35,34 L29,34 C28.448,34 28,34.447 28,35 L28,35 Z M13,36 L25,36 C25.552,36 26,35.553 26,35 C26,34.447 25.552,34 25,34 L13,34 C12.448,34 12,34.447 12,35 C12,35.553 12.448,36 13,36 L13,36 Z M33.707,54.293 C33.316,53.902 32.684,53.902 32.293,54.293 C31.902,54.684 31.902,55.316 32.293,55.707 L36.293,59.707 C36.488,59.902 36.744,60 37,60 C37.256,60 37.512,59.902 37.707,59.707 C38.098,59.316 38.098,58.684 37.707,58.293 L33.707,54.293 Z M30,48 C29.448,48 29,48.447 29,49 L29,51.586 L22.293,58.293 C21.902,58.684 21.902,59.316 22.293,59.707 C22.488,59.902 22.744,60 23,60 C23.256,60 23.512,59.902 23.707,59.707 L30.707,52.707 C30.895,52.52 31,52.266 31,52 L31,49 C31,48.447 30.552,48 30,48 L30,48 Z M60,3 L60,7 C60,7.553 59.552,8 59,8 L58,8 L58,41 C58,43.757 55.757,46 53,46 L7,46 C4.243,46 2,43.757 2,41 L2,11 C2,10.447 2.448,10 3,10 C3.552,10 4,10.447 4,11 L4,41 C4,42.654 5.346,44 7,44 L53,44 C54.654,44 56,42.654 56,41 L56,7 C56,6.447 56.448,6 57,6 L58,6 L58,4 L2,4 L2,6 L53,6 C53.552,6 54,6.447 54,7 C54,7.553 53.552,8 53,8 L1,8 C0.448,8 0,7.553 0,7 L0,3 C0,2.447 0.448,2 1,2 L29,2 L29,1 C29,0.447 29.448,0 30,0 C30.552,0 31,0.447 31,1 L31,2 L59,2 C59.552,2 60,2.447 60,3 L60,3 Z" id="presentation-article" />
                    </g></g>
                </svg>
                <span className="tab tab-explore block text-xs">Article</span>
              </a>
              <a href="#" className="w-full text-gray-50 focus:text-gray-900 hover:text-gray-900 justify-center inline-block text-center pt-1 pb-1">
                <svg className=" inline-block mb-1" height="30" viewBox="0 0 32 32" width="30" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M27,3V29a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V27H7v1H25V4H7V7H5V3A1,1,0,0,1,6,2H26A1,1,0,0,1,27,3ZM10.71,20.29,7.41,17H18V15H7.41l3.3-3.29L9.29,10.29l-5,5a1,1,0,0,0,0,1.42l5,5Z" />
                </svg>
                <span className="tab tab-explore block text-xs">Logout</span>
              </a>
            </div>
          </section>
        </div> */}
      </body>
    </html>
  );
}
