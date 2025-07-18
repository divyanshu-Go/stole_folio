// app/portfolio/page.jsx
import Portfolio from './Portfolio';

const user = {
  name: "Divyanshu Sharma",
  profession: "Full Stack Developer",
  bio: "Building web apps with Next.js and Tailwind CSS.",
  contact: {
    email: "divyanshu@example.com",
    phone: "+91 9876543210",
    location: "New Delhi, India"
  },
  social: {
    github: "https://github.com/divyanshusharma",
    linkedin: "https://linkedin.com/in/divyanshusharma"
  }
};

export default function PortfolioPage() {
  return <Portfolio user={user} />;
}
