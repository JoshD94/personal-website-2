import { Lora } from "next/font/google";
import Header from "../components/Header";
import ScrollIndicator from "../components/ScrollIndicator";
import AnimatedIntro from "../components/AnimatedIntro";
import { PhotoData, ProjectData, Skill } from "../components/types";
import TechStack from "../components/TechStack";
import ProjectCard from "../components/ProjectCard";
import ExperienceCard from "../components/ExperienceCard";
import HobbyCarousel from "../components/HobbyCarousel";
import Tooltip from "../components/Tooltip";
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL } from "../utils/constants";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const gotoPhotos: PhotoData[] = [
  { src: "/images/goto-1.jpg", caption: "DS KYC Team" },
  // { src: "/images/goto-2.jpg", caption: "Onboarding Photo!" },
  // { src: "/images/goto-3.jpg", caption: "GoTo Office tour" },
];

const trimegahPhotos: PhotoData[] = [
  // { src: "/images/trim-1.jpg", caption: "Last day on the job!" },
  { src: "/images/trim-2.jpg", caption: "Last day on the job!" },
];

const astrodocPhotos: PhotoData[] = [
  { src: "/images/astrodoc-1.jpg", caption: "Astrodoc sprint meeting" },
];

const appdevPhotos: PhotoData[] = [
  { src: "/images/appdev-1.jpg", caption: "Cornell AppDev team" },
];

const iacPhotos: PhotoData[] = [
  { src: "/images/iac-1.jpg", caption: "Indonesian Association Indonight Committee" },
];
const tedxPhotos: PhotoData[] = [
  { src: "/images/tedx-1.jpg", caption: "My TEDx talk on technology" },
];

const ccraPhotos: PhotoData[] = [
  { src: "/images/ccra-1.jpg", caption: "CCRA meeting!" },
];

const coursePhotos: PhotoData[] = [
  { src: "/images/course-1.jpg", caption: "Co-teaching Intro to Backend Course!" },
];

const projects: ProjectData[] = [
  {
    title: "Uplift",
    description: "Cornell's official gym app with workout tracking, class registration, and equipment availability features. Available on iOS/Android",
    techStack: [
      { name: "Python", iconClass: "devicon-python-plain" },
      { name: "Flask", iconClass: "devicon-flask-original" },
      { name: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
      { name: "SQLite", iconClass: "devicon-sqlite-plain" },
      { name: "GraphQL", iconClass: "devicon-graphql-plain" },
      { name: "Docker", iconClass: "devicon-docker-plain" }
    ],
    imageSrc: "/images/uplift-1.jpg",
    link: "https://apps.apple.com/us/app/uplift-cornell-fitness/id1439374374"
  },
  {
    title: "CRM Web App",
    description: "Full-stack customer relationship management system for The Single Cask, featuring customer database, user management, and history tracking.",
    techStack: [
      { name: "React", iconClass: "devicon-react-plain" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain" },
      { name: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
      { name: "Prisma", iconClass: "devicon-nodejs-plain" },
      { name: "Vercel", iconClass: "devicon-vercel-plain" },
      { name: "Next.js", iconClass: "devicon-nextjs-plain" }
    ],
    imageSrc: "/images/tsc-1.jpg"
  },
  {
    title: "Vividly",
    description: "Mobile app storing Alzheimer's patients' memories with seamless photo and video uploads, organized by timeline and categories.",
    techStack: [
      { name: "React Native", iconClass: "devicon-react-plain" },
      { name: "Python", iconClass: "devicon-python-plain" },
      { name: "Flask", iconClass: "devicon-flask-original" },
      { name: "SQLite", iconClass: "devicon-sqlite-plain" },
      { name: "Docker", iconClass: "devicon-docker-plain" },
      { name: "GCP", iconClass: "devicon-googlecloud-plain" },
    ],
    imageSrc: "/images/vividly-1.jpg",
    link: "https://github.com/MagnetMan103/Vividly"
  },
  {
    title: "BRB-counter",
    description: "Deployed app to track BigRedBucks usage with 100+ monthly active users, helping students manage meal plan finances.",
    techStack: [
      { name: "HTML5", iconClass: "devicon-html5-plain" },
      { name: "CSS", iconClass: "devicon-css3-plain" },
      { name: "JavaScript", iconClass: "devicon-javascript-plain" },
      { name: "Vercel", iconClass: "devicon-vercel-plain" },
      { name: "AWS Route 53", iconClass: "devicon-amazonaws-plain" },
    ],
    imageSrc: "/images/brb-1.jpg",
    link: "https://brbcounter.com"
  },
  {
    title: "Nocturne",
    description: "Music generation app based on mood analysis, creating personalized soundtracks that adapt to user's emotional state.",
    techStack: [
      { name: "React Native", iconClass: "devicon-react-plain" },
      { name: "Python", iconClass: "devicon-python-plain" },
      { name: "SQLite", iconClass: "devicon-sqlite-plain" },
      { name: "Flask", iconClass: "devicon-flask-original" },
      { name: "Docker", iconClass: "devicon-docker-plain" },
      { name: "GCP", iconClass: "devicon-googlecloud-plain" }
    ],
    imageSrc: "/images/nocturne-1.jpg",
    link: "https://github.com/JoshD94/nocturne-backend"
  },
  {
    title: "SWA UniApp",
    description: "University management system for students, teachers, and administrators with course enrollment, grade tracking, and communications.",
    techStack: [
      { name: "PHP", iconClass: "devicon-php-plain" },
      { name: "JavaScript", iconClass: "devicon-javascript-plain" },
      { name: "MySQL", iconClass: "devicon-mysql-plain" },
      { name: "CSS3", iconClass: "devicon-css3-plain" },
    ],
    imageSrc: "/images/swauniapp-1.jpg",
    link: "https://github.com/JoshD94/SWA-UNI-app"
  },
  {
    title: "Edukasih",
    description: "Book donation platform connecting donors with schools in need, promoting literacy, education, and reuse of resources.",
    techStack: [
      { name: "Java", iconClass: "devicon-java-plain" },
      { name: "Kotlin", iconClass: "devicon-kotlin-plain" },
      { name: "Swift", iconClass: "devicon-swift-plain" },
    ],
    imageSrc: "/images/edukasih-1.jpg"
  },
  {
    title: "Jim the Dino",
    description: "Heavily-modded Chrome dino-game with custom skins, different biomes, and shop system. Made with Ocaml for CS 3110 Functional Programming course.",
    techStack: [
      { name: "OCaml", iconClass: "devicon-ocaml-plain" },
    ],
    imageSrc: "/images/dinojim-1.jpg",
    link: "https://github.com/JoshD94/Dino-Jim"
  },
  {
    title: "Sitara Tennis Booking App",
    description: "A tennis booking app for Sitara Tennis Club, featuring court reservations with weekly quotas.",
    techStack: [
      { name: "React", iconClass: "devicon-react-plain" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain" },
      { name: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
      { name: "Prisma", iconClass: "devicon-nodejs-plain" },
      { name: "Vercel", iconClass: "devicon-vercel-plain" },
      { name: "Next.js", iconClass: "devicon-nextjs-plain" }
    ],
    imageSrc: "/images/sitaratennis-1.jpg",
    link: "https://sitaratennis.vercel.app"
  },
  {
    title: "Triviargh",
    description: "A quiz app. Users can create and play quizzes, and compete with friends. Features AI-generated quizzes.",
    techStack: [
      { name: "React", iconClass: "devicon-react-plain" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain" },
      { name: "PostgreSQL", iconClass: "devicon-postgresql-plain" },
      { name: "Prisma", iconClass: "devicon-nodejs-plain" },
      { name: "Vercel", iconClass: "devicon-vercel-plain" },
      { name: "Next.js", iconClass: "devicon-nextjs-plain" }
    ],
    imageSrc: "/images/triviargh-1.jpg",
    link: "https://triviargh.vercel.app"
  },
];

export default function Home() {
  return (
    <div className={`${lora.className} scroll-smooth`}>
      <Header />
      <AnimatedIntro />
      <ScrollIndicator />

      <div
        id="about"
        className="max-w-6xl mx-auto px-4 sm:px-8 pb-16 space-y-8 sm:space-y-12 scroll-mt-20 sm:scroll-mt-16"
      >
        <section id="experience" className="space-y-6 scroll-mt-20 sm:scroll-mt-16">
          <h2 className="text-2xl sm:text-3xl border-b-2 pb-2 text-foreground">Professional Experience</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            

            {/* Cornell AppDev Experience */}
            <ExperienceCard
              title="Backend Subteam Member"
              company="Cornell AppDev"
              location="New York"
              period="Fall 2024 - present"
              bulletPoints={[
                'Led backend development for <a href="#" class="text-blue-600 hover:text-blue-800">Uplift (1.2K+ users)</a>, implementing automated data migrations, a user reporting system, and muscle group-based equipment categorization',
                'Engineered data collection infrastructure for <a href="#" class="text-blue-600 hover:text-blue-800">Millennium sports betting app</a>, developing JSoup web scrapers to automate player statistics and profile data gathering',
                'Taught <a href="#" class="text-blue-600 hover:text-blue-800">53 students</a> backend development as course instructor, designing 7-week curriculum with a cross-functional hackathon with iOS, Android, and design courses'
              ]}
              images={appdevPhotos}
            />

            {/* GoTo Experience */}
            <ExperienceCard
              title="KYC Data Science Engineer (Intern)"
              company="GoTo Financial"
              location="Jakarta"
              period="May-August 2024"
              bulletPoints={[
                'Analyzed and processed <a href="#" class="text-blue-600 hover:text-blue-800">20,000 deepfake images</a>, training a detection model achieving <a href="#" class="text-blue-600 hover:text-blue-800">90% accuracy rate</a> on first iteration',
                'Monitored and analyzed <a href="#" class="text-blue-600 hover:text-blue-800">daily steganography injections across 20+ products</a>, identifying and mitigating potential security threats in real-time',
                'Spearheaded comprehensive testing to obtain <a href="#" class="text-blue-600 hover:text-blue-800">ISO certification</a>, conducted performance benchmarking on <a href="#" class="text-blue-600 hover:text-blue-800">2 backend models</a>, and increased metrics up to <a href="#" class="text-blue-600 hover:text-blue-800">50%</a>'
              ]}
              images={gotoPhotos}
            />

            {/* Astrodoc Experience */}
            <ExperienceCard
              title="Software Engineer (Intern)"
              company="Astrodoc"
              location="Remote"
              period="Dec 2025 - present"
              bulletPoints={[
                'Engineered <a href="#" class="text-blue-600 hover:text-blue-800">7+ mobile UI screens</a> in React Native, implementing complete user onboarding flow including authentication, login/signup interfaces, and OTP verification system',
                'Built scalable backend authentication infrastructure using Appwrite, handling user sessions and security protocols using <a href="#" class="text-blue-600 hover:text-blue-800">2 custom Node.js functions</a>',
                'Developed <a href="#" class="text-blue-600 hover:text-blue-800">real-time HIPAA-compliant chat functionality</a> by integrating Spruce API and healthcare messaging services with Appwrite backend',
                'Built <a href="#" class="text-blue-600 hover:text-blue-800">2 features</a> for web app'
              ]}
              images={astrodocPhotos}
            />

            {/* Trimegah Experience */}
            <ExperienceCard
              title="Research Analyst & IT (Intern)"
              company="Trimegah Asset Management"
              location="Jakarta"
              period="July-August 2023"
              bulletPoints={[
                '<a href="#" class="text-blue-600 hover:text-blue-800">Engineered a data-driven program</a> to identify key stock characteristics, leveraging historical data to <a href="#" class="text-blue-600 hover:text-blue-800">beat index by up to 40%</a>',
                'Conducted in-depth research on <a href="#" class="text-blue-600 hover:text-blue-800">2 sectors (technology and internet)</a>, providing actionable insights for investment decisions',
                'Developed and maintained automated data collection systems, achieving <a href="#" class="text-blue-600 hover:text-blue-800">50% reduction in manual data entry time</a>'
              ]}
              images={trimegahPhotos}
            />
          </div>
        </section>
        
        {/* Projects - no margin between sections */}
        <section id="projects" className="scroll-mt-20 sm:scroll-mt-16">
          <h2 className="text-2xl sm:text-3xl border-b-2 pb-2 text-foreground">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section id="skills" className="space-y-4 scroll-mt-20 sm:scroll-mt-16">
          <h2 className="text-2xl sm:text-3xl border-b-2 pb-2 text-foreground">Technical Skills</h2>
          <TechStack />
        </section>
        
        <section id="activities" className="space-y-6 scroll-mt-20 sm:scroll-mt-16">
          <h2 className="text-2xl sm:text-3xl border-b-2 pb-2 text-foreground">Activities & Leadership</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Indonesian Association */}
            <ExperienceCard
              title="Co-president"
              company="Indonesian Association at Cornell"
              location="Ithaca, NY"
              period="Fall 2023 - present"
              bulletPoints={[
                'Orchestrated <a href="#" class="text-blue-600 hover:text-blue-800">Indonesian Week</a> featuring IndoNight (250+ attendees), Cornell Chimes performances, and dining hall collaborations to showcase Indonesian culture',
                'Curated <a href="#" class="text-blue-600 hover:text-blue-800">11 sports events</a> including skiing expeditions and 6 welcoming events, fostering community engagement among 100+ international students',
                'Revamped social media strategy achieving <a href="#" class="text-blue-600 hover:text-blue-800">100k views and 1.5k meaningful interactions</a>, growing membership by 20% through targeted content campaigns'
              ]}
              images={iacPhotos}
            />

            {/* Cornell Computer Reuse Association */}
            <ExperienceCard
              title="Member"
              company="Cornell Computer Reuse Association"
              location="Ithaca, NY"
              period="Fall 2023 - present"
              bulletPoints={[
                'Repaired and restored <a href="#" class="text-blue-600 hover:text-blue-800">7 computers</a> for donation, extending their lifecycle',
                'Evaluated and upgraded <a href="#" class="text-blue-600 hover:text-blue-800">4 PCs</a>, enhancing performance and preparing them for reuse',
                'Coordinated the packing and shipment of <a href="#" class="text-blue-600 hover:text-blue-800">20 computers and laptops</a> to clients'
              ]}
              images={ccraPhotos}
            />

            {/* Backend course */}
            <ExperienceCard
              title="Course Instructor"
              company="Cornell Appdev"
              location="New York"
              period="2025"
              bulletPoints={[
                'Taught <a href="#" class="text-blue-600 hover:text-blue-800">60 students</a> as course instructor, giving lectures and live demos on backend development and deployment',
                'Organized 10 TA office hours, managed grading, course logistics',
                'Designed <a href="#" class="text-blue-600 hover:text-blue-800">7-week curriculum with a cross-functional hackathon</a> in collaboration with iOS, Android, and design courses'
              ]}
              images={coursePhotos}
            />

            {/* TEDx */}
            <ExperienceCard
              title="Speaker and Organizer"
              company="TEDx@SWA"
              location="Jakarta"
              period="2022-2023"
              bulletPoints={[
                'Delivered a talk viewed by more than <a href="#" class="text-blue-600 hover:text-blue-800">200 people</a> "Catching Up with Science Fiction"',
                'Mentored and coached student speakers and coordinated the <a href="#" class="text-blue-600 hover:text-blue-800">2023 TEDx@SWA event</a>'
              ]}
              images={tedxPhotos}
            />

            
          </div>
        </section>

        {/* Awards */}
        <section id="awards" className="space-y-4 scroll-mt-20 sm:scroll-mt-16">
          <h2 className="text-2xl sm:text-3xl border-b-2 pb-2 text-foreground">Awards and Certificates</h2>
          <ul className="list-disc list-inside text-foreground">
            <li>First Place, RCareWorld Hackathon 2024 <a target="_blank" href="https://www.cornellassist.com/post/rcareworld-hackathon-2024-innovating-the-future-of-caregiving-at-cornell" className="text-blue-600">
            Article
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 inline">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            </a></li>
            <li>Second Place, Big Red Hacks Hackathon 2024 <a target="_blank" href="https://devpost.com/software/nocturne-uytmso" className="text-blue-600">DevPosts
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 inline">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
            </a></li>
            <li>Valedictorian, Sinarmas World Academy - 2023</li>
          </ul>
        </section>

        {/* Education */}
        <section className="space-y-4 scroll-mt-20 sm:scroll-mt-16">
          <h2 className="text-2xl sm:text-3xl border-b-2 pb-2 text-foreground">Education</h2>
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="text-xl text-foreground">Cornell University (Ithaca NY, USA)</h3>
              <p className="text-gray-600 dark:text-gray-300">Graduating Spring 2027</p>
            </div>
            <p className="text-gray-700 dark:text-gray-300">College of Engineering, Computer Science (GPA 3.8)</p>
            <p className="text-gray-700 dark:text-gray-300">
              CS 2110 OOP & Data Structures | CS 2800 Discrete Math | MATH 2940 Linear Algebra | CS 3110 Functional Programming | CS 4820 Analysis of Algorithms | CS 3410 Computer Systems | CS 3700 Foundations of AI Reasoning and Decision-making
            </p>
          </div>
        </section>

        {/* Hobbies
        <section id="hobbies" className="space-y-6 scroll-mt-16">
          <h2 className="text-3xl border-b-2 pb-2 text-foreground">Hobbies</h2>
          <HobbyCarousel
            hobbies={[
              {
                title: "Basketball",
                description: "    I started playing basketball in the summer of 2022 when I met a couple friends that played basketball. After trying to play with them I learned that basketball was a challenging sport which pushed me to seriously learn it. I enjoyed the learning curve for basketball in the past 2 years and I hope to continue playing until I finished university!\n    Learning basketball helped me make many close friends, building friendships that lasted even off the court. I also stayed active and kept myself fit because I play a good amount of basketball in my free time. Following the recent Olympics and the NBA has also become one of my favorite past times because I can watch the greats play the game and learn from them.",
                media: [
                  { type: 'image', src: "/images/joshua-headshot.jpg", caption: "Playing basketball" },
                  { type: 'image', src: "/images/joshua-headshot-2.jpg", caption: "Basketball practice" }
                ]
              },
              {
                title: "Tennis",
                description: "    Tennis runs in the family! From both my grandparents, to my cousins, everyone can play tennis. I started learning when I started primary school, but I improved a lot during covid because I rallied against a wall during lockdown. Tennis is an all-rounded sport, meaning it demands both physical but also mental strength to compete. Besides that, it trains all parts of your body, both upper-body strength and your legs. At university, I am currently teaching my friend to play tennis and you can see his progress in the first video below!\n    Despite playing for nearly a decade, I've never really entered the competitive realm of tennis. I have participated in some competitions and got 2nd place, but I prefer the more casual side of tennis. Tennis also has a very nice learning curve and I encourage anyone to learn how to play! I hope I will be able to play tennis until I'm old, and pass on the tennis genes to my children as well ",
                media: [
                  { type: 'image', src: "/images/joshua-headshot-2.jpg", caption: "Tennis practice" },
                  { type: 'image', src: "/images/joshua-headshot.jpg", caption: "Tennis match" }
                ]
              },
              {
                title: "Piano",
                description: "    I was introduced to the piano when I was in Kindergarten, learning classical pieces. However, I did not develop a passion for playing the piano until I learned how to play pop, and even more when I stepped into the world of jazz. Around the beginning of high school, I quit classical piano and started studying pop piano. Slowly, my teacher introduced me to jazz and I've been hooked ever since. It took me 3-4 years to be able to play by ear, a skill I am very proud of today. My favorite genre is now jazz fusion, a combination of pop and some light jazz. I found that Jpop has the most jazz-fusion artists and this also led to my interests in learning new languages.\n    Although I've played in a few recitals and small performances, I mostly play for myself and close friends. I find playing piano to be a perfect way to express creativity and relieve stress. It's incredible how playing music can completely change your mood and mindset. I hope to continue developing my improvisation skills and perhaps compose my own pieces in the future.",
                media: [
                  { type: 'image', src: "/images/joshua-headshot-3.jpg", caption: "Playing piano" },
                  { type: 'image', src: "/images/joshua-headshot.jpg", caption: "Piano recital" }
                ]
              },
              {
                title: "Google Reviewing",
                description: "    I recently started reviewing on Google Maps and I've gotten thousands of views. As a person, I really like to collect and organize things, so reviewing and recording all my past food stops became a fun pastime. Besides it being a personal hobby, I also enjoy helping my favorite restaurants out by giving them a good review. I try to be as honest as possible in my reviews, and I try to convice others to support the local businesses. Also, I hope people can find some good recommendations from my reviews!\n    As I just started reviewing, I am still a level 6 local guide with around 10-20 reviews. As I explore more good spots, I hope to find more hidden gems and share them with the world. You can probably tell I love spicy food from the amount of red in my reviews, so if you have any good spicy food recommendations for me to try out, please let me know ",
                media: [
                  { type: 'image', src: "/images/joshua-headshot.jpg", caption: "Google reviewing" }
                ]
              },
              {
                title: "Learning Languages",
                description: "    I grew up bilingual in English and Indonesian, and I studied Mandarin since kindergarten. This gave me the weird ability to think in multiple languages, for example: I thought and spoke mostly English, I could only remember the colors of the rainbow in Mandarin as a child, and I only knew the name of my chores in Indonesian. It was an interesting experience knowing a couple languages growing up and I think it helped me approach problems from different angles.\n    Besides my three languages, I started learning Japanese on my own in high school. Japanese was the first language I learned that did not use the Latin Alphabet, instead it had three distinct scripts: Hiragana (The main script to spell out words), Katakana (The script to spell out foreign words), and Kanji (Chinese characters). At first, it took me one to two months learning these scripts, but afterwards I was amazed how I could spend 2 months learning and be able to understand these once-gibberish scripts. Kanji was a bit easier since I knew some Mandarin, but the grammar was the most challenging part of learning Japanese, because it is known to have the opposite grammar to english.\nHi! I'm Joshua, look forward to working with you!\nHalo, nama saya Joshua, semoga kita bisa bekerja sama...\n您好，我叫林瑞键，很高兴认识你！\n初めまして！ジョシュアと申します。よろしくお願いします！\n안녕하세요! 만나서 반가워요！\n     The fifth language I'm currently learning is Korean. Thankfully Korean only has one script (Hangul) and has similar grammar to Japanese. I started learning Korean because I wanted to be able to talk to my Korean friends at university and I have a personal goal to be able to speak all the major East-Asian languages (Mandarin, Korean, Japanese). I mostly spend 5 minutes a day learning on Duolingo, but besides that, I try as much as possible to immerse myself in content from the language. For example, my google assistant is set to Japanese, and most of my Youtube and X (Twitter) content are in Japanese while I was studying Japanese. I think learning languages is a very productive hobby and I plan to continue learning languages for a long time!",
                media: [
                  { type: 'image', src: "/images/joshua-headshot-2.jpg", caption: "Language learning" },
                  { type: 'image', src: "/images/joshua-headshot-3.jpg", caption: "Japanese study time" }
                ]
              }
            ]}
          />
        </section> */}

        

        {/* Contact Information */}
        <section id="contact" className="text-center">
          <p className="text-foreground">+1 (607) 2629541 | joshdirga@gmail.com | Ithaca, NY, 14853</p>
          <div className="flex justify-center mt-3 space-x-4">
            <Tooltip text="GitHub Profile">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                GitHub
              </a>
            </Tooltip>
            <Tooltip text="LinkedIn Profile">
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                LinkedIn
              </a>
            </Tooltip>
            <Tooltip text="View Resume">
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Resume
              </a>
            </Tooltip>
          </div>
        </section>
      </div>
    </div>
  );
}
