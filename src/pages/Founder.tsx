// import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

// const Founder = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex flex-col items-center justify-center px-4 py-12">
//       <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl text-center">
//         <img
//           src="/Bharu_imgg.jpg"
//           alt="Founder"
//           className="w-32 h-32 rounded-full mx-auto shadow-lg mb-4 border-4 border-pink-300"
//         />
//         <h1 className="text-3xl font-bold text-pink-600 mb-1">Bhargavi Tejaswi</h1>
//         <p className="text-gray-600 text-sm mb-4">Founder & Developer of Footprint Focus</p>

//         <p className="text-gray-700 mb-6">
//           Hi! I'm Bhargavi Tejaswi  🤍 A passionate developer who believes in using tech for good.
//           I built this platform with love, to inspire mindful choices and sustainable actions.
//           I enjoy building beautiful UIs and sharing positive energy with the world ✨
//         </p>

//         <div className="flex justify-center gap-6 mb-6">
//           <a href="https://github.com/magicalgirl1234" target="_blank" rel="noopener noreferrer">
//             <FaGithub className="text-gray-700 text-2xl hover:text-black" />
//           </a>
//           <a href="https://www.linkedin.com/in/battula-bhargavi-tejaswi-706b6927a/" target="_blank" rel="noopener noreferrer">
//             <FaLinkedin className="text-blue-700 text-2xl hover:text-blue-900" />
//           </a>
//           <a href="mailto: bhargavibattula1234@gmail.com">
//             <FaEnvelope className="text-red-600 text-2xl hover:text-red-800" />
//           </a>
//         </div>

//         <blockquote className="italic text-purple-700 border-l-4 border-purple-300 pl-4">
//           "Small actions lead to big impact. Let’s change the world together, one step at a time 🌱"
//         </blockquote>
//       </div>
//     </div>
//   );
// };

// export default Founder;


import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Founder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-xl p-10 max-w-3xl w-full text-center border border-gray-200">
        {/* Profile Picture - BIG */}
        <div className="flex flex-col items-center">
          <img
            src="/Bharu_imgg.jpg"
            alt="Founder"
            className="w-60 h-60 rounded-full object-cover border-4 border-green-300 shadow-lg mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-800">Bhargavi Tejaswi</h1>
          <p className="text-base text-gray-600 mb-4">
            Founder & Developer of <span className="text-green-700 font-medium">Footprint Focus</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-6 leading-relaxed text-[17px]">
          I’m Bhargavi Tejaswi 🤍 — a passionate developer driven by the vision of a greener planet.
          <br />
          Through <span className="text-green-600 font-semibold">Footprint Focus</span>, I aim to empower individuals to measure and reduce their carbon impact with confidence.
          I love building clean, intuitive user experiences and believe tech should always serve humanity 🌍
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mb-6">
          <a href="https://github.com/magicalgirl1234" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-gray-700 text-3xl hover:text-black transition duration-200" />
          </a>
          <a href="https://www.linkedin.com/in/battula-bhargavi-tejaswi-706b6927a/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-blue-700 text-3xl hover:text-blue-900 transition duration-200" />
          </a>
          <a href="mailto:bhargavibattula1234@gmail.com">
            <FaEnvelope className="text-red-600 text-3xl hover:text-red-800 transition duration-200" />
          </a>
        </div>

        {/* Quote */}
        <blockquote className="italic text-green-800 border-l-4 border-green-300 pl-4 text-sm md:text-base">
          "Every conscious step counts. Let's build a sustainable future, one mindful choice at a time. 🌿"
        </blockquote>
      </div>
    </div>
  );
};

export default Founder;
