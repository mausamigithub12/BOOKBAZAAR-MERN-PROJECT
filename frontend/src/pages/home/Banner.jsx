
import React from "react";
import backgroundImage from "../../assets/backgroundImg.jpg";

function BANNER() {
  return (
   
    <section
  className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed"
  style={{ backgroundImage: `url(${backgroundImage})` }}
>
  <div className="absolute inset-0 bg-black/40"></div>

  <div className="relative z-10 text-white text-center px-4 md:px-8 w-full max-w-7xl mx-auto">
    <h1 className="md:text-5xl text-3xl font-bold mb-6 md:mb-8 leading-tight">
      New Releases This Week
    </h1>

    <p className="text-lg md:text-xl mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto">
      It's time to update your reading list with some of the latest and
      greatest releases in the literary world. From heart-pumping thrillers
      to captivating memoirs, this week's new releases offer something for
      everyone.
    </p>

    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full 
                       transition-all duration-300 transform hover:scale-105 shadow-lg">
      Subscribe
    </button>
  </div>

  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
    <div className="animate-bounce w-6 h-10 border-2 border-white rounded-full flex justify-center">
      <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
    </div>
  </div>
</section>

  );
}

export default BANNER;