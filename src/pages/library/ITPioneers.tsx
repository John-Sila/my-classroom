import React, { useState } from "react";
import {
  Shield,
  User,
  Cpu,
  Layers2,
  Info,
  Search,
  Globe,
  Award,
  Terminal,
  Clock,
  ExternalLink,
  Milestone,
  Calendar,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";


export default function ITPioneers() {
  const [activeTab, setActiveTab] = useState<"global" | "kenyan" | "milestones">("global");
  const [searchQuery, setSearchQuery] = useState("");


  const globalPioneers = [
    // Computer Architecture & Theory
    {
      name: "John von Neumann",
      role: "Father of Computer Architecture",
      birthDate: "December 28, 1903",
      deathDate: "February 8, 1957",
      birthPlace: "Budapest, Austria-Hungary",
      deathPlace: "Washington, D.C., USA",
      invention: "Von Neumann Architecture (1945) - The stored-program computer design where data and instructions share the same memory, forming the basis of all modern computers. Also pioneered game theory, quantum mechanics, and nuclear weapon design."
    },
    {
      name: "Alan Turing",
      role: "Father of Modern Computer Science",
      birthDate: "June 23, 1912",
      deathDate: "June 7, 1954",
      birthPlace: "Maida Vale, London, England",
      deathPlace: "Wilmslow, Cheshire, England",
      invention: "Turing Machine (1936) - Mathematical model of computation defining algorithms and computability. Cracked Nazi Enigma code at Bletchley Park, saving 14+ million lives. Proposed the Turing Test for AI intelligence (1950)."
    },
    {
      name: "Charles Babbage",
      role: "Father of the Computer",
      birthDate: "December 26, 1791",
      deathDate: "October 18, 1871",
      birthPlace: "London, England",
      deathPlace: "London, England",
      invention: "Analytical Engine (1837) - First design for a general-purpose mechanical computer. Included memory, processor, and input/output. Never fully built due to funding, but designs influenced modern computing architecture."
    },
    {
      name: "Kurt Gödel",
      role: "Logic & Computability Theorist",
      birthDate: "April 28, 1906",
      deathDate: "January 14, 1978",
      birthPlace: "Brünn, Austria-Hungary (now Brno, Czechia)",
      deathPlace: "Princeton, New Jersey, USA",
      invention: "Incompleteness Theorems (1931) - Proved that any formal system cannot prove all truths within itself, establishing fundamental limits of computation and influencing computer science theory."
    },

    // First Programmers & Compilers
    {
      name: "Ada Lovelace",
      role: "First Computer Programmer",
      birthDate: "December 10, 1815",
      deathDate: "November 27, 1852",
      birthPlace: "London, England",
      deathPlace: "London, England",
      invention: "First Algorithm for Machine (1843) - Created the first computer program for Charles Babbage's Analytical Engine. Recognized computers could go beyond calculation to create music and art. Predicted AI 100 years before it existed."
    },
    {
      name: "Grace Hopper",
      role: "Compiler Pioneer & Naval Rear Admiral",
      birthDate: "December 9, 1906",
      deathDate: "January 1, 1992",
      birthPlace: "New York City, USA",
      deathPlace: "Arlington, Virginia, USA",
      invention: "First Compiler (1952) - Created A-0, the first program to translate human language into machine code. Popularized machine-independent programming languages, leading to COBOL. Coined 'debugging' term."
    },
    {
      name: "Margaret Hamilton",
      role: "Apollo Software Engineering Director",
      birthDate: "March 9, 1927",
      deathDate: "April 7, 2025",
      birthPlace: "New York City, USA",
      deathPlace: "그러nbria, Maryland, USA",
      invention: "Apollo Guidance Code (1961-1969) - Led software engineering for NASA's Apollo moon missions. Created fault detection and recovery systems that enabled the moon landing. Pioneered software engineering as a legitimate field."
    },

    // Programming Language Engineers
    {
      name: "Dennis Ritchie",
      role: "C",
      birthDate: "September 9, 1941",
      deathDate: "October 12, 2011",
      birthPlace: "Bronxville, New York, USA",
      deathPlace: "Alameda, California, USA",
      invention: "C Programming Language (1972) - Created C, the most influential programming language in history. Also created Unix operating system with Ken Thompson. C influenced C++, Java, Python, JavaScript, and almost all modern languages."
    },
    {
      name: "Ken Thompson",
      role: "Unix & Go",
      birthDate: "February 4, 1943",
      deathDate: "Present",
      birthPlace: "New Orleans, Louisiana, USA",
      deathPlace: "N/A (Living)",
      invention: "Unix Operating System (1969) - Created Unix with Dennis Ritchie, the foundation of Linux, macOS, and Android. Also co-created Go programming language (2007) and BCPL. Received Turing Award (1998)."
    },
    {
      name: "Bjarne Stroustrup",
      role: "C++",
      birthDate: "December 30, 1950",
      deathDate: "Present",
      birthPlace: "Aarhus, Denmark",
      deathPlace: "N/A (Living)",
      invention: "C++ Programming Language (1983) - Extended C with object-oriented programming, classes, and templates. C++ powers operating systems, games, browsers, and high-performance applications. Most widely used language in embedded systems."
    },
    {
      name: "James Gosling",
      role: "Java",
      birthDate: "May 19, 1955",
      deathDate: "Present",
      birthPlace: "Canada",
      deathPlace: "N/A (Living)",
      invention: "Java Programming Language (1995) - Created Java at Sun Microsystems, introducing 'Write Once, Run Anywhere' concept. Java powers billions of devices, Android apps, enterprise systems, and cloud infrastructure. Revolutionized OOP."
    },
    {
      name: "Guido van Rossum",
      role: "Python",
      birthDate: "January 31, 1956",
      deathDate: "Present",
      birthPlace: "Curaçao, Netherlands",
      deathPlace: "N/A (Living)",
      invention: "Python Programming Language (1991) - Created Python, the most popular language for AI, data science, machine learning, and web development. Emphasized code readability. Powers Google, NASA, Instagram, and Python's AI/ML ecosystem."
    },
    {
      name: "Anders Hejlsberg",
      role: "C# & TypeScript",
      birthDate: "October 2, 1965",
      deathDate: "Present",
      birthPlace: "Copenhagen, Denmark",
      deathPlace: "N/A (Living)",
      invention: "C# (2000) & TypeScript (2012) - Created C# for Microsoft's .NET framework, dominating enterprise development. Later created TypeScript, adding type safety to JavaScript, becoming essential for modern web development."
    },
    {
      name: "Brendan Eich",
      role: "JavaScript",
      birthDate: "April 26, 1961",
      deathDate: "Present",
      birthPlace: "California, USA",
      deathPlace: "N/A (Living)",
      invention: "JavaScript (1995) - Created JavaScript in 10 days at Mozilla. Became the world's most popular programming language, powering all web browsers. Enabled React, Vue, Angular, Node.js, and modern web development."
    },
    {
      name: "Yukihiro Matsumoto",
      role: "Ruby",
      birthDate: "April 4, 1965",
      deathDate: "Present",
      birthPlace: "Tottori, Japan",
      deathPlace: "N/A (Living)",
      invention: "Ruby Programming Language (1995) - Created Ruby, emphasizing programmer happiness and simplicity. Enabled Ruby on Rails, which revolutionized web development. Used by GitHub, Shopify, Airbnb, and Twitter."
    },
    {
      name: "Rasmus Lerdorf",
      role: "PHP",
      birthDate: "November 22, 1974",
      deathDate: "Present",
      birthPlace: "Finland",
      deathPlace: "N/A (Living)",
      invention: "PHP (1995) - Created PHP, powering 78% of all websites including WordPress, Facebook, and Wikipedia. Made web development accessible to millions. Still dominates server-side web development."
    },
    {
      name: "Graydon Hoare",
      role: "Rust",
      birthDate: "1980 (Approx.)",
      deathDate: "Present",
      birthPlace: "Canada",
      deathPlace: "N/A (Living)",
      invention: "Rust Programming Language (2010) - Created Rust, focusing on memory safety and performance without garbage collection. Used by Microsoft, Amazon, Google for system programming. Prevents memory bugs and security vulnerabilities."
    },
    {
      name: "Google Team (Robert Griesemer)",
      role: "Go",
      birthDate: "1970 (Approx.)",
      deathDate: "Present",
      birthPlace: "Germany",
      deathPlace: "N/A (Living)",
      invention: "Go Programming Language (2009) - Created Go at Google with Ken Thompson and Dennis Ritchie. Powers Kubernetes, Docker, cloud infrastructure, and distributed systems. Emphasizes simplicity and concurrency."
    },
    {
      name: "Gabriel Zimmerman",
      role: "Python",
      birthDate: "1985 (Approx.)",
      deathDate: "Present",
      birthPlace: "USA",
      deathPlace: "N/A (Living)",
      invention: "Python 3.0 & PEP Process - Led Python 3.0 development, introducing major language improvements. Created Python Enhancement Proposal (PEP) process for structured language evolution."
    },
    {
      name: "_TYPE_ Warschug",
      role: "TypeScript",
      birthDate: "1980 (Approx.)",
      deathDate: "Present",
      birthPlace: "USA",
      deathPlace: "N/A (Living)",
      invention: "TypeScript Compiler - Advanced TypeScript's type system, enabling modern JavaScript development with type safety. Powers React, Angular, Vue ecosystems."
    },

    // Operating Systems Engineers
    {
      name: "Linus Torvalds",
      role: "Linux & Git",
      birthDate: "December 28, 1969",
      deathDate: "Present",
      birthPlace: "Helsinki, Finland",
      deathPlace: "N/A (Living)",
      invention: "Linux Operating System (1991) & Git (2005) - Created Linux, powering 90% of cloud infrastructure, all Android devices, and supercomputers. Created Git, the version control system used by all developers. Revolutionized open-source software."
    },
    {
      name: "Richard Stallman",
      role: "Free Software Movement Founder",
      birthDate: "March 2, 1953",
      deathDate: "Present",
      birthPlace: "New York City, USA",
      deathPlace: "N/A (Living)",
      invention: "GNU Project & GPL License (1983) - Founded free software movement, created GNU operating system and General Public License. Enabled open-source software revolution. Received MacArthur Fellowship (2001)."
    },
    {
      name: "Andrew Tanenbaum",
      role: "Minix Operating System Creator",
      birthDate: "March 11, 1947",
      deathDate: "Present",
      birthPlace: "New York City, USA",
      deathPlace: "N/A (Living)",
      invention: "MINIX Operating System (1987) - Created minimal Unix-like system for education, inspiring Linus Torvalds to create Linux. Also created RAID storage systems and wrote influential computer science textbooks."
    },

    // Web & Internet Engineers
    {
      name: "Tim Berners-Lee",
      role: "Inventor of the World Wide Web",
      birthDate: "March 8, 1955",
      deathDate: "Present",
      birthPlace: "London, England",
      deathPlace: "N/A (Living)",
      invention: "World Wide Web (1989) - Created HTML, HTTP, URL, and the first web browser at CERN. Donated the web to the world without patents. Founded the World Wide Web Consortium (W3C) to maintain web standards."
    },
    {
      name: "Vint Cerf",
      role: "Internet Protocol (TCP/IP) Co-Creator",
      birthDate: "January 8, 1943",
      deathDate: "Present",
      birthPlace: "New York, USA",
      deathPlace: "N/A (Living)",
      invention: "TCP/IP Protocols (1974) - Co-created TCP/IP with Steve Crocker, the foundation of Internet communication. Called 'Father of the Internet'. Received National Medal of Technology (2005)."
    },
    {
      name: "Steve Crocker",
      role: "Internet & RFC Creator",
      birthDate: "April 7, 1943",
      deathDate: "Present",
      birthPlace: "USA",
      deathPlace: "N/A (Living)",
      invention: "RFC Document System & ARPANET (1969) - Created Request for Comments (RFC) process for Internet standards. Led ARPANET development, the first network that became the Internet."
    },
    {
      name: "Marc Andreessen",
      role: "Web Browser & Mozilla Creator",
      birthDate: "December 9, 1971",
      deathDate: "Present",
      birthPlace: "New London, Wisconsin, USA",
      deathPlace: "N/A (Living)",
      invention: "Mosaic Browser (1993) & Mozilla (1998) - Created first popular web browser Mosaic, leading to Firefox. Co-founded Netscape. Later founded Andreessen Horowitz, investing in GitHub, Facebook, Airbnb."
    },

    // AI & Machine Learning Engineers
    {
      name: "Isaac Asimov",
      role: "AI & Robotics Visionary",
      birthDate: "January 2, 1920",
      deathDate: "April 6, 1992",
      birthPlace: "Petrovich, Russia",
      deathPlace: "New York City, USA",
      invention: "Three Laws of Robotics (1942) - Ethical framework for AI behavior that shaped modern robotics ethics. Coined 'robotics' as a field and 'positive science fiction'. His works predicted data nets, laptops, and voice-controlled computers."
    },
    {
      name: "Arthur Samuel",
      role: "Machine Learning Pioneer",
      birthDate: "1901",
      deathDate: "1990",
      birthPlace: "USA",
      deathPlace: "USA",
      invention: "Machine Learning Term & AI Chess (1956) - First used 'machine learning' term. Created first AI chess program. Developed pattern recognition at IBM. Pioneered neural networks and supervised learning."
    },
    {
      name: "Geoffrey Hinton",
      role: "Deep Learning & Neural Networks Pioneer",
      birthDate: "December 6, 1946",
      deathDate: "Present",
      birthPlace: "London, England",
      deathPlace: "N/A (Living)",
      invention: "Deep Learning & Backpropagation (1986) - Pioneered neural networks and deep learning. Created convolutional neural networks. Received Turing Award (2018). Work enabled modern AI, image recognition, and language models."
    },
    {
      name: "Yann LeCun",
      role: "Computer Vision & CNN Creator",
      birthDate: "1960",
      deathDate: "Present",
      birthPlace: "France",
      deathPlace: "N/A (Living)",
      invention: "Convolutional Neural Networks (1989) - Created CNNs for image recognition. Led AI at Facebook, now Chief AI Scientist at Meta. Enabled modern computer vision, autonomous vehicles, and medical imaging."
    },
    {
      name: "Andrew Ng",
      role: "AI Education & Deep Learning Leader",
      birthDate: "1975",
      deathDate: "Present",
      birthPlace: "UK",
      deathPlace: "N/A (Living)",
      invention: "Coursera & Google Brain (2011) - Created Coursera, educating millions in AI. Led Google Brain, creating deep learning systems. Co-founded DeepMind. Author of influential ML courses and textbooks."
    },

    // Database Engineers
    {
      name: "James Gray",
      role: "Database Systems Pioneer",
      birthDate: "1946",
      deathDate: "2007",
      birthPlace: "USA",
      deathPlace: "Lost at Sea",
      invention: "Transaction Processing & SQL Optimization - Pioneered database transaction processing. Received Turing Award (1998). Work enabled modern databases, e-commerce, and financial systems."
    },
    {
      name: "Michael Stonebraker",
      role: "Database Architect",
      birthDate: "1944",
      deathDate: "Present",
      birthPlace: "USA",
      deathPlace: "N/A (Living)",
      invention: "Informix & Database Optimization - Created influential database systems. Received Turing Award (2008). Pioneered query optimization and data storage techniques."
    },

    // Security & Cryptography Engineers
    {
      name: "Whitfield Diffie",
      role: "Public-Key Cryptography Co-Creator",
      birthDate: "1944",
      deathDate: "Present",
      birthPlace: "USA",
      deathPlace: "N/A (Living)",
      invention: "Diffie-Hellman Key Exchange (1976) - Co-created public-key cryptography with Martin Hellman. Enabled secure Internet communication, HTTPS, and cryptocurrency. Received Turing Award (2015)."
    },
    {
      name: "Ron Rivest",
      role: "RSA Encryption Co-Creator",
      birthDate: "1947",
      deathDate: "Present",
      birthPlace: "USA",
      deathPlace: "N/A (Living)",
      invention: "RSA Encryption (1977) - Co-created RSA with Adi Shamir and Leonard Adleman. Foundation of modern encryption, HTTPS, and digital signatures. Received Turing Award (2002)."
    },
    {
      name: "Adi Shamir",
      role: "RSA Encryption Co-Creator",
      birthDate: "1952",
      deathDate: "Present",
      birthPlace: "Israel",
      deathPlace: "N/A (Living)",
      invention: "RSA Encryption & Shamir Secret Sharing - Co-created RSA encryption. Pioneered cryptanalysis and zero-knowledge proofs. Received Turing Award (2002)."
    },

    // Hardware & Microprocessor Engineers
    {
      name: "Robert Noyce",
      role: "Microprocessor Inventor",
      birthDate: "December 12, 1927",
      deathDate: "December 3, 1990",
      birthPlace: "Burlington, Vermont, USA",
      deathPlace: "Palo Alto, California, USA",
      invention: "Integrated Microchip (1961) - Created the first practical integrated circuit, enabling the microprocessor revolution. Founded Intel, producing the first commercial microprocessor (4004). Called 'CEO of Silicon Valley'."
    },
    {
      name: "Nikola Tesla",
      role: "Electrical Computing Pioneer",
      birthDate: "July 10, 1856",
      deathDate: "January 7, 1943",
      birthPlace: "Smiljan, Austrian Empire (now Croatia)",
      deathPlace: "New York City, USA",
      invention: "Alternating Current (AC) Systems (1888) - Created the electrical foundation for all modern computers. Wireless radio communication, remote control, and radar concepts. Predicted wireless global communication and mobile devices."
    },
    {
      name: "Gordon Moore",
      role: "Moore's Law & Intel Co-Founder",
      birthDate: "January 3, 1929",
      deathDate: "April 28, 2023",
      birthPlace: "USA",
      deathPlace: "USA",
      invention: "Moore's Law (1965) & Intel Corporation - Predicted transistor doubling every 2 years, guiding semiconductor industry. Co-founded Intel with Robert Noyce. Enabled modern computing power."
    },
    {
      name: "Jaan Penikess",
      role: "ARM Processor Architect",
      birthDate: "1950s",
      deathDate: "Present",
      birthPlace: "UK",
      deathPlace: "N/A (Living)",
      invention: "ARM Architecture (1980s) - Created ARM processor design powering 95% of smartphones. Enabled mobile computing revolution. Used by Apple, Samsung, Google."
    },

    // Personal Computing Engineers
    {
      name: "Steve Wozniak",
      role: "Personal Computer Revolutionist",
      birthDate: "August 11, 1950",
      deathDate: "Present",
      birthPlace: "Buffalo, New York, USA",
      deathPlace: "N/A (Living)",
      invention: "Apple I & II Computers (1976-1977) - Designed the first successful personal computer with color graphics and sound. Created the software/hardware integration model for consumer computing. Co-founded Apple Inc."
    },
    {
      name: "Bill Gates",
      role: "Operating Systems Pioneer",
      birthDate: "November 28, 1955",
      deathDate: "Present",
      birthPlace: "Seattle, Washington, USA",
      deathPlace: "N/A (Living)",
      invention: "Microsoft MS-DOS & Windows (1980-1985) - Created the first widely-used operating system for personal computers. Made computing accessible to millions through graphical interfaces. Predicted the Internet era and AI revolution."
    },
    {
      name: "Paul Allen",
      role: "Microsoft Co-Founder",
      birthDate: "January 21, 1953",
      deathDate: "October 15, 2018",
      birthPlace: "Seattle, Washington, USA",
      deathPlace: "Seattle, Washington, USA",
      invention: "MS-DOS & Microsoft (1975) - Co-founded Microsoft with Bill Gates. Created programming language for Altair 8800. Enabled personal computing revolution. Founded Vulcan Ventures."
    },
    {
      name: "Steve Jobs",
      role: "Consumer Technology Visionary",
      birthDate: "February 24, 1955",
      deathDate: "October 5, 2011",
      birthPlace: "San Francisco, California, USA",
      deathPlace: "Palo Alto, California, USA",
      invention: "Macintosh, iPhone, iPad - Created user-friendly computers with GUI. Launched iPhone (2007), revolutionizing mobile computing. Built Apple into world's most valuable company. Changed design philosophy."
    },

    // Web Framework Engineers
    {
      name: "Joshua Claphill",
      role: "React.js Core Architect",
      birthDate: "1980s",
      deathDate: "Present",
      birthPlace: "USA",
      deathPlace: "N/A (Living)",
      invention: "React.js (2013) - Created React at Facebook, introducing component-based web development. Enabled modern frontend frameworks. Powers Facebook, Instagram, Netflix, Airbnb."
    },
    {
      name: "Evan You",
      role: "Vue.js Framework Creator",
      birthDate: "1983",
      deathDate: "Present",
      birthPlace: "USA (Chinese-born)",
      deathPlace: "N/A (Living)",
      invention: "Vue.js (2014) - Created progressive JavaScript framework for web interfaces. Used by Alibaba, BMW, Nintendo. Combined Angular and React strengths."
    },
    {
      name: "Yehuda Katz",
      role: "Angular.js Co-Creator",
      birthDate: "1980s",
      deathDate: "Present",
      birthPlace: "Israel",
      deathPlace: "N/A (Living)",
      invention: "Angular.js (2010) - Created Angular framework at Google for dynamic web apps. Powers Gmail, Google Calendar. Enabled MVC pattern in frontend."
    },

    // Cloud & Distributed Systems Engineers
    {
      name: "Jeff Bezos",
      role: "AWS Cloud Computing Founder",
      birthDate: "January 12, 1964",
      deathDate: "Present",
      birthPlace: "Albuquerque, New Mexico, USA",
      deathPlace: "N/A (Living)",
      invention: "Amazon AWS (2006) - Created cloud computing infrastructure service. Enabled startups to scale without physical servers. Powers 40% of cloud market. Changed software deployment."
    },
    {
      name: "Eric Schmidt",
      role: "Google Cloud & Search Architect",
      birthDate: "April 25, 1955",
      deathDate: "Present",
      birthPlace: "USA",
      deathPlace: "N/A (Living)",
      invention: "Google Search Algorithm & Cloud - Led Google as CEO, scaling search to billions. Created Google Cloud Platform. Enabled massive distributed systems."
    },

    // Mobile Computing Engineers
    {
      name: "Ken Kakuuchi",
      role: "Android Operating System Creator",
      birthDate: "1976",
      deathDate: "Present",
      birthPlace: "USA",
      deathPlace: "N/A (Living)",
      invention: "Android OS (2008) - Created mobile operating system at Google. Powers 70% of smartphones worldwide. Enabled mobile app ecosystem."
    },
    {
      name: "Scott Forstall",
      role: "iOS Operating System Creator",
      birthDate: "1970s",
      deathDate: "Present",
      birthPlace: "USA",
      deathPlace: "N/A (Living)",
      invention: "iOS (2007) - Created iPhone's operating system at Steve Jobs' direction. Built Touch ORM, Siri foundation. Revolutionized mobile UX."
    }
  ];



  const kenyanPioneers = [
    {
      name: "Dr. Catherine Getao",
      role: "ICT Integration Champion",
      birthDate: "1965 (Approx.)",
      deathDate: "Present",
      birthPlace: "Kenya",
      deathPlace: "N/A (Living)",
      invention: "Huduma Centres e-Government Framework - Designed Kenya's decentralized public service digital infrastructure as ICT Authority CEO. Integrated biometric systems and cloud computing for national service delivery."
    },
    {
      name: "Bitange Ndemo",
      role: "Architect of Kenya's ICT Revolution",
      birthDate: "1958 (Approx.)",
      deathDate: "Present",
      birthPlace: "Kenya",
      deathPlace: "N/A (Living)",
      invention: "TEAMS Undersea Fiber Optic Cable (2007) - Secured Kenya's connection to global internet infrastructure, dropping costs by 90%. Enabled M-Pesa's exponential growth and established Nairobi as Silicon Savannah."
    },
    {
      name: "Dr. Kamal Bhattacharya",
      role: "Tech Innovation Leader",
      birthDate: "1955 (Approx.)",
      deathDate: "Present",
      birthPlace: "India (Moved to Kenya)",
      deathPlace: "N/A (Living in Kenya)",
      invention: "IBM Research Africa (2017) - Founded Africa's first commercial AI research lab in Nairobi. Developed AI solutions for African healthcare, agriculture, and mobile infrastructure using machine learning."
    },
    
  ];


  const historicalMilestones = [
    { year: "1837", title: "Analytical Engine Designed", desc: "Charles Babbage creates first design for general-purpose mechanical computer with memory and processor." },
    { year: "1843", title: "First Algorithm Written", desc: "Ada Lovelace publishes algorithm for Babbage's Analytical Engine, becoming world's first programmer." },
    { year: "1936", title: "The Turing Machine", desc: "Alan Turing publishes paper establishing mathematical boundaries of what computers can and cannot compute." },
    { year: "1945", title: "Von Neumann Architecture", desc: "John von Neumann documents stored-program computer design, basis of all modern computers." },
    { year: "1947", title: "The Transistor Invented", desc: "Bardeen, Brattain, and Shockley invent transistor at Bell Labs, replacing bulky vacuum tubes." },
    { year: "1952", title: "First Compiler Created", desc: "Grace Hopper builds A-0, translating human language to machine code." },
    { year: "1961", title: "Integrated Microchip", desc: "Robert Noyce creates first practical integrated circuit, enabling microprocessors." },
    { year: "1969", title: "ARPANET Launches", desc: "First node-to-node message sent between UCLA and Stanford, creating Internet precursor." },
    { year: "1976", title: "Apple I Released", desc: "Steve Wozniak designs first successful personal computer with color graphics." },
    { year: "1980", title: "MS-DOS Created", desc: "Bill Gates develops operating system making computing accessible to millions." },
    { year: "1989", title: "World Wide Web Proposed", desc: "Tim Berners-Lee submits proposal for global hypertext information system." },
    { year: "2007", title: "M-Pesa Enters Ecosystem", desc: "Safaricom launches mobile financial framework, redefining tech-driven financial inclusion." },
  ];


  // Filtering logic for the search bar
  const filterPioneers = (list: typeof globalPioneers) => {
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.invention.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.birthPlace.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };


  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-8 antialiased selection:bg-indigo-500/20 text-slate-600 dark:text-slate-300">
      
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-mono text-xs tracking-widest uppercase">
          <User className="w-4 h-4" />
          Computing History & Pioneers
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-950 dark:text-white">
          IT Pioneers: The Architects of Computing
        </h1>
        <div className="space-y-2 text-sm text-slate-400 dark:text-slate-500">
          <p>Every line of code written today rests on foundations laid by technological visionaries. From mechanical engines to cross-continental networks, these individuals transformed abstract mathematics into operational reality.</p>
          <p>This index celebrates the iconic figures who drove global computer architecture—from John von Neumann's stored-program architecture to Isaac Asimov's robotics ethics—and the localized champions who actively steered Kenya into becoming Africa's prominent Silicon Savannah.</p>
        </div>


        {/* Search Bar & Tabs Layout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "global", label: "Global Giants", icon: Globe, color: "indigo" },
              { id: "kenyan", label: "Kenyan Visionaries", icon: Award, color: "emerald" },
              { id: "milestones", label: "Evolution Timeline", icon: Clock, color: "rose" }
            ].map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTab(t.id as any);
                    setSearchQuery("");
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                    active
                      ? `bg-${t.color}-600 dark:bg-${t.color}-500 text-white shadow-md shadow-${t.color}-500/20 font-bold scale-105`
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>


          {activeTab !== "milestones" && (
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search index..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
              />
            </div>
          )}
        </div>
      </div>


      <AnimatePresence mode="wait">
        {/* TAB 1: GLOBAL GIANTS */}
        {activeTab === "global" && (
          <motion.div
            key="global"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {filterPioneers(globalPioneers).map((pioneer) => (
                <div key={pioneer.name} className="flex flex-col rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-sm overflow-hidden p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">{pioneer.name}</h3>
                      <span className="text-xs uppercase font-black text-indigo-600 dark:text-indigo-400 tracking-wider block">{pioneer.role}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-indigo-500">
                      <Terminal className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Birth & Death Dates */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      <span className="text-slate-500 dark:text-slate-400">Born:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{pioneer.birthDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-500 dark:text-slate-400">Died:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{pioneer.deathDate}</span>
                    </div>
                  </div>

                  {/* Birth & Death Places */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 text-xs">
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      <span className="text-slate-500 dark:text-slate-400">Birth:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{pioneer.birthPlace}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-500 dark:text-slate-400">Death:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{pioneer.deathPlace}</span>
                    </div>
                  </div>

                  {/* Invention/Contribution */}
                  <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Invention:</span> {pioneer.invention}
                  </p>
                </div>
              ))}
            </div>
            {filterPioneers(globalPioneers).length === 0 && (
              <p className="text-xs text-center text-slate-400 py-8">No pioneers match your filtering metrics.</p>
            )}
          </motion.div>
        )}


        {/* TAB 2: KENYAN VISIONARIES */}
        {activeTab === "kenyan" && (
          <motion.div
            key="kenyan"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {filterPioneers(kenyanPioneers).map((pioneer) => (
                <div key={pioneer.name} className="flex flex-col rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 shadow-sm overflow-hidden p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-950 dark:text-white">{pioneer.name}</h3>
                      <span className="text-xs uppercase font-black text-emerald-600 dark:text-emerald-400 tracking-wider block">{pioneer.role}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-emerald-500">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Birth & Death Dates */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      <span className="text-slate-500 dark:text-slate-400">Born:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{pioneer.birthDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-500 dark:text-slate-400">Died:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{pioneer.deathDate}</span>
                    </div>
                  </div>

                  {/* Birth & Death Places */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 text-xs">
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      <span className="text-slate-500 dark:text-slate-400">Birth:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{pioneer.birthPlace}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="text-slate-500 dark:text-slate-400">Death:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{pioneer.deathPlace}</span>
                    </div>
                  </div>

                  {/* Invention/Contribution */}
                  <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Invention:</span> {pioneer.invention}
                  </p>
                </div>
              ))}
            </div>
            {filterPioneers(kenyanPioneers).length === 0 && (
              <p className="text-xs text-center text-slate-400 py-8">No pioneers match your filtering metrics.</p>
            )}
          </motion.div>
        )}


        {/* TAB 3: EVOLUTION TIMELINE */}
        {activeTab === "milestones" && (
          <motion.div
            key="milestones"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-4 pl-6 space-y-8">
              {historicalMilestones.map((milestone, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline node icon separator */}
                  <div className="absolute -left-[31px] top-0 p-1 rounded-full bg-white dark:bg-slate-950 border-2 border-rose-500 text-rose-500">
                    <Milestone className="w-3 h-3" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-black font-mono text-rose-600 dark:text-rose-400 tracking-widest">{milestone.year}</span>
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white">{milestone.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Context Summary card footer */}
      <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950/50 p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 pointer-events-none">
          <Layers2 className="h-24 w-24 stroke-3" />
        </div>
        <div className="max-w-3xl relative z-10 space-y-2">
          <h3 className="text-sm font-bold tracking-wider font-mono uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Historical Takeaway
          </h3>
          <p className="text-xs md:text-sm text-slate-400 dark:text-slate-500 leading-relaxed">
            The development of information systems relies on both theoretical foundations and practical infrastructure. Understanding the origins of computation—from von Neumann's stored-program architecture and Turing's logic gates to Kenya's deployment of deep-sea fiber optic cabling—highlights how engineering policies directly impact modern economic growth and connectivity.
          </p>
        </div>
      </div>


    </div>
  );
}
