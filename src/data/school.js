import { asset } from '../lib/asset.js'
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
  // Shown publicly on the site as the school's contact address.
  email: 'karyonzschool@gmail.com',
  // Where the enquiry form actually sends. Kept separate from `email` so the
  // published address and the inbox that receives submissions can differ.
  enquiryEmail: 'sadanandguptat@gmail.com',
  hours: 'Mon–Fri: 9:00 AM – 7:30 PM · Sat: 9:00 AM – 2:30 PM · Sun: 9:30 – 11:30 AM',
  // Destination used for the map embed and the "Get Directions" link.
  // Keep it short and unambiguous so Google resolves it to the right pin.
  // If the pin ever lands slightly off, replace this with the exact
  // "lat,lng" copied from Google Maps (right-click the pin -> copy coords).
  mapsQuery: 'Karyonz Play School, Bharathi Nagar, Singampunari, Sivaganga, Tamil Nadu 630502',
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
//
// `art` is an animated icon in public/assets/activities/. The source files are
// 640x640, far larger than the ~56px tile they render into, so they are resized
// to 128 (2x for retina) with gifsicle before being committed - at full size the
// ten of them came to 14 MB.
export const activities = [
  { art: asset('assets/activities/abacus.gif'), name: 'Abacus' },
  { art: asset('assets/activities/painting.gif'), name: 'Drawing' },
  { art: asset('assets/activities/writing.gif'), name: 'Handwriting' },
  { art: asset('assets/activities/keyboard.gif'), name: 'Keyboard' },
  { art: asset('assets/activities/classic-guitar.gif'), name: 'Guitar' },
  { art: asset('assets/activities/wind-mill.gif'), name: 'Art & Craft' },
  { art: asset('assets/activities/ballet.gif'), name: 'Western Dance' },
  { art: asset('assets/activities/kick-boxing.gif'), name: 'Karate' },
  { art: asset('assets/activities/microphone-in-hand.gif'), name: 'Music' },
  // The only still one in the set; nothing to animate.
  { art: asset('assets/activities/silambam.png'), name: 'Silambam' },
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
  { src: asset('assets/campus_view.jpg'), alt: 'Karyonz School students in the school corridor', label: 'Campus Life' },
  { src: asset('assets/classroom_play.jpg'), alt: 'Students in a bright, colourful classroom', label: 'Classroom Play' },
  { src: asset('assets/student_activities.jpg'), alt: 'Children doing fine motor skill activities', label: 'Student Activities' },
  { src: asset('assets/learning_moments.jpg'), alt: 'A student engaged in a learning activity', label: 'Learning Moments' },
  { src: asset('assets/gallery_extra_1.jpg'), alt: 'Students with craft planters outside the school', label: 'Craft Activity' },
]

// Facebook reels and videos from the school's own page, embedded through
// Facebook's official video plugin.
//
// Each one must be PUBLIC on Facebook or it renders as an empty box for
// visitors. Nothing here is fetched until a visitor clicks a tile — see
// VideoGallery.vue for why.
//
// `shape` is the video's TRUE aspect ratio, read off the loaded player rather
// than assumed from the URL: a /reel/ URL is often landscape or square, and
// guessing from the URL letterboxes it into black bars. Check a new one before
// tagging it.
//   'tall'   -> portrait 9:16
//   'wide'   -> landscape 16:9
//   'square' -> 1:1
//
// Videos that fail to embed ("Unavailable" / rights-blocked) are left out
// entirely — an embed that errors is worse than one that is absent.
//
// `poster` is Facebook's own thumbnail for the video, saved locally: the CDN
// URLs it comes from are signed and expire, so they cannot be linked directly.
// Re-extract with the same trick if a video is ever replaced — load the plugin
// with autoplay=false and read the poster <img> off the paused player.
export const videos = [
  { id: '744093234828358', shape: 'wide', poster: asset('assets/video-thumbs/744093234828358.jpg'),
    url: 'https://www.facebook.com/reel/744093234828358' },
  { id: '637148748735992', shape: 'wide', poster: asset('assets/video-thumbs/637148748735992.jpg'),
    url: 'https://www.facebook.com/100063749422618/videos/637148748735992' },
  { id: '1970511030042133', shape: 'wide', poster: asset('assets/video-thumbs/1970511030042133.jpg'),
    url: 'https://www.facebook.com/reel/1970511030042133' },
  { id: '861918712564457', shape: 'square', poster: asset('assets/video-thumbs/861918712564457.jpg'),
    url: 'https://www.facebook.com/reel/861918712564457' },
  { id: '351364690721018', shape: 'square', poster: asset('assets/video-thumbs/351364690721018.jpg'),
    url: 'https://www.facebook.com/reel/351364690721018' },
  { id: '409472215127012', shape: 'tall', poster: asset('assets/video-thumbs/409472215127012.jpg'),
    url: 'https://www.facebook.com/reel/409472215127012' },
  { id: '921278826666917', shape: 'square', poster: asset('assets/video-thumbs/921278826666917.jpg'),
    url: 'https://www.facebook.com/reel/921278826666917' },
  { id: '3628594527384469', shape: 'square', poster: asset('assets/video-thumbs/3628594527384469.jpg'),
    url: 'https://www.facebook.com/100063749422618/videos/3628594527384469' },
]
