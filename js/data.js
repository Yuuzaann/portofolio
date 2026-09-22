/**
 * SITE_DATA — single source of truth for portfolio content.
 * Edit this file to update projects, skills, or profile details.
 * No build step needed: index.html loads this before js/main.js.
 */
window.SITE_DATA = {
  profile: {
    name: "Arya Permadi",
    alias: "Sadutzz",
    role: "Web Developer",
    location: "Indonesia",
    greeting: "Hi, I'm Arya Permadi",
    tagline: "I build practical web tools \u2014 from point-of-sale systems to small games \u2014 while learning full-stack development one project at a time.",
    summary:
      "I'm a web developer with a growing focus on building useful, working software: internal tools, small business apps, and interfaces that hold up outside of a tutorial. My stack right now centers on JavaScript, PHP, Laravel, Node.js and MySQL, and I'm still deliberately adding to it.",
    photo: "assets/profile-img.webp",
    aboutPhoto: "assets/user-image.webp",
    resumeUrl: "",
    email: "",
    github: "https://github.com/Yuuzaann",
  },

  focus: [
    {
      label: "Languages & frameworks",
      detail: "HTML, CSS, JavaScript, PHP, Laravel, Node.js, MySQL",
    },
    {
      label: "Education",
      detail: "Vocational High School graduate, Software Engineering major",
    },
    {
      label: "What I build",
      detail:
        "Small web, desktop, and mobile projects \u2014 mostly practical tools built for learning and coursework.",
    },
  ],

  skills: [
    {
      category: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["PHP", "Laravel", "Node.js"],
    },
    {
      category: "Database",
      items: ["MySQL"],
    },
    {
      category: "Tools",
      items: ["VS Code", "XAMPP", "Git"],
    },
  ],

  /**
   * Projects are ordered as given. Set featured: true for projects that
   * should get the larger treatment at the top of the section.
   */
  projects: [
    {
      title: "Kasir Toko Web",
      description:
        "A point-of-sale web app for small shops \u2014 handles product entries, transactions, and daily sales records.",
      stack: ["PHP", "Laravel", "MySQL"],
      category: "Web Application",
      github: "https://github.com/Yuuzaann/kasir-toko-web",
      demo: "",
      image: "assets/work-1.webp",
      featured: true,
    },
    {
      title: "Aplikasi Apotek",
      description:
        "A pharmacy management app for tracking medicine stock, sales, and basic inventory records.",
      stack: ["PHP", "MySQL"],
      category: "Web Application",
      github: "https://github.com/Yuuzaann/aplikasi-apotek",
      demo: "",
      image: "assets/work-4.webp",
      featured: true,
    },
    {
      title: "Toko Online",
      description:
        "A small online storefront with product listings and a basic checkout flow.",
      stack: ["PHP", "JavaScript", "MySQL"],
      category: "Web Application",
      github: "https://github.com/Yuuzaann/toko-online",
      demo: "",
      image: "assets/work-5.webp",
      featured: true,
    },
    {
      title: "Data Siswa App",
      description: "A student data management app built with Flutter.",
      stack: ["Flutter", "Dart"],
      category: "Mobile App",
      github: "https://github.com/Yuuzaann/data_siswa_app",
      demo: "",
      image: "assets/work-7.webp",
      featured: false,
    },
    {
      title: "Flappy Bird",
      description: "A browser recreation of the classic Flappy Bird, built to practice game-loop logic in JavaScript.",
      stack: ["JavaScript", "HTML Canvas"],
      category: "Web Application",
      github: "https://github.com/Yuuzaann/flappy-bird",
      demo: "",
      image: "assets/work-2.webp",
      featured: false,
    },
    {
      title: "Tetris",
      description: "A classic block-puzzle game built for the browser.",
      stack: ["JavaScript", "HTML Canvas"],
      category: "Web Application",
      github: "https://github.com/Yuuzaann/Tetris-classic-block-puzzle",
      demo: "",
      image: "assets/work-8.webp",
      featured: false,
    },
    {
      title: "Calculator",
      description: "A simple calculator app built to practice core JavaScript logic and DOM handling.",
      stack: ["JavaScript"],
      category: "Web Application",
      github: "https://github.com/Yuuzaann/Calculator",
      demo: "",
      image: "assets/work-3.webp",
      featured: false,
    },
    {
      title: "Caffe Virtual",
      description: "A 3D model of a virtual caf\u00e9 space, built in SketchUp.",
      stack: ["SketchUp"],
      category: "3D Modeling",
      github: "https://github.com/Yuuzaann/3d-modeling-caffe-toko-virtual",
      demo: "",
      image: "assets/work-6.webp",
      featured: false,
    },
  ],

  achievements: [
    {
      title: "Basic Cyber Security",
      issuer: "Cyber Security Certification",
      image: "assets/achievement.webp",
      url: "assets/achievement.webp",
    },
  ],

  social: [
    { platform: "GitHub", url: "https://github.com/Yuuzaann", icon: "github" },
    { platform: "Instagram", url: "https://www.instagram.com/xydutz_/", icon: "instagram" },
    { platform: "X", url: "https://x.com/Yuuzaan_", icon: "x" },
    { platform: "TikTok", url: "https://www.tiktok.com/@yuuzaann_", icon: "tiktok" },
  ],

  contact: {
    formAction: "https://formspree.io/f/xrekaner",
    note: "I read every message \u2014 I'll get back to you by email.",
  },
};
