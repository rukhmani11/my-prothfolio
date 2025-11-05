import React, { JSX, useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  Grid
} from "@mui/material";
import { motion } from "framer-motion";
import { Snackbar, Alert } from "@mui/material";
import "./App.css";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { Storage, Devices, Api, Brush, Cloud } from "@mui/icons-material";
import { Code } from "@mui/icons-material";
import { FaHtml5, FaReact, FaAngular, FaDatabase } from "react-icons/fa";
import { SiJavascript, SiDotnet, SiTypescript } from "react-icons/si";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { Container, TextField } from "@mui/material";
import { Work, School, Rocket } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PhotoLibraryOutlinedIcon from "@mui/icons-material/PhotoLibraryOutlined";
import TocOutlinedIcon from "@mui/icons-material/TocOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconBaseProps, IconType } from "react-icons";
interface Skill {
  name: string;
  value: number;
  icon: IconType;
  color: string; // add color
  desc: string;
}
interface SocialIconProps {
  href: string;
  Icon: IconType;
  color?: string;
}

interface Service {
  name: string;
  desc: string;
  icon: React.ElementType;
  value: number;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, Icon, color }) => (
  <IconButton
    href={href}
    target="_blank"
    sx={{
      transition: "transform 0.2s, color 0.2s",
      "&:hover": { transform: "scale(1.2)" },
    }}
  >
    {/* ✅ FIX: createElement with proper type */}
    {React.createElement(Icon as React.ComponentType<IconBaseProps>, {
      size: 24,
      color,
    })}
  </IconButton>
);

// ✅ Define the component OUTSIDE App

const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const skills: Skill[] = [
    {
      name: "HTML",
      value: 90,
      icon: FaHtml5,
      color: "#E34F26",
      desc: "Structuring web content & styling interfaces with modern designs.",
    },
    {
      name: "JAVASCRIPT",
      value: 90,
      icon: SiJavascript,
      color: "#F7DF1E",
      desc: "Styling interfaces with modern designs. Dynamic client logic.",
    },
    {
      name: "REACT",
      value: 90,
      icon: FaReact,
      color: "#61DAFB",
      desc: "Component-based UI. Dynamic type-safe codebases.",
    },
    {
      name: ".NET CORE",
      value: 60,
      icon: SiDotnet,
      color: "#512BD4",
      desc: "Scalable backend services. Flexible backend systems.",
    },
    {
      name: "TYPESCRIPT",
      value: 70,
      icon: SiTypescript,
      color: "#3178C6",
      desc: "Robust type-safe logic. Improved runtime accessibility.",
    },
    {
      name: "ANGULAR",
      value: 80,
      icon: FaAngular,
      color: "#DD0031",
      desc: "Single-page application frameworks. Scalable backend services.",
    },
    {
      name: "SQL",
      value: 70,
      icon: FaDatabase,
      color: "#336791",
      desc: "Relational data management. Analytics & solution retrievals.",
    },
  ];

  const services = [
    {
      name: "Frontend Development",
      desc: "Creating fast, interactive, and responsive user interfaces using React, Material UI, and modern JavaScript frameworks.",
      icon: Code,
      color: "#1976d2",
    },
    {
      name: "Backend Development",
      desc: "Building scalable, secure, and efficient backend systems using .NET Core and Node.js.",
      icon: Api,
      color: "#6a1b9a",
    },
    {
      name: "Full-Stack Development",
      desc: "Delivering end-to-end web solutions — from database to front-end integration — for complete business needs.",
      icon: Storage,
      color: "#0288d1",
    },
    {
      name: "UI / UX Design",
      desc: "Designing clean, intuitive, and user-friendly interfaces that offer smooth and engaging experiences.",
      icon: Brush,
      color: "#e91e63",
    },
    {
      name: "Responsive Web Design",
      desc: "Ensuring websites look and perform beautifully on all devices, from mobiles to desktops.",
      icon: Devices,
      color: "#43a047",
    },
    {
      name: "Cloud Integration",
      desc: "Deploying and maintaining applications on AWS, Azure, or Vercel with high reliability and speed.",
      icon: Cloud,
      color: "#ff9800",
    },
  ];

  const [emailLink, setEmailLink] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send(
        "service_cqc8eor", // ✅ Replace with your EmailJS Service ID
        "template_5h9j46m", // ✅ Replace with your Template ID
        formData,
        "htp4pG_BUFgqvB6Lb" // ✅ Replace with your Public Key
      )
      .then(
        (response: EmailJSResponseStatus) => {
          setSnackbar({
            open: true,
            message: "✅ Message sent successfully!",
            severity: "success",
          });
          setFormData({ name: "", email: "", phone: "", message: "" });
        },
        (error: any) => {
          setSnackbar({
            open: true,
            message: "❌ Failed to send message. Please try again.",
            severity: "error",
          });
        }
      );
  };

  const icons = [
    { icon: <HomeOutlinedIcon />, link: "#home", label: "Home" },
    { icon: <PersonOutlineOutlinedIcon />, link: "#about", label: "About" },
    { icon: <DescriptionOutlinedIcon />, link: "#skills", label: "Resume" },
    {
      icon: <PhotoLibraryOutlinedIcon />,
      link: "#portfolio",
      label: "Portfolio",
    },
    { icon: <TocOutlinedIcon />, link: "#service", label: "Service" },
    { icon: <EmailOutlinedIcon />, link: "#contact", label: "Contact" },
  ];

  const sidebarContent = (
    <Box
      sx={{
        width: 70,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 10,
        gap: 2,
        height: "100%",
        // background: "rgba(255,255,255,0.2)", // transparent so bg image shows
        // backdropFilter: "blur(4px)", // frosted glass effect (optional)
      }}
    >
      <nav
        style={{
          position: "fixed",
          top: "50%",
          left: 20,
          transform: "translateY(-50%)",
        }}
      >
        <List>
          {icons.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ mb: 2 }}>
              <ListItemButton
                component="a"
                href={item.link}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  color: "black",
                  height: 50,
                  width: 55,
                  borderRadius: "50%",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    justifyContent: "flex-start",
                    bgcolor: "primary.main",
                    width: 140,
                    borderRadius: "25px",
                    px: 2,
                  },
                  "& .label": {
                    opacity: 0,
                  },
                  "&:hover .label": {
                    opacity: 1,
                  },
                }}
              >
                {item.icon}
                <span className="label">{item.label}</span>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // vertically center
          justifyContent: "center", // horizontally center
          minHeight: "100vh",
          width: "100%",
          // backgroundImage: "url('/image.png')",
           backgroundImage: `url(${process.env.PUBLIC_URL + "/image.png"})`,
          backgroundSize: "cover", // ✅ always covers the area
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll", // nice parallax effect on desktop
          "@media (max-width: 900px)": {
            backgroundAttachment: "scroll", // disable parallax on mobile
            backgroundSize: "cover", // ✅ keep full coverage
            minHeight: "auto", // allow height to adapt naturally
            padding: "60px 20px", // add some breathing room
          },
          
        }}
      >
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            open
            sx={{
              "& .MuiDrawer-paper": {
                width: 70,
                boxSizing: "border-box",
                background: "transparent", // ✅ transparent so bg shows
                boxShadow: "none",
                border: "none",
              },
            }}
          >
            {sidebarContent}
          </Drawer>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              bgcolor: "primary.main",
              color: "white",
              zIndex: 2100,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Mobile Sidebar Drawer */}
        {isMobile && (
          <Drawer
            variant={isMobile ? "temporary" : "permanent"}
            open={isMobile ? mobileOpen : true}
            onClose={() => setMobileOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: 70,
                boxSizing: "border-box",
                background: "transparent", // ✅ sidebar itself transparent
                boxShadow: "none",
              },
            }}
          >
            {sidebarContent}
          </Drawer>
        )}

        {/* Hero Section */}
        <Box
          id="home"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            px: 2,
            ml: !isMobile ? "70px" : 0,
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            RUKHMNAI PRAJAPATI
          </Typography>
          <Typography variant="h6" gutterBottom>
            I'm a full stack developer
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              //  sx={{ color: "white" }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              href="https://github.com"
              target="_blank"
              //sx={{ color: "white" }}
            >
              <GitHubIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              href="/Resume.pdf"
              target="_blank"
              download="Rukhmani_Resume.pdf"
            >
              RESUME
            </Button>
          </Stack>
        </Box>
      </Box>
      <>
        <section id="about" className="about-section">
          <div className="container">
            <div className="section-title">
              <h2>About</h2>
              <p>
                I am Rukhmani Prajapati, a dedicated Full Stack Developer with
                extensive experience in both front-end and back-end development.
                I specialize in creating efficient, scalable applications and
                building responsive, dynamic user interfaces.
              </p>
            </div>

            <div className="about-container">
              <div className="image-container">
                {/* <img src="/NewProfile.jpeg" alt="Rukhmani Prajapati" /> */}
                <img src={process.env.PUBLIC_URL + "/NewProfile.jpeg"} alt="Rukhmani Prajapati" />


              </div>
              <div className="text-container">
                <h2>Full-Stack-Developer</h2>
                <p className="fst-italic">
                  Full Stack Developer | Passionate About Building
                  User-Friendly, Scalable Web Applications | Expertise in Modern
                  Front-End & Back-End Technologies.
                </p>

                <div className="details">
                  <div className="details-left">
                    <ul>
                      <li>
                        <strong>Birthday:</strong> 2 Oct 2002
                      </li>
                      <li>
                        <strong>Phone:</strong> +91 8369638314
                      </li>
                      <li>
                        <strong>City:</strong> Maharashtra
                      </li>
                    </ul>
                  </div>
                  <div className="details-right">
                    <ul>
                      <li>
                        <strong>Age:</strong> 24
                      </li>
                      <li>
                        <strong>Degree:</strong> B.Sc in Information Technology
                      </li>
                      <li>
                        <strong>Email:</strong> prajapatirukhmani922@gmail.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* skill */}
        <section id="skills" className="skills-section">
          <h2 className="skills-title">Areas of Expertise</h2>
          <p className="skills-subtitle">
            Highlights my areas of specialization with a focus on building
            efficient, user-friendly, and scalable applications.
          </p>

          <div className="skills-grid">
            {skills.map((item, idx) => {
              const Icon = item.icon as unknown as (props: {
                size?: number;
                color?: string;
              }) => JSX.Element;
              return (
                <div key={idx} className="skill-card">
                  <div className="skill-header">
                    <div className="skill-icon">
                      <Icon size={30} color={item.color} />{" "}
                      {/* apply color here */}
                    </div>
                    <div className="skill-progress">
                      <svg className="progress-ring" width="60" height="60">
                        <circle
                          className="progress-ring__bg"
                          cx="30"
                          cy="30"
                          r="25"
                        />
                        <circle
                          className="progress-ring__progress"
                          cx="30"
                          cy="30"
                          r="25"
                          style={{
                            strokeDasharray: 2 * Math.PI * 25,
                            strokeDashoffset:
                              2 * Math.PI * 25 * (1 - item.value / 100),
                          }}
                        />
                      </svg>
                      <span className="progress-value">{item.value}%</span>
                    </div>
                  </div>
                  <h3 className="skill-name">{item.name}</h3>
                  <p className="skill-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
        <section id="portfolio">
          <Container className="resume-container">
            <h2 className="resume-title"> My Resume</h2>
            <Typography align="center" className="resume-subtitle">
              Explore my professional experience, personal projects, and
              education.
            </Typography>

            {/* EXPERIENCE */}
            <Box className="resume-box experience-box">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box className="resume-header">
                    <Work className="resume-icon experience-icon" />
                    <Typography variant="h6">
                      Professional Experience
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="resume-content">
                    <h4>Sentient Systems Private Limited (2024 - Present)</h4>
                    <p>
                      <em>
                        Ambrosia - Marine Catering Software (Client: World
                        Marine Service)
                      </em>
                    </p>
                    <ul>
                      <li>
                        Created modules including Requisition, RFQ, Vendor
                        Quotes, Purchase Orders, Invoices, and Crew Surveys.
                      </li>
                      <li>
                        Managed master data for vessels, ports, vendors,
                        packaging, nutrition, cuisines, etc.
                      </li>
                      <li>
                        Implemented invoice approval workflows and dynamic forms
                        for recipe items and inventory management
                      </li>
                      <li>
                        Supported multiple user roles (Admin, Supplier, Client)
                        with access control and Excelbased reporting.
                      </li>
                      <li>
                        Developed a Catering Management System, streamlining
                        workflows from requisition to payment and reporting.
                      </li>
                      <li>
                        <strong>Tech:</strong> Angular, .NET Core, SQL Server,
                        RESTful APIs, Git, Postman.
                      </li>
                    </ul>
                    <p>
                      <em>ANJ Next Wave</em>
                    </p>
                    <ul>
                      <li>
                        Developed a dynamic and interactive data dashboard that
                        filters records based on a date range (FromDate and
                        ToDate).
                      </li>
                      <li>
                        Allowed users to download data from the application into
                        Excel files and Enabled users to upload Excel files and
                        save the data to the database and image upload.
                      </li>
                      <li>
                        Added, deleted, and edited and, records and Select
                        dropdown values in the web application using React
                      </li>

                      <li>
                        <strong>Tech:</strong> ReactJs, MUI, JavaScript, HTML,
                        CSS, .Net core, SQL
                      </li>
                    </ul>

                    <p>
                      <em>Vov ( Value of Visit )</em>
                    </p>
                    <ul>
                      <li>
                        Added meeting schedule where users can schedule their
                        meetings based on which user is going to meet which
                        client employee and user can add more clients on pages.
                      </li>
                      <li>
                        <strong>Tech:</strong> ReactJs, MUI, JavaScript, HTML,
                        CSS, .Net core, SQL.
                      </li>
                    </ul>

                    <p>
                      <em>Vov ( Value of Visit )</em>
                    </p>
                    <ul>
                      <li>
                        Added meeting schedule where users can schedule their
                        meetings based on which user is going to meet which
                        client employee and user can add more clients on pages.
                      </li>
                      <li>
                        <strong>Tech:</strong> ReactJs, MUI, JavaScript, HTML,
                        CSS, .Net core, SQL.
                      </li>
                    </ul>

                    <p>
                      <em>Societies Management Platform (SS Society)</em>
                    </p>
                    <ul>
                      <li>Added parking type, building unit.</li>
                      <li>
                        Features: Society function – Society Setup, Member
                        Management, etc
                      </li>
                      <li>
                        <strong>Tech:</strong> ReactJs, MUI, JavaScript, HTML,
                        CSS, .Net core, SQL.
                      </li>
                    </ul>
                  </div>
                </AccordionDetails>
              </Accordion>
            </Box>

            {/* PROJECTS */}
            <Box className="resume-box project-box">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box className="resume-header">
                    <Rocket className="resume-icon project-icon" />
                    <Typography variant="h6">Personal Projects</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="resume-content">
                    <h4>Food Recipe Website (Dec 2021 - Mar 2022)</h4>
                    <ul>
                      <li>
                        Food recipe website, we provide a search platform where
                        a user can find videos according to their choices and we
                        provide a reed recipe where users can read recipes there
                        is one feature on this website.
                      </li>
                      <li>
                        Created a recipe site allowing video & image uploads by
                        users.
                      </li>
                      <li>
                        Implemented user login, rating, and search
                        functionalities.
                      </li>
                      <li>
                        <strong>Tech:</strong> PHP, MySQL, HTML, CSS, JS.
                      </li>
                    </ul>
                  </div>
                </AccordionDetails>
              </Accordion>
            </Box>

            {/* EDUCATION */}
            <Box className="resume-box education-box">
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box className="resume-header">
                    <School className="resume-icon education-icon" />
                    <Typography variant="h6">Education</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="resume-content">
                    <h4>Prahladrai Dalmia Lions College (2019 - 2022)</h4>
                    <p>B.Sc. in Information Technology</p>

                    <h4>Shri T P Bhatia College of Science (2017 - 2019)</h4>
                    <p>HSC (12th Science Stream)</p>
                  </div>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Container>
        </section>

        <section id="service" className="services-section">
          <h2 className="services-title">My Services</h2>
          <p className="services-subtitle">
            Here are the professional services I offer — focused on creating
            high-quality, user-friendly, and scalable digital solutions.
          </p>

          <div className="services-grid">
            {services.map((item, idx) => {
              const Icon = item.icon as React.ElementType;
              return (
                <motion.div
                  key={idx}
                  className="service-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="service-header">
                    <div className="service-icon">
                      <Icon style={{ fontSize: 40, color: item.color }} />
                    </div>
                  </div>

                  <h3 className="service-name">{item.name}</h3>
                  <p className="service-desc">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <Container>
            <Box textAlign="center" mb={5}>
              {/* <Typography variant="h4" component="h2" className="contact-title">
            Contact Me
          </Typography> */}
              <h2 className="resume-title">Contact Me</h2>
            </Box>

            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="flex-start"
            >
              {/* Left Info */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Box className="contact-info-box">
                  <Box className="contact-info-item">
                    <LocationOnOutlinedIcon className="contact-icon" />
                    <div>
                      <Typography variant="h6">Address</Typography>
                      <Typography variant="body2">
                        Pune 411017
                        <br />
                        Maharashtra, INDIA
                      </Typography>
                    </div>
                  </Box>

                  <Box className="contact-info-item">
                    <LocalPhoneOutlinedIcon className="contact-icon" />
                    <div>
                      <Typography variant="h6">Call Us</Typography>
                      <Typography variant="body2">
                        <a href="tel:+918369638314" className="contact-link">
                          +91 8369638314
                        </a>
                      </Typography>
                    </div>
                  </Box>

                  <Box className="contact-info-item">
                    <MailOutlineOutlinedIcon className="contact-icon" />
                    <div>
                      <Typography variant="h6">Email Us</Typography>
                      <Typography variant="body2">
                        <a
                          href="mailto:prajapatirukhmani922@gmail.com"
                          className="contact-link"
                        >
                          prajapatirukhmani922@gmail.com
                        </a>
                      </Typography>
                    </div>
                  </Box>
                </Box>
              </Grid>

              {/* Right Form */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Box className="contact-form-box">
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="Name *"
                          name="name"
                          fullWidth
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="Email *"
                          name="email"
                          fullWidth
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="Phone"
                          name="phone"
                          fullWidth
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="Message *"
                          name="message"
                          fullWidth
                          multiline
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </Grid>

                      <Grid size={{ xs: 12 }} textAlign="center">
                        <Button
                          type="submit"
                          variant="contained"
                          className="contact-btn"
                        >
                          SUBMIT
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </section>
        <footer
          id="footer"
          className="footer position-relative"
          style={{ backgroundColor: "#f8f9fa", padding: "30px 0" }}
        >
          <Container>
            <Box textAlign="center" mb={3}></Box>

            <Box display="flex" justifyContent="center" mb={4}>
              <SocialIcon
                href="https://github.com/"
                Icon={FaGithub}
                color="#000000" // GitHub black
              />
              <SocialIcon
                href="https://www.linkedin.com/"
                Icon={FaLinkedin}
                color="#0A66C2" // LinkedIn blue
              />
            </Box>

            {/* Copyright and Credits */}
            <Box textAlign="center">
              {/* <Typography variant="body2" color="textSecondary">
            <span>Copyright</span> <strong className="px-1">Alex Smith</strong> <span>All Rights Reserved</span>
          </Typography> */}
              <Typography variant="body2" color="textSecondary">
                Designed & Developed by Rkhmani Prajapati
                {/* <Link href="https://bootstrapmade.com/" target="_blank" rel="noopener">
              BootstrapMade
            </Link> */}
              </Typography>
            </Box>
          </Container>
        </footer>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={snackbar.severity}
            variant="filled"
            onClose={() => setSnackbar({ ...snackbar, open: false })}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </>
    </>
  );
};

export default App;
