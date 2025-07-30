"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Code2,
  Brain,
  Cpu,
  Database,
  Globe,
  ArrowRight,
  BookOpen,
  Award,
  Zap,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ImprovedPortfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentCertificate, setCurrentCertificate] = useState(0)
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null)
  const { scrollYProgress } = useScroll()

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  // Certificates data
  const certificates = [
    {
      title: "Complete Web Development Bootcamp",
      issuer: "Udemy",
      date: "2024",
      image: "/placeholder.svg?height=400&width=600&text=Web+Development+Certificate",
      skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    },
    {
      title: "Machine Learning Specialization",
      issuer: "Coursera - Stanford",
      date: "2024",
      image: "/placeholder.svg?height=400&width=600&text=Machine+Learning+Certificate",
      skills: ["Python", "TensorFlow", "Scikit-learn", "Data Analysis"],
    },
    {
      title: "React - The Complete Guide",
      issuer: "Udemy",
      date: "2023",
      image: "/placeholder.svg?height=400&width=600&text=React+Certificate",
      skills: ["React", "Redux", "Next.js", "TypeScript"],
    },
    {
      title: "Python for Data Science",
      issuer: "edX - MIT",
      date: "2023",
      image: "/placeholder.svg?height=400&width=600&text=Python+Data+Science+Certificate",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib"],
    },
    {
      title: "AWS Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      image: "/placeholder.svg?height=400&width=600&text=AWS+Certificate",
      skills: ["AWS", "Cloud Computing", "EC2", "S3"],
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "certificates", "skills", "projects", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-play certificates slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCertificate((prev) => (prev + 1) % certificates.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [certificates.length])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const nextCertificate = () => {
    setCurrentCertificate((prev) => (prev + 1) % certificates.length)
  }

  const prevCertificate = () => {
    setCurrentCertificate((prev) => (prev - 1 + certificates.length) % certificates.length)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Floating Navigation - Improved Mobile */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-4 left-4 right-4 md:top-6 md:left-1/2 md:transform md:-translate-x-1/2 md:w-auto z-40"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 md:px-8 md:py-4 border border-white/20">
          <div className="flex items-center justify-between md:justify-center">
            <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent md:hidden">
              Portfolio
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              {["home", "about", "certificates", "skills", "projects", "contact"].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize text-sm font-medium transition-all duration-300 ${
                    activeSection === item ? "text-cyan-400 font-bold" : "text-white/70 hover:text-white"
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pt-4 border-t border-white/20"
              >
                <div className="grid grid-cols-2 gap-2">
                  {["home", "about", "certificates", "skills", "projects", "contact"].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`capitalize py-2 px-3 rounded-lg text-sm transition-all duration-300 ${
                        activeSection === item
                          ? "bg-cyan-400/20 text-cyan-400 font-bold"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section - Improved Mobile */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 md:pt-0"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y1 }}
            className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-cyan-400 font-mono text-sm md:text-lg mb-4"
            >
              {"<student>"}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-8xl font-black mb-4 md:mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Md Al Amin
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-2xl lg:text-3xl mb-4 text-white/80"
            >
              CSE Student & Future{" "}
              <motion.span
                animate={{
                  color: ["#06b6d4", "#8b5cf6", "#ec4899", "#06b6d4"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="font-bold"
              >
                Innovator
              </motion.span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-sm md:text-lg text-white/60 mb-2"
            >
              Computer Science & Engineering
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-sm md:text-lg text-white/60 mb-6 md:mb-8"
            >
              Varendra University, Rajshahi
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-cyan-400 font-mono text-sm md:text-lg mb-6 md:mb-8"
            >
              {"</student>"}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto"
              >
                Explore My Work
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-lg font-semibold transition-all duration-300 bg-transparent w-full sm:w-auto"
              >
                <Download className="mr-2" size={18} />
                Resume
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="flex justify-center space-x-4 md:space-x-6 mt-8 md:mt-12"
            >
              {[
                { icon: Github, href: "https://github.com/mdalaminab17", color: "hover:text-cyan-400" },
                { icon: Linkedin, href: "https://linkedin.com/in/mdalaminab17", color: "hover:text-purple-400" },
                { icon: Mail, href: "#", color: "hover:text-pink-400" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-white/10 rounded-full transition-colors ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center text-white/60"
          >
            <span className="text-xs md:text-sm mb-2">Scroll to explore</span>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section - Streamlined */}
      <section id="about" className="py-16 md:py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4 md:mb-6">Passionate CSE Student</h3>
              <p className="text-base md:text-lg text-white/80 leading-relaxed mb-4 md:mb-6">
                I'm Md Al Amin | Aspiring Web Developer & Computer Science Engineer | 💻 Passionate about Coding, AI, & Automation | 🌱 Always Learning, Always Building | 🚀 Join Me on My Journey of Growth & Innovation!
                real-world solutions.
              </p>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: BookOpen, label: "2rd Year", value: "Current" },
                  { icon: Award, label: "3.75/4.00", value: "CGPA" },
                  { icon: Code2, label: "15+", value: "Projects" },
                  { icon: GraduationCap, label: "5+", value: "Certificates" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <stat.icon className="mx-auto mb-2 md:mb-3 text-cyan-400" size={24} />
                    <div className="font-bold text-lg md:text-xl text-white">{stat.label}</div>
                    <div className="text-xs md:text-sm text-white/60">{stat.value}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20">
                <h4 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4 md:mb-6">Current Focus</h4>
                <div className="space-y-4">
                  {[
                    { subject: "Data Structures & Algorithms", progress: 85 },
                    { subject: "Web Development", progress: 90 },
                    { subject: "Machine Learning", progress: 70 },
                    { subject: "Database Management", progress: 80 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-white font-medium text-sm md:text-base">{item.subject}</span>
                        <span className="text-cyan-400 text-sm md:text-base">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certificates Section - New Image Slider */}
      <section id="certificates" className="py-16 md:py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Certificates
              </span>
            </h2>
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mb-4 md:mb-6"></div>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto">
              Online courses and certifications that enhanced my skills
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Main Certificate Display */}
            <motion.div
              key={currentCertificate}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="relative"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-8 border border-white/10">
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative cursor-pointer"
                    onClick={() => setSelectedCertificate(currentCertificate)}
                  >
                    <Image
                      src={certificates[currentCertificate].image || "/placeholder.svg"}
                      alt={certificates[currentCertificate].title}
                      width={600}
                      height={400}
                      className="w-full h-48 md:h-64 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold">Click to view full size</span>
                    </div>
                  </motion.div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {certificates[currentCertificate].title}
                    </h3>
                    <p className="text-cyan-400 font-semibold mb-2 text-sm md:text-base">
                      {certificates[currentCertificate].issuer}
                    </p>
                    <p className="text-white/60 mb-4 text-sm md:text-base">{certificates[currentCertificate].date}</p>
                    <div className="flex flex-wrap gap-2">
                      {certificates[currentCertificate].skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs md:text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={prevCertificate}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextCertificate}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 p-2 md:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6 md:mt-8">
              {certificates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCertificate(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                    index === currentCertificate ? "bg-purple-400" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCertificate !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedCertificate(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors z-10"
                >
                  <X size={20} />
                </button>
                <Image
                  src={certificates[selectedCertificate].image || "/placeholder.svg"}
                  alt={certificates[selectedCertificate].title}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Skills Section - Improved Mobile */}
      <section id="skills" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Skills & Tech
              </span>
            </h2>
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto"></div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                category: "Frontend",
                icon: Code2,
                skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
                color: "from-cyan-400 to-blue-500",
              },
              {
                category: "Backend",
                icon: Database,
                skills: ["Node.js", "Python", "MongoDB", "PostgreSQL"],
                color: "from-purple-400 to-pink-500",
              },
              {
                category: "Tools",
                icon: Cpu,
                skills: ["Git", "VS Code", "Docker", "Linux"],
                color: "from-green-400 to-cyan-500",
              },
              {
                category: "Mobile",
                icon: Globe,
                skills: ["React Native", "Flutter", "Firebase"],
                color: "from-yellow-400 to-orange-500",
              },
              {
                category: "AI/ML",
                icon: Brain,
                skills: ["TensorFlow", "Scikit-learn", "Pandas"],
                color: "from-pink-400 to-red-500",
              },
              {
                category: "Learning",
                icon: Zap,
                skills: ["GraphQL", "AWS", "Kubernetes"],
                color: "from-indigo-400 to-purple-500",
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10 h-full hover:border-white/30 transition-all duration-300">
                  <div className="text-center mb-4 md:mb-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${category.color} rounded-full mb-3 md:mb-4`}
                    >
                      <category.icon className="text-white" size={24} />
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {category.category}
                    </h3>
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                        whileHover={{ x: 10 }}
                        className="flex items-center text-white/80 hover:text-white transition-colors cursor-pointer text-sm md:text-base"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${category.color} rounded-full mr-3`}></div>
                        {skill}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Improved Mobile */}
      <section id="projects" className="py-16 md:py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto"></div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "University Management System",
                description: "Web application for managing university operations with student enrollment and grades.",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["React", "Node.js", "MongoDB"],
                github: "#",
                live: "#",
                status: "Completed",
              },
              {
                title: "AI Chatbot",
                description: "Intelligent chatbot using NLP for answering student queries about university services.",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["Python", "TensorFlow", "Flask"],
                github: "#",
                live: "#",
                status: "In Progress",
              },
              {
                title: "Expense Tracker App",
                description: "Mobile app for tracking expenses with data visualization and budget management.",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["React Native", "Firebase"],
                github: "#",
                live: "#",
                status: "Completed",
              },
              {
                title: "Algorithm Visualizer",
                description: "Interactive web app visualizing sorting and searching algorithms for learning.",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["JavaScript", "HTML5 Canvas"],
                github: "#",
                live: "#",
                status: "Completed",
              },
              {
                title: "E-Commerce Platform",
                description: "Full-stack e-commerce solution with authentication, cart, and payment integration.",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["Next.js", "PostgreSQL", "Stripe"],
                github: "#",
                live: "#",
                status: "In Progress",
              },
              {
                title: "Weather Prediction",
                description: "ML model predicting weather patterns using historical data for accurate forecasts.",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["Python", "Scikit-learn"],
                github: "#",
                live: "#",
                status: "Completed",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "Completed"
                              ? "bg-green-400/20 text-green-400"
                              : "bg-yellow-400/20 text-yellow-400"
                          }`}
                        >
                          {project.status}
                        </span>
                        <div className="flex space-x-2">
                          <motion.a
                            href={project.github}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          >
                            <Github className="text-white" size={16} />
                          </motion.a>
                          <motion.a
                            href={project.live}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          >
                            <ExternalLink className="text-white" size={16} />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/70 mb-3 md:mb-4 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 md:px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Improved Mobile */}
      <section id="contact" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Let's Connect
              </span>
            </h2>
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-4 md:mb-6"></div>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto">
              Ready to collaborate on projects or discuss opportunities? Let's connect!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6 md:mb-8">Get In Touch</h3>
              <div className="space-y-4 md:space-y-6">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "your.email@example.com",
                    href: "mailto:your.email@example.com",
                    color: "from-cyan-400 to-blue-500",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+880 1XXX-XXXXXX",
                    href: "tel:+8801xxxxxxxxx",
                    color: "from-purple-400 to-pink-500",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Rajshahi, Bangladesh",
                    href: "#",
                    color: "from-green-400 to-cyan-500",
                  },
                ].map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 group"
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r ${contact.color} rounded-full group-hover:scale-110 transition-transform`}
                    >
                      <contact.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-base md:text-lg">{contact.label}</div>
                      <div className="text-white/70 text-sm md:text-base">{contact.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 md:mt-12">
                <h4 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Follow Me</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Github, href: "https://github.com/mdalaminab17", color: "hover:text-cyan-400" },
                    { icon: Linkedin, href: "https://linkedin.com/in/mdalaminab17", color: "hover:text-purple-400" },
                    { icon: Mail, href: "#", color: "hover:text-pink-400" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 md:p-4 bg-white/5 rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 ${social.color}`}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Send a Message</h3>
                <form className="space-y-4 md:space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm md:text-base">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/50 transition-all duration-300 text-sm md:text-base"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm md:text-base">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/50 transition-all duration-300 text-sm md:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm md:text-base">Subject</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/50 transition-all duration-300 text-sm md:text-base"
                      placeholder="Project Collaboration"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2 text-sm md:text-base">Message</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/50 transition-all duration-300 resize-none text-sm md:text-base"
                      placeholder="Tell me about your project or opportunity..."
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 border-t border-white/10 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4"
            >
              Md Al Amin
            </motion.div>
            <p className="text-white/60 mb-4 md:mb-6 text-sm md:text-base">CSE Student & Future Innovator</p>
            <div className="flex justify-center space-x-4 md:space-x-6 mb-6 md:mb-8">
              {[
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "#" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 md:p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
            <div className="border-t border-white/10 pt-6 md:pt-8">
              <p className="text-white/40 text-xs md:text-sm">
                © 2024 Md Al Amin. Crafted with 💜 | Varendra University, Rajshahi
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  )
}
