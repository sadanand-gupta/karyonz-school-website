// Central place for school contact/business info.
// Sourced from the school's own details + public Facebook page tagline.
// Swap phone/address/hours here if anything changes.
export const school = {
  name: 'Karyonz Play & CBSE School',
  tagline: "Childhood is a short season — let's redefine it, together.",
  subtitle: 'Nurturing Young Minds in Singampunari Through Care, Play, and Creative Learning.',
  address: '16-10/37, Bharathi Nagar, Near Old Fire Service Station, Singampunari – 630502, Sivaganga District, Tamil Nadu',
  phone: '+91 95665 93549',
  phoneHref: 'tel:+919566593549',
  phoneAlt: '+91 80986 95361',
  phoneAltHref: 'tel:+918098695361',
  email: 'karyonzschool@gmail.com',
  hours: 'Mon–Fri: 9:00 AM – 7:30 PM · Sat: 9:00 AM – 2:30 PM · Sun: 9:30 – 11:30 AM',
  facebook: 'https://www.facebook.com/people/Karyonz-School/100063749422618/',
  rating: { value: 4.7, count: 8, source: 'Justdial' },
}

export const pillars = [
  {
    icon: '🛡️',
    title: 'Child-Safe Environment',
    text: 'Safe materials, hygienic spaces, and continuous adult supervision at every stage of the day.',
  },
  {
    icon: '🧩',
    title: 'Activity-Based Learning',
    text: 'Focus on baseline literacy, tactile toy exploration, and physical rhythm through guided play.',
  },
  {
    icon: '🤝',
    title: 'Parent-Teacher Trust',
    text: 'Transparent feedback, regular tracking updates, and open communication channels with every family.',
  },
]

export const programs = [
  {
    name: 'Playgroup',
    ageGroup: 'Ages 2 to 3 Years',
    color: 'coral',
    icon: '🧸',
    description:
      'Focuses on separation ease, tactile sensory development, motor skill coordination, simple speech milestones, and group rhythm.',
  },
  {
    name: 'Nursery',
    ageGroup: 'Ages 3 to 4 Years',
    color: 'sky',
    icon: '🖍️',
    description:
      'Introduces structured vocabulary phonics, colour/shape recognition, fundamental tracing, and social classroom mannerisms.',
  },
  {
    name: 'LKG',
    ageGroup: 'Ages 4 to 5 Years',
    color: 'sunny',
    icon: '📚',
    description:
      'Focuses on writing readiness, introductory counting sets, creative roleplay, and baseline confidence building.',
  },
  {
    name: 'UKG',
    ageGroup: 'Ages 5 to 6 Years',
    color: 'lime',
    icon: '🎓',
    description:
      'Targets complete CBSE primary school transition readiness, elementary phrase creation, basic numbers, and analytical curiosity.',
  },
]

export const facilities = [
  {
    icon: '🧸',
    text: 'Secured indoor developmental play spaces packed with interactive learning aids.',
  },
  {
    icon: '🧼',
    text: 'Thorough daily sanitation cycles using non-toxic cleaning protocols.',
  },
  {
    icon: '🎉',
    text: 'Structured calendar events — cultural celebrations, fancy dress assemblies, and sports days.',
  },
  {
    icon: '👩‍🏫',
    text: 'Highly experienced, patient educational staff specialising in early-year child care.',
  },
]

export const testimonials = [
  {
    name: 'Parent Feedback',
    role: '',
    quote:
      "Karyonz has been a second home for my child. The teachers (especially Raji Ma'am) are extraordinarily caring, patient, and approachable.",
  },
  {
    name: 'Local Review',
    role: '',
    quote:
      'We noticed clear improvements in communication, motor skills, and self-confidence within months. Highly recommended in the Singampunari area.',
  },
  {
    name: 'Google Local Review',
    role: '',
    quote:
      'A very warm, safe environment for toddlers. The focus on activity-based learning is wonderful.',
  },
]

// Real enrichment activities offered alongside the core academic batches
// (sourced from the school's own "Summer Splash" promotional flyer).
export const activities = [
  { icon: '🧮', name: 'Abacus' },
  { icon: '🎨', name: 'Drawing' },
  { icon: '✍️', name: 'Handwriting' },
  { icon: '🎹', name: 'Keyboard' },
  { icon: '🎸', name: 'Guitar' },
  { icon: '✂️', name: 'Art & Craft' },
  { icon: '💃', name: 'Western Dance' },
  { icon: '🥋', name: 'Karate' },
  { icon: '🎵', name: 'Music' },
  { icon: '🥍', name: 'Silambam' },
]

// Headline stats. Only verified figures are listed here — `value` is the
// number counted up to, `suffix` is appended after it.
//   batches / activities  -> from the school's own programme list
//   rating                -> Justdial listing (4.7 from 8 reviews)
// Add students / years-established here once the real figures are confirmed.
export const stats = [
  { icon: '🎓', value: 4, suffix: '', label: 'Learning Batches' },
  { icon: '🎨', value: 10, suffix: '+', label: 'Enrichment Activities' },
  { icon: '⭐', value: 4.7, suffix: '/5', label: 'Parent Rating', decimals: 1 },
  { icon: '💬', value: 8, suffix: '+', label: 'Parent Reviews' },
]

export const gallery = [
  { src: '/assets/campus_view.jpg', alt: 'Karyonz School students in the school corridor', label: 'Campus Life' },
  { src: '/assets/classroom_play.jpg', alt: 'Students in a bright, colourful classroom', label: 'Classroom Play' },
  { src: '/assets/student_activities.jpg', alt: 'Children doing fine motor skill activities', label: 'Student Activities' },
  { src: '/assets/learning_moments.jpg', alt: 'A student engaged in a learning activity', label: 'Learning Moments' },
  { src: '/assets/gallery_extra_1.jpg', alt: 'Students with craft planters outside the school', label: 'Craft Activity' },
  { src: '/assets/gallery_extra_2.jpg', alt: 'Students at the school playground', label: 'Playground Fun' },
]
