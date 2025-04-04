import React from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import Image from "next/image";
import Tooltip from "./Tooltip";

const AnimatedIntro = () => {
  return (
    <div className="min-h-screen py-16 sm:py-0 sm:h-screen flex items-center justify-start p-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center md:grid md:grid-cols-3 md:gap-8 md:items-center">
          <div className="w-full flex justify-center md:col-span-1 md:justify-end mb-6 md:mb-0">
            <Image
              src="/images/joshua-headshot-3.jpg"
              width={240}
              height={240}
              className="rounded-full w-48 h-48 sm:w-60 sm:h-60 md:max-h-60 md:max-h-60 object-cover"
              alt="Joshua"
              priority
              unoptimized
            />
          </div>
          <div className="space-y-6 text-center md:text-left md:col-span-2 w-full">
            <div>
              <p className="text-4xl font-semibold">Hi, I'm Joshua.</p>
              <p className="text-xl sm:text-2xl font-semibold mt-4">
                From{" "}
                <span className="animate-gradient-2 bg-gradient-to-r from-amber-800 via-yellow-600 to-amber-800 bg-clip-text text-transparent bg-300% transition-all duration-400">
                  deepfake detection
                </span>{" "}
                to{" "}
                <span className="animate-gradient-1 bg-gradient-to-r from-cyan-500 via-blue-800 to-cyan-500 bg-clip-text text-transparent bg-300% transition-all duration-400">
                  healthcare apps
                </span>{" "}
                — Crafting technology with purpose at Cornell and beyond.
              </p>
              <p className="text-lg sm:text-xl mt-2">
                Indonesian-born developer who brings a{" "}
                <span className="animate-gradient-3 bg-gradient-to-r from-yellow-500 via-red-600 to-yellow-500 bg-clip-text text-transparent bg-300% transition-all duration-400">
                  global perspective
                </span>{" "}
                to code.
              </p>
            </div>
            <div className="flex space-x-4 justify-center md:justify-start mt-8">
              <Tooltip text="GitHub Profile">
                <a
                  href="https://github.com/JoshD94"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github size={24} />
                </a>
              </Tooltip>
              <Tooltip text="LinkedIn Profile">
              <a
                  href="https://www.linkedin.com/in/joshua-dirga-49a929215/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </Tooltip>
              <Tooltip text="Send Email">
              <a
                  href="mailto:joshdirga@gmail.com"
                  target="_blank"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Mail size={24} />
                </a>
              </Tooltip>
              <Tooltip text="Download Resume">
              <a
                  href="https://drive.google.com/file/d/1kmCDxLorwSFpaZdFwrv-PmkSRMAXD9MU/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FileText size={24} />
                </a>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedIntro;