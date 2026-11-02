# BEYOND THE CODE --- Website Development Requirements

## 1. Objective

Act as a senior full-stack developer, creative director, 3D character
artist, UI/UX designer, motion designer, and performance engineer.

Build a complete, production-ready personal portfolio website titled
**BEYOND THE CODE.**

**Tagline:** One identity. Multiple dimensions. Infinite possibilities.

The website belongs to **Veera Vaishnavi K**, a Computer Science
(Artificial Intelligence) student, software engineer, AI developer, and
researcher.

This must be a distinctive, immersive, cinematic portfolio---not a
conventional developer portfolio template. Implement the complete
website, connect all interactions, test every route, and fix errors. Do
not stop at a landing-page mockup.

Core requirements: - Premium futuristic editorial design. - Smooth
cinematic transitions and meaningful interactions. - Personalised 3D
animated female character **VEE**, inspired by the supplied professional
photograph. - Interactive 3D digital identity card featuring the actual
photograph. - Four cinematic navigation doors. - Detailed portfolio
sections. - Working downloadable resume. - Fully responsive desktop,
tablet, and mobile layouts. - Clean, reusable, maintainable code.

## 2. Personal Assets and Identity

### Professional photograph

-   Locate the supplied photograph in uploaded assets.
-   Copy it to `public/images/veera-profile.jpg`.
-   Use the actual photograph on the digital ID card.
-   Preserve the person's real appearance; do not replace the photo with
    a generated face.
-   Use a high-quality crop and suitable object positioning.

### Personalised animated character --- VEE

Create a polished, stylised 3D female character inspired by the supplied
photograph. VEE should reflect: - Long, dark, flowing hair. - Similar
hairstyle and facial proportions. - Glasses with a similar shape. -
Similar overall appearance and styling. - Professional, friendly,
confident personality.

Do not use a generic robot, stock avatar, or unrelated character. VEE
should be a stylised interpretation, not a photorealistic clone.

Character design: - Professional modern outfit. - Website-coordinated
colours. - Expressive eyes and natural facial movements. - High-quality
3D rendering and smooth idle animation.

Required animations: - Natural blinking. - Subtle head movements. -
Smiling and facial expressions. - Welcoming hand gestures. - Approximate
dialogue-synchronised talking animation. - Idle animation while
waiting. - Smooth expression transitions.

If a rigged 3D character asset is unavailable, create the best
achievable character using an appropriate 3D or animation workflow. Do
not leave a placeholder or claim an unfinished feature is complete.
Provide a fallback for devices that cannot render WebGL.

## 3. Technology Stack

Use stable, compatible versions.

  Layer                 Technology
  --------------------- -------------------------------------
  Frontend              React + TypeScript
  Build tool            Vite
  Styling               Tailwind CSS
  Animation             GSAP + ScrollTrigger
  UI transitions        Framer Motion
  Smooth scrolling      Lenis
  3D rendering          Three.js + React Three Fiber + Drei
  Icons                 Lucide React
  Forms                 React Hook Form + Zod
  Backend if required   Node.js + Express
  Deployment            Vercel
  Version control       Git + GitHub

Before implementation: 1. Inspect the project directory and existing
dependencies. 2. Preserve working code where possible. 3. Establish a
clear component and asset structure. 4. Install compatible dependencies.
5. Start the development server and verify the application.

Do not add unnecessary libraries.

## 4. Visual Design System

**Design direction:** Luxury futuristic editorial. The website should
combine the feel of a premium technology brand, cinematic digital
experience, sophisticated personal identity, and interactive engineering
portfolio.

Avoid generic templates, excessive gradients, random floating cards,
unnecessary glassmorphism, too many neon colours, overloaded sections,
and animations that reduce readability.

### Colour palette

  Purpose                     Colour
  --------------------------- -----------
  Warm background             `#F5F1E9`
  Primary charcoal            `#171717`
  Dark cinematic background   `#101116`
  Accent violet               `#9275FF`
  Light violet                `#D9CEFF`
  Gold accent                 `#C7A66A`
  Muted text                  `#686868`
  Divider                     `#DED9D0`

Use warm ivory and charcoal for editorial sections, and dark cinematic
sections for the interactive experience.

### Typography

-   Headings: Space Grotesk or Manrope.
-   Body: Inter.
-   Optional editorial highlights: Playfair Display.

Use strong typography hierarchy, generous whitespace, balanced layouts,
and controlled text widths.

## 5. Complete Website Experience

### Scene 01 --- Cinematic Opening

Display:

**BEYOND THE CODE.**

"One identity. Multiple dimensions. Infinite possibilities."

Include a subtle animated background, elegant typography reveal,
atmospheric lighting, smooth entrance animation, **Enter Experience**
button, and **Skip Intro** option. Do not unnecessarily delay access to
the website.

### Scene 02 --- Meet VEE

Introduce VEE in a balanced composition with a modern speech panel.

Use this exact dialogue:

> "Hey there! Welcome to Beyond the Code. I'm VEE, your guide. Today,
> I'm introducing you to Veera Vaishnavi --- a software engineer, AI
> enthusiast and researcher who enjoys turning challenging ideas into
> intelligent solutions. Ready to explore her world?"

Requirements: - Dialogue starts automatically after entering the
experience. - Use typewriter or natural dialogue reveal. - Character
animation changes while speaking. - Provide Skip, Replay, and Sound
On/Off controls. - Include a Continue button. - Dialogue must remain
understandable without audio. - Respect browser autoplay restrictions;
never play sound without appropriate user interaction. - Provide visible
dialogue or captions.

VEE is a digital guide, not a chatbot. Do not invent conversational AI
functionality.

### Scene 03 --- Interactive 3D Digital ID Card

Create a premium identity card centred on the screen with realistic 3D
flip interaction.

**Front:** - Actual uploaded professional photograph. - VEERA VAISHNAVI
K. - Software Engineer \| AI Developer. - B.E. Computer Science
(Artificial Intelligence). - Saveetha School of Engineering. -
Graduation: 2028.

Use premium proportions, elegant typography, subtle violet/gold
detailing, smooth pointer-based 3D tilt, and click/tap-to-flip
interaction.

**Back:** - GitHub. - LinkedIn. - Email. - Technical interests. -
Download Resume. - Explore Portfolio.

Verified links: - GitHub: https://github.com/VeeraVaishnaviK - LinkedIn:
https://www.linkedin.com/in/veera-vaishnavi/ - Email:
vaishureddy26096@gmail.com

All links must work. Make the card keyboard accessible. On mobile, use
tap to flip rather than hover-only interaction.

### Scene 04 --- Four Cinematic Navigation Doors

Create four large, visually distinct interactive doors with cinematic
lighting, depth, hover/touch interactions, and smooth opening
transitions.

**Door 01 --- THE BUILDER** - Theme: Violet. - Subtitle: "Turning ideas
into working products." - Content: software engineering, full-stack
development, web applications, system architecture, and real-world
projects.

**Door 02 --- THE INTELLIGENCE** - Theme: Blue. - Subtitle: "Building
intelligence into technology." - Content: Artificial Intelligence,
Machine Learning, Computer Vision, AI integrations, and intelligent
applications.

**Door 03 --- THE RESEARCHER** - Theme: Green. - Subtitle: "Exploring
problems through research." - Content: research work, IEEE publication,
Parkinson's disease screening research, technical experimentation, and
research achievements.

**Door 04 --- THE LEADER** - Theme: Gold. - Subtitle: "Leading people,
ideas and innovation." - Content: GDG On Campus SIMATS, Hackathon Club,
innovation activities, leadership responsibilities, and awards.

Each door must respond to hover and touch, have a distinctive opening
animation, navigate to its correct section, and provide a clear return
path. Doors must not be the only navigation method; include conventional
navigation.

## 6. Portfolio Sections

### A. About Me

Heading: **More than a developer. A problem solver.**

Introduction:

"I'm Veera Vaishnavi K, a Computer Science (Artificial Intelligence)
student passionate about software engineering, intelligent systems and
research. I enjoy transforming complex ideas into practical digital
solutions, building useful products and continuously exploring emerging
technologies."

Display: - B.E. CSE (Artificial Intelligence). - Saveetha School of
Engineering. - Expected graduation: 2028. - CGPA: 9.22/10.

Use a professional editorial layout with the profile photograph or a
complementary visual.

### B. Technical Skills

Organise skills into categories. Do not invent proficiency percentages
or ratings.

**Programming:** Python, Java, JavaScript, TypeScript, C, SQL.

**Frontend:** React, Next.js, HTML, CSS, Tailwind CSS.

**Backend:** Node.js, Express.js, FastAPI, REST APIs, Microservices
Architecture.

**Databases:** MongoDB, Mongoose, SQL.

**AI and Machine Learning:** MobileNet, KNN, LangChain, Google Gemini
API.

**Tools and Platforms:** Google Cloud Platform, Vercel, Git, GitHub, VS
Code, Android Studio.

Use animated skill groups, clean labels, and subtle interactions.

### C. Experience

**Founding Software Engineer --- Lin's InfoTech**\
December 2024 -- Present\
Website: https://linsinfotech.in

Description:

"Working on full-stack application development and AI-powered solutions,
contributing to system architecture, backend services and intelligent
application features."

Responsibilities: - Developed a three-layer microservices
architecture. - Built frontend applications using Next.js and
TypeScript. - Developed REST APIs using Node.js and Express. - Created
isolated Python/FastAPI services for AI functionality. - Implemented an
Express API gateway for authentication and AI request proxying. -
Implemented authentication, sessions, and lead capture using Mongoose. -
Applied Helmet, scoped CORS, and rate limiting. - Integrated LangChain
and Google Gemini API for streaming chatbot functionality. - Developed
asynchronous document-generation workflows. - Deployed applications
using Vercel. - Contributed to architecture, debugging, sitemap, and
metadata implementation.

Display as a premium experience timeline.

### D. Featured Projects

Create a premium project gallery with large project cards. Each project
must include name, description, problem solved, key features, technology
stack, available website/GitHub link, relevant visual/screenshot, and a
working View Project action.

**Project 01 --- APEX ENGINEERING**\
Website: https://apexengineering.org.in\
Technology: Next.js App Router, React, TypeScript, Vercel.

Description: A production-oriented engineering website built with a
focus on performance, SEO, and scalable content architecture.

Highlights: - 62 statically generated routes. - Dynamic product and blog
routes. - Optimised client-side JavaScript. - Server-side metadata and
canonical URLs. - Dynamic XML sitemap. - Client-side FAQ filtering
across 20+ records.

**Project 02 --- NEXACRO**\
Website: https://nexacro.in\
Technology: Python, React, MongoDB, Android Studio.

Description: An AI-assisted application for analysing acrosome integrity
from microscope images.

Highlights: - Classification of intact and damaged sperm cells. -
Image-based analysis workflow. - Web and Android clients. - Shared
backend architecture.

Do not invent clinical validation or claim medical diagnostic accuracy.

**Project 03 --- LAUNDEX**\
Website: https://laundex.in\
Technology: React, JavaScript, MongoDB.

Description: A hostel laundry management and booking platform.

Highlights: - Laundry booking. - Order tracking. - Digital workflow for
hostel laundry services.

Create reusable project-card and project-detail components.

### E. AI and Engineering

Heading: **Building Intelligence. Engineering Possibilities.**

Explain the user's interest in AI-powered applications, machine
learning, computer vision, AI integration in full-stack applications,
backend architecture, and scalable software systems.

Show this visual workflow:

**Problem → Data → Intelligence → Engineering → Application**

Use subtle motion and technical illustrations. Do not invent deployed
products or claim technologies not listed in the profile.

### F. Research and Publications

Heading: **Researching Beyond the Obvious.**

Featured research: **Parkinson's Disease Screening Using Spiral Hand
Sketches**

Publication: IEEE Conference Paper, ICFTS 2025, published in IEEE Xplore
in 2025.

Methods: - MobileNet. - K-Nearest Neighbours (KNN).

Reported result: **Over 92% accuracy.**

Display research title, objective, methodology, model approach, reported
result, and publication details. Provide a publication link only if a
verified URL is available. Do not fabricate a DOI or IEEE paper URL.

Use a research-paper-inspired layout with a clean technical visual.

### G. Leadership and Community

Display as an interactive timeline:

**Vice President --- Google Developer Group SIMATS**\
2025 -- Present.

**Research and Innovation Lead --- Hackathon Club SIMATS**\
2025 -- Present.

**Innovative Student Ambassador --- Institution's Innovation Council**\
March 2026 -- Present.

Highlight community building, technical event coordination, innovation
initiatives, research encouragement, and student collaboration.

### H. Achievements and Awards

Create a premium achievement gallery.

**First Prize --- 12-Hour Hackathon**\
Tutor--student matching platform with real-time chat and course
enrollment, built using React, Node.js, and MongoDB.

**Third Prize --- 24-Hour Hackathon**\
Fake news detection web application using external classification APIs.

**Best Poster Award --- Tech Star Summit**

**Torch Bearer Award --- 2025**

Use elegant award cards with subtle animations. Do not invent dates,
event names, or prize amounts.

### I. Current Learning Journey

Heading: **Always Learning. Always Building.**

Show current areas of development: - AI Engineering. - Data Structures
and Algorithms. - Advanced software engineering. - Machine Learning. -
Full-stack AI development.

Do not invent course completion certificates or claim mastery.

### J. Contact

Heading: **Have an idea? Let's build something meaningful.**

Display: - Email: vaishureddy26096@gmail.com - GitHub:
https://github.com/VeeraVaishnaviK - LinkedIn:
https://www.linkedin.com/in/veera-vaishnavi/

Include working email, GitHub, and LinkedIn links, a contact form, and
Download Resume button.

Contact form fields: - Name. - Email. - Subject. - Message.

Validate all fields. If no backend or email service is configured, do
not pretend the form sends messages. Implement a clearly documented
email-client fallback using a correctly encoded `mailto:` URL, or
integrate a real email service only after configuration. Show clear
success and error feedback.

## 7. Resume Download

The uploaded resume must be available as a downloadable PDF.

-   Copy the actual resume PDF to `public/resume.pdf`.
-   Set the download filename to `Veera_Vaishnavi_K_Resume.pdf`.
-   Add resume access on the digital ID card, navigation, and contact
    section.
-   Verify the file opens or downloads correctly.
-   Never create a fake resume PDF or link to a nonexistent file.
-   If the resume asset is unavailable, clearly report that it must be
    placed in the required location before deployment.

## 8. Navigation and Interactions

Create a minimal premium navigation bar with: - Home. - About. -
Skills. - Experience. - Projects. - Research. - Leadership. - Contact. -
Resume.

Requirements: - Smooth anchor navigation. - Active section indication. -
Responsive mobile menu. - Consistent transitions. - Functional
back-to-top control. - No dead links. - No decorative buttons without
actions.

Add a subtle custom cursor effect on desktop only if it does not
interfere with normal interactions.

## 9. Motion and Interaction Quality

Required: - Cinematic intro transitions. - Character idle and speaking
animation. - 3D card flip. - Subtle 3D card tilt. - Door opening
transitions. - Scroll-triggered reveals. - Project-card hover
interactions. - Animated section transitions. - Smooth scrolling. -
Button feedback. - Elegant loading transitions.

Animation rules: - Avoid excessive motion and blocking user
interaction. - Avoid scroll hijacking. - Respect
`prefers-reduced-motion`. - Use touch-friendly interactions. - Prevent
layout shifts. - Avoid expensive animations when sections are not
visible.

## 10. Responsive Design

Test at: - 360px mobile. - 390px mobile. - 430px mobile. - 768px
tablet. - 1024px laptop. - 1440px desktop. - 1920px wide screen.

Mobile requirements: - Responsive typography. - Properly cropped profile
image. - Touch-friendly ID card. - Doors arranged in an accessible
mobile layout. - Functional navigation menu. - No horizontal overflow,
clipped text, or overlapping buttons. - No mandatory hover
interactions. - Lightweight character fallback if 3D performance is
poor.

Do not simply shrink the desktop layout. Design mobile compositions
intentionally.

## 11. Performance, Accessibility, and SEO

### Performance

-   Lazy-load 3D models and heavy assets.
-   Use compressed images and modern formats where possible.
-   Split code by route or feature.
-   Avoid unnecessary dependencies and excessive re-renders.
-   Use appropriate loading fallbacks.
-   Clean up animation timelines and event listeners.
-   Keep the page usable on average mobile devices.

### Accessibility

-   Semantic HTML.
-   Keyboard-accessible navigation.
-   Visible focus states.
-   Meaningful alt text.
-   Accessible forms.
-   Sufficient colour contrast.
-   Reduced-motion support.
-   Accessible dialogue controls.

### SEO

Set: - Page title: `Beyond the Code | Veera Vaishnavi K` - Appropriate
meta description. - Open Graph metadata. - Favicon. - Canonical URL when
the final domain is known. - Sitemap. - `robots.txt`. - Structured
metadata where appropriate.

## 12. Code Architecture

Use a clean component-based structure.

``` text
src/
  components/
    navigation/
    intro/
    character/
    identity-card/
    doors/
    sections/
    projects/
    contact/
    shared/
  pages/
  hooks/
  animations/
  assets/
  data/
  styles/
  types/
  utils/

public/
  images/
    veera-profile.jpg
  models/
  textures/
  resume.pdf
  favicon/
```

Requirements: - Keep content data separate from UI components. - Use
reusable components and TypeScript types. - Avoid giant single-file
components and duplicated logic. - Keep animation logic organised. - Use
environment variables for secrets. - Never expose API keys in frontend
code. - Add error boundaries for major interactive sections. - Provide
graceful fallbacks for unavailable assets.

## 13. Error Prevention Rules

1.  Do not generate the entire application as one component.
2.  Do not use fake buttons or nonfunctional links.
3.  Do not use broken image paths.
4.  Do not use nonexistent resume or model assets.
5.  Do not leave TODO placeholders in completed features.
6.  Do not fabricate professional experience, achievements, or metrics.
7.  Do not replace the actual photograph on the ID card with an
    AI-generated image.
8.  Do not use a generic avatar instead of personalised VEE.
9.  Do not sacrifice mobile usability for desktop animations.
10. Do not force visitors through the intro.
11. Do not create a contact form that falsely reports successful
    delivery.
12. Do not use autoplay audio without user permission.
13. Do not ignore TypeScript or browser-console errors.
14. Do not deploy before testing required assets and links.

When a complex feature cannot be implemented with available assets,
build the best working fallback and clearly identify the missing asset.
Never represent a fallback as a completed 3D feature.

## 14. Development Workflow

Implement in phases.

### Phase 1 --- Foundation

-   Inspect the project.
-   Set up dependencies.
-   Configure fonts, colours, and layout.
-   Build responsive navigation.
-   Establish reusable components.

### Phase 2 --- Cinematic Experience

-   Build the opening scene.
-   Implement VEE.
-   Implement dialogue controls.
-   Build the 3D identity card.
-   Implement four navigation doors.

### Phase 3 --- Portfolio Content

Implement About, Skills, Experience, Projects, AI and Engineering,
Research, Leadership, Achievements, Learning Journey, and Contact.

### Phase 4 --- Functionality

Implement navigation, card interactions, door navigation, resume
download, external links, contact form, and mobile menu.

### Phase 5 --- Polish

Complete responsive refinements, motion optimisation, accessibility,
SEO, image optimisation, and error handling.

### Phase 6 --- Testing

Run: - TypeScript checks. - Production build. - Lint checks if
configured. - Browser testing. - Mobile layout testing. - Link
testing. - Form validation testing. - Resume download testing. -
Animation testing. - WebGL fallback testing.

Fix all errors before declaring completion.

## 15. Final Acceptance Checklist

### Identity

-   [ ] Actual professional photograph appears on the ID card.
-   [ ] VEE is a personalised character inspired by the photograph.
-   [ ] Character animations work.
-   [ ] Character fallback works.

### Opening experience

-   [ ] Cinematic opening works.
-   [ ] Introduction dialogue appears.
-   [ ] Skip, replay, and sound controls work.
-   [ ] Visitors can access the portfolio without being forced through
    the intro.

### ID card and navigation

-   [ ] 3D ID card flips correctly.
-   [ ] All personal details are correct.
-   [ ] GitHub, LinkedIn, and email links work.
-   [ ] Four doors have distinct interactions.
-   [ ] Each door navigates to the correct section.

### Portfolio

-   [ ] All sections are present.
-   [ ] All projects display correct details.
-   [ ] Experience is accurate.
-   [ ] Research details are accurate.
-   [ ] Leadership and awards are accurate.
-   [ ] No fabricated information appears.

### Functionality

-   [ ] Resume downloads successfully.
-   [ ] Contact form validates correctly.
-   [ ] Navigation works.
-   [ ] No dead buttons.
-   [ ] No broken images or links.

### Quality

-   [ ] Desktop layout works.
-   [ ] Mobile layout works.
-   [ ] No horizontal overflow.
-   [ ] Reduced-motion mode works.
-   [ ] No critical console errors.
-   [ ] Production build succeeds.

## 16. Final Instruction

Build **BEYOND THE CODE** as a complete, polished, deployable personal
portfolio. Prioritise visual quality, originality, usability,
performance, and functional correctness equally.

The key differentiators are: 1. Personalised animated VEE inspired by
the actual professional photograph. 2. Premium interactive 3D identity
card using the real photograph. 3. Four cinematic navigation doors
representing four professional dimensions. 4. Strong project
storytelling and engineering credibility. 5. Smooth, sophisticated
interactions without compromising performance.

Do not deliver only a plan, screenshot, or static prototype. Implement
the website, run it, test it, and fix errors.

Provide a final summary containing: - Completed features. - Project
structure. - Commands to run locally. - Missing assets, if any. - Build
and test results. - Deployment instructions.

**The final experience should feel like entering Veera Vaishnavi's
digital world---not opening another ordinary portfolio website.**
