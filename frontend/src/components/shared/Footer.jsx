import logo from "../../assets/logo3.png";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Section */}
          <div className="text-center md:text-left mb-4 md:mb-0">
                       <img className=" " src={logo} alt="" width={200} height={100} />
            <p className="text-sm">© {new Date().getFullYear()} All Rights Reserved.</p>
          </div>

          {/* Center Section: Links */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>

         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
