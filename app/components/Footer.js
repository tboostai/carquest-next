import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-screen bg-[#c0d6f5] mt-20 py-2 px-8 flex gap-[15%] flex-wrap">
      <div className="footer_left flex-1">
        <div className="footer_li my-4">
          <h6 className="text-[#2d5181] border-b-2 border-[#2d5181] font-semibold mb-2">About CarQuest</h6>
          <p className="text-[#2d5181] text-sm font-bold my-1">About us</p>
          <p className="text-[#2d5181] text-sm font-bold my-1">Customer Reviews</p>
        </div>

        <div className="footer_li my-4">
          <h6 className="text-[#2d5181] border-b-2 border-[#2d5181] font-semibold mb-2">How It Works</h6>
          <p className="text-[#2d5181] text-sm font-bold my-1">AI Quiz</p>
          <p className="text-[#2d5181] text-sm font-bold my-1">Car Aggregation</p>
        </div>

        <div className="footer_li my-4">
          <h6 className="text-[#2d5181] border-b-2 border-[#2d5181] font-semibold mb-2">Support</h6>
          <p className="text-[#2d5181] text-sm font-bold my-1">Support</p>
          <p className="text-[#2d5181] text-sm font-bold my-1">Contact</p>
        </div>
      </div>

      <div className="footer_right flex-1 relative mt-4">
        <h6 className="text-[#2d5181] border-b-2 border-[#2d5181] font-semibold mb-2">Connect With Us</h6>
        <ul className="footer_icons w-full h-20 mt-4 flex flex-wrap list-none p-0 m-0">
          <li className="w-1/2 h-1/2 flex items-center justify-center">
            <Image src="/images/Facebook Social.png" alt="Facebook" width={30} height={30} />
          </li>
          <li className="w-1/2 h-1/2 flex items-center justify-center">
            <Image src="/images/Linkedin.png" alt="LinkedIn" width={30} height={30} />
          </li>
          <li className="w-1/2 h-1/2 flex items-center justify-center">
            <Image src="/images/Email Message Inbox.png" alt="Email" width={30} height={30} />
          </li>
          <li className="w-1/2 h-1/2 flex items-center justify-center">
            <Image src="/images/Instagram Social.png" alt="Instagram" width={30} height={30} />
          </li>
        </ul>
        <div className="fonter_word mt-12 text-[#2d5181] text-sm">
          <div className="flex items-center">
            <Image src="/images/Copyright Circle.png" alt="Copyright"
              width={14} height={14} className="mr-1" />
            <span className="text-xs md:text-base">2024 CarQuest Inc. All Rights Reserved.</span>
          </div>
          <p className="text-[0.53rem] md:text-sm mt-1">Sitemap | Privacy | English | $ USD</p>
        </div>
      </div>
    </footer>
  );
}
