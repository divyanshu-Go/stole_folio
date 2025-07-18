// app/portfolio/Portfolio.jsx
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';


export default function Portfolio({ user }){
  return (
    <div className="min-h-screen bg-gray-50 b">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
            <div className="flex space-x-8">
              <a href="#hero" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              <a href="#social" className="text-gray-600 hover:text-gray-900 transition-colors">Social</a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{user.name}</h2>
            <p className="text-xl text-blue-600 mb-6">{user.profession}</p>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              {user.bio}
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <a 
              href="#contact" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get In Touch
            </a>
            <a 
              href={user.social.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Work
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Contact Me</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
              <a 
                href={`mailto:${user.contact.email}`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {user.contact.email}
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
              <a 
                href={`tel:${user.contact.phone}`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                {user.contact.phone}
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
              <p className="text-gray-600">{user.contact.location}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section id="social" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">Connect With Me</h3>
          <div className="flex justify-center space-x-6">
            <a 
              href={user.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a 
              href={user.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400 mb-4">
            © 2025 {user.name}. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};
