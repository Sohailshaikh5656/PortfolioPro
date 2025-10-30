const users = [
  {
    name: "John Anderson",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    age: 28,
    profession: "Software Engineer",
    city: "San Francisco",
    state: "California",
    rating: 4.8,
    description: "Full-stack developer with passion for creating scalable web applications. Specialized in React and Node.js.",
    experience: "5 years",
    projects: 47,
    skill: ["JavaScript", "React", "Node.js", "Python", "AWS"],
    contact: {
      email: "john.software@email.com",
      phone: "+1-555-0123"
    },
    created_at: "15 January 2024, 10:30 AM",
    updated_at: "20 March 2024, 2:45 PM"
  },
  {
    name: "Sarah Johnson",
    img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    age: 32,
    profession: "UX/UI Designer",
    city: "New York",
    state: "New York",
    rating: 4.9,
    description: "Creative designer focused on user-centered design principles and creating intuitive digital experiences.",
    experience: "8 years",
    projects: 63,
    skill: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
    contact: {
      email: "sarah.design@email.com",
      phone: "+1-555-0124"
    },
    created_at: "12 February 2024, 09:15 AM",
    updated_at: "18 March 2024, 11:20 AM"
  },
  {
    name: "Michael Lee",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    age: 45,
    profession: "Data Scientist",
    city: "Boston",
    state: "Massachusetts",
    rating: 4.7,
    description: "Data scientist with PhD in Machine Learning. Experienced in building predictive models and data pipelines.",
    experience: "12 years",
    projects: 89,
    skill: ["Python", "TensorFlow", "SQL", "Machine Learning", "Data Visualization"],
    contact: {
      email: "mike.data@email.com",
      phone: "+1-555-0125"
    },
    created_at: "20 January 2024, 02:45 PM",
    updated_at: "22 March 2024, 04:30 PM"
  },
  {
    name: "Lisa Roberts",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    age: 29,
    profession: "Product Manager",
    city: "Seattle",
    state: "Washington",
    rating: 4.6,
    description: "Strategic product manager with track record of launching successful digital products in agile environments.",
    experience: "6 years",
    projects: 34,
    skill: ["Product Strategy", "Agile", "JIRA", "Market Research", "Roadmapping"],
    contact: {
      email: "lisa.product@email.com",
      phone: "+1-555-0126"
    },
    created_at: "08 February 2024, 11:30 AM",
    updated_at: "19 March 2024, 01:40 PM"
  },
  {
    name: "David Miller",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    age: 35,
    profession: "DevOps Engineer",
    city: "Austin",
    state: "Texas",
    rating: 4.8,
    description: "Cloud infrastructure specialist focused on automating deployments and ensuring system reliability.",
    experience: "9 years",
    projects: 52,
    skill: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
    contact: {
      email: "david.devops@email.com",
      phone: "+1-555-0127"
    },
    created_at: "25 January 2024, 03:15 PM",
    updated_at: "21 March 2024, 03:10 PM"
  },
  {
    name: "Emily Davis",
    img: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face",
    age: 31,
    profession: "Marketing Manager",
    city: "Chicago",
    state: "Illinois",
    rating: 4.5,
    description: "Digital marketing expert with expertise in SEO, content strategy, and growth hacking techniques.",
    experience: "7 years",
    projects: 41,
    skill: ["SEO", "Content Marketing", "Google Analytics", "Social Media", "CRM"],
    contact: {
      email: "emily.marketing@email.com",
      phone: "+1-555-0128"
    },
    created_at: "18 February 2024, 10:00 AM",
    updated_at: "23 March 2024, 02:50 PM"
  },
  {
    name: "Alex Carter",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
    age: 27,
    profession: "Frontend Developer",
    city: "Denver",
    state: "Colorado",
    rating: 4.7,
    description: "Frontend specialist passionate about creating responsive and accessible web applications with modern frameworks.",
    experience: "4 years",
    projects: 38,
    skill: ["React", "Vue.js", "TypeScript", "CSS", "Web Performance"],
    contact: {
      email: "alex.frontend@email.com",
      phone: "+1-555-0129"
    },
    created_at: "30 January 2024, 02:20 PM",
    updated_at: "17 March 2024, 01:15 PM"
  },
  {
    name: "Robert King",
    img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
    age: 42,
    profession: "Cybersecurity Analyst",
    city: "Washington",
    state: "District of Columbia",
    rating: 4.9,
    description: "Security expert with extensive experience in threat analysis, vulnerability assessment, and security architecture.",
    experience: "15 years",
    projects: 67,
    skill: ["Network Security", "Penetration Testing", "SIEM", "Incident Response", "Compliance"],
    contact: {
      email: "robert.security@email.com",
      phone: "+1-555-0130"
    },
    created_at: "14 February 2024, 08:45 AM",
    updated_at: "24 March 2024, 10:05 AM"
  },
  {
    name: "Sophia Martinez",
    img: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=400&fit=crop&crop=face",
    age: 26,
    profession: "Mobile App Developer",
    city: "Miami",
    state: "Florida",
    rating: 4.6,
    description: "Cross-platform mobile developer creating engaging and performant applications for iOS and Android.",
    experience: "3 years",
    projects: 29,
    skill: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    contact: {
      email: "sophia.mobile@email.com",
      phone: "+1-555-0131"
    },
    created_at: "22 February 2024, 01:30 PM",
    updated_at: "19 March 2024, 04:45 PM"
  },
  {
    name: "James Walker",
    img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=400&h=400&fit=crop&crop=face",
    age: 38,
    profession: "Database Administrator",
    city: "Atlanta",
    state: "Georgia",
    rating: 4.7,
    description: "Database specialist ensuring optimal performance, security, and reliability of database systems.",
    experience: "11 years",
    projects: 58,
    skill: ["SQL", "MySQL", "PostgreSQL", "MongoDB", "Database Optimization"],
    contact: {
      email: "james.dba@email.com",
      phone: "+1-555-0132"
    },
    created_at: "10 January 2024, 11:15 AM",
    updated_at: "25 March 2024, 09:30 AM"
  },
  {
    name: "Natalie Brown",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    age: 33,
    profession: "Cloud Architect",
    city: "Phoenix",
    state: "Arizona",
    rating: 4.8,
    description: "Cloud solutions architect designing scalable and cost-effective cloud infrastructure for enterprise applications.",
    experience: "8 years",
    projects: 45,
    skill: ["AWS", "Azure", "Cloud Migration", "Microservices", "Serverless"],
    contact: {
      email: "natalie.cloud@email.com",
      phone: "+1-555-0133"
    },
    created_at: "28 January 2024, 04:00 PM",
    updated_at: "26 March 2024, 11:40 AM"
  },
  {
    name: "Kevin Turner",
    img: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=400&fit=crop&crop=face",
    age: 30,
    profession: "AI/ML Engineer",
    city: "San Diego",
    state: "California",
    rating: 4.9,
    description: "Machine learning engineer building intelligent systems and deploying AI models to production environments.",
    experience: "5 years",
    projects: 36,
    skill: ["Python", "PyTorch", "Computer Vision", "NLP", "MLOps"],
    contact: {
      email: "kevin.ai@email.com",
      phone: "+1-555-0134"
    },
    created_at: "05 February 2024, 09:45 AM",
    updated_at: "21 March 2024, 05:20 PM"
  },
  {
    name: "Daniel Harris",
    img: "https://images.unsplash.com/photo-1517702145083-4c96bc5cacf5?w=400&h=400&fit=crop&crop=face",
    age: 36,
    profession: "Technical Lead",
    city: "Portland",
    state: "Oregon",
    rating: 4.8,
    description: "Experienced technical lead mentoring development teams and driving technical excellence in software delivery.",
    experience: "10 years",
    projects: 72,
    skill: ["Team Leadership", "System Design", "Code Review", "Mentoring", "Agile"],
    contact: {
      email: "daniel.lead@email.com",
      phone: "+1-555-0135"
    },
    created_at: "17 January 2024, 01:00 PM",
    updated_at: "22 March 2024, 03:55 PM"
  },
  {
    name: "Olivia Thompson",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
    age: 29,
    profession: "QA Automation Engineer",
    city: "Raleigh",
    state: "North Carolina",
    rating: 4.6,
    description: "Quality assurance engineer automating testing processes and ensuring software quality throughout development lifecycle.",
    experience: "5 years",
    projects: 43,
    skill: ["Selenium", "Cypress", "Jest", "Test Automation", "Quality Assurance"],
    contact: {
      email: "olivia.qa@email.com",
      phone: "+1-555-0136"
    },
    created_at: "24 February 2024, 10:30 AM",
    updated_at: "18 March 2024, 02:25 PM"
  },
  {
    name: "Michael Green",
    img: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=400&h=400&fit=crop&crop=face",
    age: 34,
    profession: "Blockchain Developer",
    city: "Los Angeles",
    state: "California",
    rating: 4.7,
    description: "Blockchain developer building decentralized applications and smart contracts on various blockchain platforms.",
    experience: "6 years",
    projects: 31,
    skill: ["Solidity", "Ethereum", "Smart Contracts", "Web3", "DeFi"],
    contact: {
      email: "michael.blockchain@email.com",
      phone: "+1-555-0137"
    },
    created_at: "19 February 2024, 03:45 PM",
    updated_at: "23 March 2024, 04:15 PM"
  }
];

export default users;
