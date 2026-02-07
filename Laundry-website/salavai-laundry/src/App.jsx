import React, { useState, useEffect, useRef, createContext, useContext, Component } from 'react';
import {
  Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageSquare,
  Waves, Shirt, Wrench, GraduationCap, ChevronRight, CheckCircle,
  Droplets, Monitor, Star, ArrowRight, PlayCircle, Sparkles, Loader,
  Home, Eye, BookOpen, RefreshCw, CircleDot, Zap, DollarSign, MessageCircle
} from 'lucide-react';
import Card from './components/Card';
import TrainingCard from './components/TrainingCard';

/**
 * ------------------------------------------------------------------
 * ERROR BOUNDARY
 * ------------------------------------------------------------------
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
          <h1 style={{ color: 'red' }}>Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
            <summary>Click for error details</summary>
            <p><strong>Error:</strong> {this.state.error && this.state.error.toString()}</p>
            <p><strong>Stack trace:</strong></p>
            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * ------------------------------------------------------------------
 * LANGUAGE CONTEXT & TRANSLATIONS
 * ------------------------------------------------------------------
 */
const LanguageContext = createContext({
  language: 'en',
  toggleLanguage: () => {},
  t: {}
});

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export { useLanguage };

const translations = {
  en: {
    // Navbar
    nav: {
      home: 'Home',
      about: 'About',
      vision: 'Vision',
      whySalavai: 'Why Us',
      equipment: 'Equipment',
      training: 'Training',
      whoCanJoin: 'Who Can Join',
      franchise: 'Franchise',
      csrSupport: 'CSR & Support',
      contact: 'Contact',
      language: 'ENG',
      switchTo: 'தமிழ்'
    },
    // Hero Section
    hero: {
      badge: 'Premium Laundromat Franchise',
      title1: 'Transform Your Future.',
      title2: 'Build a Thriving Business.',
      subtitle: 'Empowering traditional dhobis, homemakers, and entrepreneurs with state-of-the-art technology and sustainable business models.',
      cta: 'Start Your Journey',
      cta2: 'Partner With Us',
      brand: 'THE SALAVAI',
      tagline: 'Premium Laundry'
    },
    // About Section
    about: {
      subtitle: 'Who We Are',
      title: 'Where',
      tradition: 'Tradition',
      meets: 'Meets',
      innovation: 'Innovation',
      p1: 'Sustainable livelihoods emerge when skill meets opportunity. This principle drives The Salavai Laundry, a transformative initiative dedicated to creating stable income pathways and foster economic independence.',
      p2: 'We unite generations of mastery in fabric care with cutting-edge laundry technology to meet the rising demand for organized, professional laundry service in India (Tamil Nadu). Our mission is to help individuals and families establish scalable, dependable businesses that stand the test of time.',
      p3: 'We serve a diverse community: traditional dhobis ready to modernize their craft, homemakers seeking financial independence, differently-abled individuals and ambitious entrepreneurs looking to enter the laundry industry. Through access to capital, training, and mentorship, we provide the tools and support required to build a successful laundry business.'
    },
    // Vision Section
    vision: {
      title: 'Our Vision',
      p1: 'The Salavai Laundry is committed to strengthening local economies and empowering individuals to achieve financial independence through organized laundry entrepreneurship.',
      p2: 'Our vision is to transform traditional laundry skills into sustainable, professional businesses that improve the quality of life and create scalable economic opportunity. We envision a future where laundry entrepreneurs drive community prosperity, delivering quality service, and create meaningful livelihood that uplift families and strengthen local economies.',
      transform: 'Transform',
      transformDesc: 'Modernizing skills into professional enterprises.',
      create: 'Create',
      createDesc: 'Building scalable economic opportunities.',
      deliver: 'Deliver',
      deliverDesc: 'Quality service driving community prosperity.'
    },
    // Why Salavai Section
    whySalavai: {
      title: 'Why Salavai Laundry?',
      reason1: 'Social welfare-focused initiative',
      reason2: 'Low investment',
      reason3: 'Complete support',
      reason4: 'Modern machinery',
      reason5: 'Good income opportunity',
      reason6: 'Family life improvement'
    },
    // Equipment Section
    equipment: {
      title: 'Our Equipment',
      subtitle: 'We equip our partners with state-of-the-art commercial laundry systems designed for efficiency, durability, and superior fabric care.',
      washer: {
        title: 'LG Commercial Washer',
        desc: 'Professional Direct Drive technology with coin-operated system. Perfect for commercial laundromats with high-volume operations.',
        smart: 'Smart Controls',
        water: 'Water Efficient',
        coin: 'Coin System'
      },
      dryer10: {
        title: 'LG 10kg Dryer',
        desc: 'Compact yet powerful commercial dryer with advanced sensor technology.',
        capacity: '10kg Capacity'
      },
      titan: {
        title: 'LG Titan 15kg',
        desc: 'Maximum capacity electric dryer for high-volume commercial use.',
        capacity: '15kg Capacity'
      },
      gas: {
        title: 'LG Gas Dryer',
        desc: 'Cost-effective gas-powered solution delivering consistent performance and lower operating costs for busy laundromats.',
        cost: 'Cost Efficient',
        reliable: 'Reliable',
        maintenance: 'Low Maintenance'
      }
    },
    // Training Section
    training: {
      title: 'Training & Skill Development',
      subtitle: 'We provide hands-on training programs designed to ensure mastery across all aspects of commercial laundry operations.',
      module1: 'Operation, troubleshooting, routine maintenance of commercial laundry equipment.',
      module2: 'Advanced fabric handling techniques and professional stain removal methods.',
      module3: 'End-to-end workflow management for efficient daily operations.',
      module4: 'Hygiene protocols, safety compliance, and quality assurance frameworks.',
      module5: 'Customer service excellence, strategic pricing models, and business sustainability practices.',
      module6: 'How to handle customers and build relationships.',
      module7: 'Pricing strategies and profit optimization methods.'
    },
    // Who Can Join Section
    whoCanJoin: {
      title: 'Who Can Join?',
      subtitle: 'No prior experience required',
      category1: 'Traditional dhobi families',
      desc1: 'Modernize your traditional skills with professional equipment. Build a sustainable business for your family\'s future.',
      category2: 'Women / Homemakers',
      desc2: 'Achieve financial independence from home. Flexible hours that fit your family responsibilities.',
      category3: 'Differently-abled individuals',
      desc3: 'Equal opportunity for meaningful work. We provide specialized training and accessible equipment.',
      category4: 'Unemployed youth',
      desc4: 'Start your entrepreneurial journey with complete support. Learn valuable skills and build your own business.',
      category5: 'Aspiring small business owners',
      desc5: 'Low investment, high returns opportunity. Complete business setup with ongoing mentorship and support.'
    },
    // Franchise Section
    franchise: {
      title: 'Franchise',
      subtitle: 'What we provide:',
      item1: 'Complete business setup',
      item2: 'Store design',
      item3: 'Brand name',
      item4: 'Machines',
      item5: 'Complete training',
      item6: 'Marketing support',
      item7: 'Ongoing guidance'
    },
    // CSR & Government Support Section
    csrSupport: {
      title: 'CSR & Government Support',
      subtitle: 'We partner with:',
      partner1: 'Corporate CSR programs',
      partner2: 'Banks',
      partner3: 'Government self-employment schemes',
      partner4: 'Skill development programs',
      description: 'Through these partnerships, financial assistance and training are provided to eligible candidates'
    },
    // Contact Section
    contact: {
      title: 'Contact Us',
      subtitle: 'Ready to transform your future? Reach out to us for mentorship and equipment inquiries.',
      phone: 'Phone',
      email: 'Email',
      location: 'Location',
      locationValue: 'Chennai, Tamil Nadu',
      formTitle: 'Send Message',
      fullName: 'Full Name',
      fullNamePlaceholder: 'John Doe',
      phoneNumber: 'Phone Number',
      phonePlaceholder: '+91...',
      locationLabel: 'Location',
      locationPlaceholder: 'City, Area',
      message: 'Message',
      messagePlaceholder: 'Tell us about your plans...',
      send: 'Send Message'
    },
    // Footer
    footer: {
      rights: 'All rights reserved.'
    }
  },
  ta: {
    // Navbar
    nav: {
      home: 'முகப்பு',
      about: 'எங்களைப் பற்றி',
      vision: 'நோக்கம்',
      whySalavai: 'ஏன் நாங்கள்',
      equipment: 'உபகரணங்கள்',
      training: 'பயிற்சி',
      whoCanJoin: 'யார் சேரலாம்',
      franchise: 'பிராஞ்சைஸ்',
      csrSupport: 'CSR & உதவி',
      contact: 'தொடர்பு',
      language: 'தமிழ்',
      switchTo: 'ENG'
    },
    // Hero Section
    hero: {
      badge: 'பிரீமியம் சலவை தொழில் உரிமை',
      title1: 'சலவை லாண்ட்ரி',
      title2: 'ஒரு தொழில் – ஒரு வாழ்க்கை மாற்றம்',
      subtitle: 'தமிழ்நாடு முழுவதும் பாரம்பரிய சலவை வேலையை நவீனமாக மாற்றி நல்ல வருமானம் தரும் தொழிலாக உருவாக்குகிறோம்.',
      cta: 'உங்கள் சலவை தொழிலை தொடங்குங்கள்',
      cta2: 'எங்களுடன் இணைந்து செயல்படுங்கள்',
      brand: 'சலவை லாண்ட்ரி',
      tagline: ''
    },
    // About Section
    about: {
      subtitle: 'எங்களைப் பற்றி',
      title: 'எங்கு',
      tradition: 'பாரம்பரியம்',
      meets: 'சந்திக்கிறது',
      innovation: 'புதுமை',
      p1: 'சலவை லாண்ட்ரி என்பது மக்களுக்கு சுயதொழில் வாய்ப்பு உருவாக்க தொடங்கப்பட்ட ஒரு முயற்சி. பாரம்பரிய சலவை அனுபவத்தையும், புதிய தொழில்நுட்ப இயந்திரங்களையும் சேர்த்து, நல்ல தரமான சலவை சேவையை உருவாக்குகிறோம்.',
      p2: 'நாங்கள் உதவி செய்வது: பாரம்பரிய வண்ணான் (தோபி) குடும்பங்கள், இல்லத்தரசிகள், மாற்றுத் திறனாளிகள், வேலை இல்லாத இளைஞர்கள், தொழில் தொடங்க விரும்புபவர்கள்.',
      p3: 'பயிற்சி, இயந்திரங்கள், நிதி உதவி மற்றும் தொடர்ந்து வழிகாட்டுதல் வழங்குகிறோம்.'
    },
    // Vision Section
    vision: {
      title: 'எங்கள் நோக்கம்',
      p1: 'த சலவை வணிகம் உள்ளூர் பொருளாதாரங்களை வலுப்படுத்துவதற்கும், ஒழுங்கமைக்கப்பட்ட சலவை தொழில்முனைவு மூலம் நிதி சுதந்திரத்தை அடைய தனிநபர்களுக்கு அதிகாரம் அளிப்பதற்கும் உறுதிபூண்டுள்ளது.',
      p2: 'பாரம்பரிய சலவை திறன்களை வாழ்க்கைத் தரத்தை மேம்படுத்தும் மற்றும் அளவிடக்கூடிய பொருளாதார வாய்ப்பை உருவாக்கும் நிலையான, தொழில்முறை வணிகங்களாக மாற்றுவதே எங்கள் நோக்கம். சலவை தொழில்முனைவோர் சமூக செழிப்பை இயக்கி, தரமான சேவையை வழங்கி, குடும்பங்களை உயர்த்தும் மற்றும் உள்ளூர் பொருளாதாரங்களை வலுப்படுத்தும் அர்த்தமுள்ள வாழ்வாதாரத்தை உருவாக்கும் எதிர்காலத்தை நாங்கள் கற்பனை செய்கிறோம்.',
      transform: 'மாற்றம்',
      transformDesc: 'திறன்களை தொழில்முறை நிறுவனங்களாக நவீனமயமாக்குதல்.',
      create: 'உருவாக்குதல்',
      createDesc: 'அளவிடக்கூடிய பொருளாதார வாய்ப்புகளை உருவாக்குதல்.',
      deliver: 'வழங்குதல்',
      deliverDesc: 'சமூக செழிப்பை இயக்கும் தரமான சேவை.'
    },
    // Why Salavai Section
    whySalavai: {
      title: 'ஏன் சலவை லாண்ட்ரி?',
      reason1: 'சமூக நலனை நோக்கமாக கொண்ட திட்டம்',
      reason2: 'குறைந்த முதலீடு',
      reason3: 'முழு ஆதரவு',
      reason4: 'நவீன இயந்திரங்கள்',
      reason5: 'நல்ல வருமான வாய்ப்பு',
      reason6: 'குடும்ப வாழ்க்கை முன்னேற்றம்'
    },
    // Equipment Section
    equipment: {
      title: 'எங்கள் உபகரணங்கள்',
      subtitle: 'செயல்திறன், நீடித்த தன்மை மற்றும் மேம்பட்ட துணி பராமரிப்புக்காக வடிவமைக்கப்பட்ட அதிநவீன வணிக சலவை அமைப்புகளுடன் எங்கள் கூட்டாளர்களை நாங்கள் சித்தப்படுத்துகிறோம்.',
      washer: {
        title: 'எல்ஜி வணிக சலவை இயந்திரம்',
        desc: 'நாணய இயக்கப்படும் அமைப்புடன் தொழில்முறை நேரடி இயக்க தொழில்நுட்பம். அதிக அளவிலான செயல்பாடுகளுடன் வணிக சலவகங்களுக்கு சரியானது.',
        smart: 'ஸ்மார்ட் கட்டுப்பாடுகள்',
        water: 'நீர் திறன்',
        coin: 'நாணய அமைப்பு'
      },
      dryer10: {
        title: 'எல்ஜி 10கி.கி உலர்த்தி',
        desc: 'மேம்பட்ட சென்சார் தொழில்நுட்பத்துடன் கூடிய சிறிய ஆனால் சக்திவாய்ந்த வணிக உலர்த்தி.',
        capacity: '10கி.கி திறன்'
      },
      titan: {
        title: 'எல்ஜி டைட்டன் 15கி.கி',
        desc: 'அதிக அளவிலான வணிக பயன்பாட்டிற்கான அதிகபட்ச திறன் மின்சார உலர்த்தி.',
        capacity: '15கி.கி திறன்'
      },
      gas: {
        title: 'எல்ஜி எரிவாயு உலர்த்தி',
        desc: 'பிஸியான சலவகங்களுக்கு நிலையான செயல்திறன் மற்றும் குறைந்த இயக்க செலவுகளை வழங்கும் செலவு-திறனுள்ள எரிவாயு-இயக்க தீர்வு.',
        cost: 'செலவு திறன்',
        reliable: 'நம்பகமான',
        maintenance: 'குறைந்த பராமரிப்பு'
      }
    },
    // Training Section
    training: {
      title: 'பயிற்சி & திறன் வளர்ச்சி',
      subtitle: 'நாங்கள் வழங்கும் பயிற்சி:',
      module1: 'சலவை இயந்திரம் இயக்குவது',
      module2: 'இயந்திர பராமரிப்பு',
      module3: 'துணி துவைத்தல் & கறை நீக்குவது',
      module4: 'கடை நடத்தும் முறை',
      module5: 'சுத்தம் & பாதுகாப்பு விதிகள்',
      module6: 'வாடிக்கையாளரை எப்படி கையாளுவது',
      module7: 'விலை நிர்ணயம் & லாபம் பார்க்கும் முறை'
    },
    // Who Can Join Section
    whoCanJoin: {
      title: 'யார் சேரலாம்?',
      subtitle: 'முன் அனுபவம் தேவையில்லை',
      category1: 'வண்ணான் குடும்பங்கள்',
      desc1: 'உங்கள் பாரம்பரிய திறமையை நவீன தொழில்நுட்பத்துடன் மேம்படுத்துங்கள். குடும்ப எதிர்காலத்திற்கு நிலையான வணிகத்தை உருவாக்குங்கள்.',
      category2: 'பெண்கள் / இல்லத்தரசிகள்',
      desc2: 'வீட்டிலிருந்தே நிதி சுதந்திரம் பெறுங்கள். குடும்ப பொறுப்புகளுக்கு ஏற்ற நெகிழ்வான நேர அட்டவணை.',
      category3: 'மாற்றுத் திறனாளிகள்',
      desc3: 'அர்த்தமுள்ள வேலைக்கான சம வாய்ப்பு. சிறப்பு பயிற்சி மற்றும் அணுகக்கூடிய உபகரணங்களை வழங்குகிறோம்.',
      category4: 'வேலை இல்லாத இளைஞர்கள்',
      desc4: 'முழு ஆதரவுடன் உங்கள் தொழில் பயணத்தை தொடங்குங்கள். மதிப்புமிக்க திறன்களை கற்று சொந்த வணிகத்தை உருவாக்குங்கள்.',
      category5: 'சிறு தொழில் செய்ய விரும்புபவர்கள்',
      desc5: 'குறைந்த முதலீடு, அதிக வருமானம். தொடர் வழிகாட்டுதலுடன் முழுமையான வணிக அமைப்பு.'
    },
    // Franchise Section
    franchise: {
      title: 'பிராஞ்சைஸ்',
      subtitle: 'நாங்கள் வழங்குவது:',
      item1: 'முழு தொழில் அமைப்பு',
      item2: 'கடை வடிவமைப்பு',
      item3: 'பிராண்டு பெயர்',
      item4: 'இயந்திரங்கள்',
      item5: 'முழு பயிற்சி',
      item6: 'விளம்பர ஆதரவு',
      item7: 'தொடர்ந்து வழிகாட்டுதல்'
    },
    // CSR & Government Support Section
    csrSupport: {
      title: 'CSR & அரசு உதவி',
      subtitle: 'நாங்கள் இணைந்து செயற்படுவது:',
      partner1: 'நிறுவன CSR திட்டங்கள்',
      partner2: 'வங்கிகள்',
      partner3: 'அரசு சுயதொழில் திட்டங்கள்',
      partner4: 'திறன் வளர்ச்சி திட்டங்கள்',
      description: 'இதன் மூலம் தகுதியானவர்களுக்கு நிதி உதவி மற்றும் பயிற்சி வழங்கப்படும்'
    },
    // Contact Section
    contact: {
      title: 'எங்களை தொடர்பு கொள்ளுங்கள்',
      subtitle: 'உங்கள் எதிர்காலத்தை மாற்ற தயாரா? வழிகாட்டுதல் மற்றும் உபகரண விசாரணைகளுக்கு எங்களை தொடர்பு கொள்ளுங்கள்.',
      phone: 'தொலைபேசி',
      email: 'மின்னஞ்சல்',
      location: 'இடம்',
      locationValue: 'சென்னை, தமிழ்நாடு',
      formTitle: 'செய்தி அனுப்புங்கள்',
      fullName: 'முழு பெயர்',
      fullNamePlaceholder: 'உங்கள் பெயர்',
      phoneNumber: 'தொலைபேசி எண்',
      phonePlaceholder: '+91...',
      locationLabel: 'இடம்',
      locationPlaceholder: 'நகரம், பகுதி',
      message: 'செய்தி',
      messagePlaceholder: 'உங்கள் திட்டங்களை பற்றி எங்களிடம் கூறுங்கள்...',
      send: 'செய்தி அனுப்பு'
    },
    // Footer
    footer: {
      rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'
    }
  }
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ta' : 'en');
  };

  const t = translations[language];

  console.log('LanguageProvider rendering with language:', language);
  console.log('Translations available:', !!t);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * ------------------------------------------------------------------
 * GEMINI API UTILITIES
 * ------------------------------------------------------------------
 */
const GeminiService = {
  generateContent: async (prompt) => {
    const apiKey = ""; // Provided by runtime environment
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = { contents: [{ parts: [{ text: prompt }] }] };

    let delay = 1000;
    for (let i = 0; i < 5; i++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate advice at this moment. Please try again.";
      } catch (error) {
        if (i === 4) throw error;
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
      }
    }
  }
};

/**
 * ------------------------------------------------------------------
 * GLOBAL STYLES & ANIMATIONS
 * ------------------------------------------------------------------
 */
const GlobalStyles = () => (
  <style>{`
    /* --- FONTS: Traditional Tamil Feel with Meera Inimai & Noto Sans Tamil --- */
    /* Montserrat for Hero heading - bold, modern, professional */
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@400;500;600;700;800;900&family=Quicksand:wght@400;500;600;700&family=Meera+Inimai&family=Noto+Sans+Tamil:wght@400;500;600;700;800;900&family=Tiro+Tamil:ital@0;1&family=Coiny&family=Cormorant+Garamond:wght@400;500;600;700&display=swap');

    :root {
      --font-primary: 'Meera Inimai', 'Noto Sans Tamil', 'Tiro Tamil', sans-serif;
      --font-heading: 'Cormorant Garamond', serif;
      --font-hero: 'Poppins', sans-serif;
      --font-hero-body: 'Quicksand', sans-serif;
      --color-lg-red: #A50034; /* LG Red */
      --color-dark-blue: #003366; /* Dark Blue for Headings */
      --color-lg-red-dark: #7b0026;
    }

    body {
      font-family: var(--font-primary);
      margin: 0;
      overflow-x: hidden;
      background-color: #ffffff; /* White Background */
      color: #0f172a; /* Slate-900 Text */
    }

    /* Force all text elements to use the Tamil fonts */
    h1, h2, h3, h4, h5, h6, p, span, a, button, input, textarea, label, div {
      font-family: var(--font-primary) !important;
    }

    /* Headings use Cormorant Garamond for elegant feel */
    h1, h2, h3, h4, h5, h6, .font-heading {
      font-family: var(--font-heading) !important;
      color: var(--color-dark-blue) !important;
    }



    /* --- Scroll Progress Bar --- */
    .scroll-progress-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 6px;
      z-index: 9999;
      background: transparent;
    }
    .scroll-progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #A50034, #0077b6);
      width: 0%;
      border-radius: 0 4px 4px 0;
      box-shadow: 0 0 15px rgba(0, 119, 182, 0.8);
      transition: width 0.1s;
    }

    /* --- Click Ripple Effect --- */
    @keyframes ripple-animation {
      0% { transform: scale(0); opacity: 0.6; }
      100% { transform: scale(4); opacity: 0; }
    }
    .click-ripple {
      position: fixed;
      border-radius: 50%;
      background: rgba(0, 150, 199, 0.6); /* Ocean Blue Ripple */
      pointer-events: none;
      z-index: 9999;
      animation: ripple-animation 0.8s linear forwards;
      width: 40px;
      height: 40px;
      margin-left: -20px;
      margin-top: -20px;
      box-shadow: 0 0 10px rgba(0, 150, 199, 0.4);
    }

    /* --- Morphing Blob Animation --- */
    @keyframes morph {
      0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
      100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    }
    .morphing-blob {
      animation: morph 8s ease-in-out infinite;
      transition: all 1s ease-in-out;
    }

    /* --- 3D Floating Icons --- */
    @keyframes float-3d {
      0% { transform: translateY(0) rotateY(0deg) rotateZ(0deg); }
      50% { transform: translateY(-20px) rotateY(180deg) rotateZ(10deg); }
      100% { transform: translateY(0) rotateY(360deg) rotateZ(0deg); }
    }
    .float-icon-3d {
      animation: float-3d 8s ease-in-out infinite;
      transform-style: preserve-3d;
    }

    /* --- Liquid Button (LG Red) --- */
    .liquid-btn {
      position: relative;
      overflow: hidden;
      transition: color 0.4s ease-in-out;
      z-index: 1;
      background-color: #A50034; /* LG Red */
    }
    .liquid-btn::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 200%;
      background: #7b0026; /* Darker LG Red */
      border-radius: 40%;
      transition: top 0.6s ease-in-out;
      z-index: -1;
      transform: translateX(-5%) rotate(0deg);
      animation: wave-spin 6s linear infinite;
    }
    .liquid-btn:hover { color: white !important; }
    .liquid-btn:hover::before { top: -50%; }
    
    @keyframes wave-spin {
      from { transform: translateX(-5%) rotate(0deg); }
      to { transform: translateX(-5%) rotate(360deg); }
    }

    /* --- 3D Washing Machine Animation (CSS Only) --- */
    .machine-container {
      perspective: 1200px;
      width: 300px;
      height: 400px;
      margin: 0 auto;
    }
    .machine-cube {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transform: rotateY(-15deg);
      animation: machine-hover 6s ease-in-out infinite;
    }
    .face {
      position: absolute;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
    }
    .front {
      width: 300px;
      height: 400px;
      transform: translateZ(150px);
      background: linear-gradient(135deg, #fff 0%, #e2e8f0 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 24px;
      box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
      border: 2px solid #e5e7eb;
    }
    .side {
      width: 300px;
      height: 400px;
      transform: rotateY(90deg) translateZ(150px);
      background: #cbd5e1;
      border-radius: 20px;
    }
    .top {
      width: 300px;
      height: 300px;
      transform: rotateX(90deg) translateZ(150px);
      background: #e2e8f0;
      border-radius: 20px;
    }
    @keyframes machine-hover {
      0%, 100% { transform: rotateY(-15deg) translateY(0) rotateX(2deg); }
      50% { transform: rotateY(-10deg) translateY(-15px) rotateX(-2deg); }
    }
    
    .door {
      width: 220px;
      height: 220px;
      border-radius: 50%;
      border: 12px solid #cbd5e1;
      background: rgba(14, 165, 233, 0.2); /* Sea blue tint */
      box-shadow: 
        0 10px 30px rgba(0,0,0,0.2), 
        inset 0 0 20px rgba(0,0,0,0.2),
        inset 2px 2px 5px rgba(255,255,255,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(2px);
    }
    .water-inner {
      width: 300px;
      height: 300px;
      background: rgba(14, 165, 233, 0.8); /* Sea Blue Water */
      position: absolute;
      top: 50%;
      border-radius: 42%;
      animation: spin-water 4s linear infinite;
    }
    @keyframes spin-water {
      0% { transform: rotate(0deg) translateY(-10px); }
      100% { transform: rotate(360deg) translateY(-10px); }
    }

    /* --- Scrollbar Customization --- */
    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: #f8fafc; }
    ::-webkit-scrollbar-thumb { background: #A50034; border-radius: 5px; } /* LG Red Scrollbar */
    ::-webkit-scrollbar-thumb:hover { background: #7b0026; }

    /* --- Frutiger Button Styles --- */
    .frutiger-button {
      cursor: pointer;
      position: relative;
      padding: 2px;
      border-radius: 12px;
      border: 0;
      text-shadow: 1px 1px #000a;
      background: linear-gradient(#006caa, #00c3ff);
      box-shadow: 0px 4px 6px 0px #0008;
      transition: 0.3s all;
    }

    .frutiger-button:hover {
      box-shadow: 0px 6px 12px 0px #0009;
    }

    .frutiger-button:active {
      box-shadow: 0px 0px 0px 0px #0000;
    }

    .frutiger-inner {
      position: relative;
      inset: 0px;
      padding: 1.2em 2.5em;
      border-radius: 10px;
      background: radial-gradient(circle at 50% 100%, #30f8f8 10%, #30f8f800 55%),
        linear-gradient(#00526a, #009dcd);
      overflow: hidden;
      transition: inherit;
    }

    .frutiger-inner::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(-65deg, #0000 40%, #fff7 50%, #0000 70%);
      background-size: 200% 100%;
      background-repeat: no-repeat;
      animation: frutiger-shine 3s ease infinite;
    }

    @keyframes frutiger-shine {
      0% {
        background-position: 130%;
        opacity: 1;
      }
      to {
        background-position: -166%;
        opacity: 0;
      }
    }

    .frutiger-top-white {
      position: absolute;
      border-radius: inherit;
      inset: 0 -8em;
      background: radial-gradient(
        circle at 50% -270%,
        #fff 45%,
        #fff6 60%,
        #fff0 60%
      );
      transition: inherit;
    }

    .frutiger-inner::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      transition: inherit;
      box-shadow: inset 0px 2px 8px -2px #0000;
    }

    .frutiger-button:active .frutiger-inner::after {
      box-shadow: inset 0px 2px 8px -2px #000a;
    }

    .frutiger-text {
      position: relative;
      z-index: 1;
      color: #0f172a;
      font-weight: 700;
      transition: inherit;
      letter-spacing: 1px;
      font-family: 'Coiny', cursive;
    }
  `}</style>
);

/**
 * 3D Tilt Card Component
 */
const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 15 degrees for more 3D effect
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setRotation({ x: rotateX, y: rotateY });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-gpu transition-transform duration-100 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none z-20 rounded-2xl mix-blend-overlay transition-opacity duration-200 bg-gradient-to-tr from-transparent via-slate-200 to-transparent"
        style={{ opacity: opacity * 0.2 }}
      />
      {children}
    </div>
  );
};

/**
 * 3D Washing Machine Intro Animation - Transition Effect
 */
const WashingMachineIntro = ({ show, onComplete }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #003366 0%, #0077b6 50%, #00b4d8 100%)',
      animation: show ? 'fade-in-intro 0.5s ease-out' : 'fade-out-intro 1s ease-out forwards'
    }}>
      <style>{`
        @keyframes fade-in-intro {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-out-intro {
          0% { opacity: 1; transform: scale(1) rotateY(0deg); }
          50% { opacity: 0.8; transform: scale(0.9) rotateY(180deg); }
          100% { opacity: 0; transform: scale(0.5) rotateY(360deg); }
        }
        @keyframes machine-bounce {
          0%, 100% { transform: perspective(1200px) rotateX(10deg) translateY(0); }
          50% { transform: perspective(1200px) rotateX(10deg) translateY(-20px); }
        }
        @keyframes door-swing {
          0%, 100% { transform: perspective(800px) rotateY(0deg); }
          50% { transform: perspective(800px) rotateY(-25deg); }
        }
        @keyframes clothes-tumble {
          0% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(90deg) translateY(-10px); }
          50% { transform: rotate(180deg) translateY(0); }
          75% { transform: rotate(270deg) translateY(-10px); }
          100% { transform: rotate(360deg) translateY(0); }
        }
        @keyframes water-wave-intro {
          0%, 100% { 
            transform: translateX(-50%) rotate(0deg); 
            border-radius: 45% 55% 50% 50%;
          }
          25% { 
            transform: translateX(-50%) rotate(5deg); 
            border-radius: 50% 45% 55% 45%;
          }
          50% { 
            transform: translateX(-50%) rotate(0deg); 
            border-radius: 55% 50% 45% 55%;
          }
          75% { 
            transform: translateX(-50%) rotate(-5deg); 
            border-radius: 45% 55% 50% 45%;
          }
        }
        @keyframes foam-expand {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(180deg); opacity: 1; }
          100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
        }
        @keyframes shine-sweep {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>

      <div className="relative" style={{ animation: 'machine-bounce 2s ease-in-out infinite' }}>
        {/* 3D Washing Machine */}
        <div className="relative w-[450px] h-[450px]" style={{ transformStyle: 'preserve-3d' }}>
          {/* Machine Body */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.4)]" style={{
            transform: 'translateZ(30px)',
            border: '3px solid rgba(148, 163, 184, 0.3)'
          }}>
            {/* Top Panel with Display */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-[3rem] flex items-center justify-between px-8 border-b-4 border-slate-700">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg animate-pulse"></div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
              <div className="bg-slate-700 px-4 py-2 rounded-lg">
                <div className="text-green-400 font-mono text-sm font-bold">WASH CYCLE</div>
              </div>
            </div>

            {/* Glass Door - Swinging */}
            <div className="absolute top-32 left-1/2 -translate-x-1/2 w-72 h-72" style={{
              transformStyle: 'preserve-3d',
              animation: 'door-swing 2s ease-in-out infinite'
            }}>
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-2xl">
                {/* Chrome Ring */}
                <div className="absolute inset-3 rounded-full border-[12px] border-slate-600 shadow-inner"></div>

                {/* Glass Interior */}
                <div className="absolute inset-8 rounded-full overflow-hidden bg-gradient-to-br from-slate-600/40 to-slate-900/60" style={{
                  backdropFilter: 'blur(1px)'
                }}>
                  {/* Water with wave effect */}
                  <div className="absolute bottom-0 left-1/2 w-[140%] h-[75%] bg-gradient-to-t from-[#0077b6] via-[#00b4d8] to-[#00b4d8]/50" style={{
                    animation: 'water-wave-intro 2s ease-in-out infinite',
                    borderRadius: '45% 55% 50% 50%'
                  }}></div>

                  {/* Tumbling clothes */}
                  <div className="absolute inset-10 flex items-center justify-center" style={{
                    animation: 'clothes-tumble 3s linear infinite'
                  }}>
                    {/* Shirt icon */}
                    <div className="w-16 h-16 bg-white/80 rounded-lg shadow-lg flex items-center justify-center">
                      <Shirt size={32} className="text-[#0077b6]" />
                    </div>
                  </div>

                  {/* Foam bubbles */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full bg-white/70"
                      style={{
                        width: `${15 + Math.random() * 15}px`,
                        height: `${15 + Math.random() * 15}px`,
                        left: `${20 + i * 10}%`,
                        top: `${30 + (i % 3) * 20}%`,
                        boxShadow: 'inset 0 0 10px rgba(255,255,255,0.8), 0 0 15px rgba(0,180,216,0.4)',
                        animation: `foam-expand 2s ease-out infinite`,
                        animationDelay: `${i * 0.25}s`
                      }}
                    ></div>
                  ))}

                  {/* Inner drum holes */}
                  <div className="absolute inset-6 rounded-full border-3 border-dashed border-white/20" style={{
                    animation: 'counter-spin 4s linear infinite'
                  }}>
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-slate-400/50 rounded-full"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${i * 22.5}deg) translateY(-50px)`,
                          transformOrigin: '0 0'
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>

                  {/* Shine sweep */}
                  <div className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{
                    animation: 'shine-sweep 2s linear infinite',
                    transform: 'skewX(-20deg)'
                  }}></div>
                </div>
              </div>
            </div>

            {/* Bottom vents */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-1 h-4 bg-slate-300 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* 3D Shadow */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-96 h-10 bg-black/40 rounded-full blur-2xl"></div>
        </div>

        {/* Loading Text */}
        <div className="mt-16 text-center" style={{ animation: 'fade-in-intro 1s ease-out 0.5s backwards' }}>
          <h1 className="text-6xl font-black text-white mb-4" style={{
            fontFamily: "'Montserrat', sans-serif",
            textShadow: '0 4px 20px rgba(0,0,0,0.4)',
            letterSpacing: '2px'
          }}>
            THE SALAVAI
          </h1>
          <p className="text-2xl text-cyan-200 mb-6" style={{ fontFamily: "'Quicksand', sans-serif" }}>
            Premium Laundry Experience
          </p>
          <div className="flex justify-center gap-3">
            <div className="w-3 h-3 bg-cyan-300 rounded-full animate-bounce shadow-lg"></div>
            <div className="w-3 h-3 bg-cyan-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.15s' }}></div>
            <div className="w-3 h-3 bg-cyan-300 rounded-full animate-bounce shadow-lg" style={{ animationDelay: '0.3s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Water Ripple Effect (Click)
 */
const WaterRippleEffect = () => {
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };
      setRipples(prev => [...prev, newRipple]);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples(prev => prev.slice(1));
      }, 800); // Remove ripple after animation
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="click-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Scroll Progress Bar
 */
const ScrollProgress = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setWidth(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress-bar" style={{ width: `${width}%` }}></div>
    </div>
  );
};

/**
 * Floating Bubbles
 */
const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 30 + 10}px`,
      duration: `${Math.random() * 10 + 15}s`,
      delay: `${Math.random() * 10}s`
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {bubbles.map(b => (
        <div
          key={b.id}
          className="bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: b.duration,
            animationDelay: b.delay,
            background: 'radial-gradient(circle at 30% 30%, rgba(14, 165, 233, 0.1), rgba(14, 165, 233, 0.05))',
            boxShadow: '0 0 10px rgba(14, 165, 233, 0.1), inset 0 0 10px rgba(14, 165, 233, 0.05)'
          }}
        />
      ))}
    </div>
  );
};

/**
 * Floating Laundry Icons
 */
const FloatingLaundryIcons = () => {
  const [icons, setIcons] = useState([]);
  
  useEffect(() => {
    const iconTypes = [Droplets, Waves, Shirt, Sparkles];
    const newIcons = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      Icon: iconTypes[Math.floor(Math.random() * iconTypes.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 25,
      duration: `${Math.random() * 15 + 20}s`,
      delay: `${Math.random() * 10}s`,
      rotation: Math.random() * 360
    }));
    setIcons(newIcons);
  }, []);

  return (
    <>
      <style>{`
        @keyframes float-wave {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) translateX(10px) rotate(10deg);
          }
          50% {
            transform: translateY(-60px) translateX(-10px) rotate(-10deg);
          }
          75% {
            transform: translateY(-30px) translateX(10px) rotate(10deg);
          }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {icons.map(item => (
          <item.Icon
            key={item.id}
            size={item.size}
            className="absolute text-[#0077b6]"
            style={{
              left: item.left,
              top: item.top,
              animation: `float-wave ${item.duration} ease-in-out infinite`,
              animationDelay: item.delay,
              transform: `rotate(${item.rotation}deg)`,
              opacity: 0.3
            }}
            strokeWidth={1}
          />
        ))}
      </div>
    </>
  );
};

/**
 * Scroll Reveal Component
 */
const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 rotate-x-0' : 'opacity-0 translate-y-24 rotate-x-12'
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* --- Main Components --- */

const Navbar = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['home', 'about', 'vision', 'why-salavai', 'equipment', 'training', 'who-can-join', 'franchise', 'csr-support', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveLink(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.whoCanJoin, href: '#who-can-join' },
    { name: t.nav.whySalavai, href: '#why-salavai' },
    { name: t.nav.training, href: '#training' },
    { name: t.nav.csrSupport, href: '#csr-support' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.vision, href: '#vision' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <>
      <style>{`
        @keyframes spin-drum {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bubble-rise {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-20px) scale(0); opacity: 0; }
        }
        @keyframes water-wave {
          0%, 100% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-5px) scaleY(1.1); }
        }
        @keyframes soap-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(5deg); }
          75% { transform: translateY(2px) rotate(-5deg); }
        }
        @keyframes drum-shine {
          0% { transform: rotate(0deg); opacity: 0.3; }
          50% { opacity: 0.6; }
          100% { transform: rotate(360deg); opacity: 0.3; }
        }
        
        /* Water Flow Animation for Nav Buttons */
        @keyframes water-flow {
          0% { transform: translateX(-100%) rotate(0deg); }
          100% { transform: translateX(100%) rotate(10deg); }
        }
        @keyframes water-fill-wave {
          0% { transform: translateY(100%) rotate(0deg); }
          50% { transform: translateY(40%) rotate(5deg); }
          100% { transform: translateY(100%) rotate(0deg); }
        }
        @keyframes wave-motion {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-5%) translateY(-2px); }
          50% { transform: translateX(0) translateY(0); }
          75% { transform: translateX(5%) translateY(-2px); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes bubble-float-btn {
          0% { transform: translateY(10px) scale(0); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-15px) scale(1); opacity: 0; }
        }
        
        .washing-drum {
          animation: spin-drum 8s linear infinite;
        }
        .washing-drum:hover {
          animation: spin-drum 1s linear infinite;
        }
        .bubble {
          animation: bubble-rise 2s ease-out infinite;
        }
        .soap-bubble {
          animation: soap-float 3s ease-in-out infinite;
        }
        .water-effect {
          animation: water-wave 2s ease-in-out infinite;
        }
        
        /* Nav button with water inside */
        .nav-water-btn {
          position: relative;
          overflow: hidden;
        }
        .nav-water-btn::before {
          content: '';
          position: absolute;
          bottom: -100%;
          left: -10%;
          width: 120%;
          height: 100%;
          background: linear-gradient(180deg, 
            rgba(0, 119, 182, 0.1) 0%, 
            rgba(0, 180, 216, 0.3) 40%, 
            rgba(0, 119, 182, 0.5) 100%);
          border-radius: 40% 40% 50% 50%;
          transition: bottom 0.5s ease-out;
        }
        .nav-water-btn::after {
          content: '';
          position: absolute;
          bottom: -100%;
          left: -5%;
          width: 110%;
          height: 80%;
          background: linear-gradient(180deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            rgba(0, 180, 216, 0.4) 100%);
          border-radius: 45% 45% 50% 50%;
          transition: bottom 0.6s ease-out 0.1s;
          animation: wave-motion 2s ease-in-out infinite;
        }
        .nav-water-btn:hover::before {
          bottom: -10%;
        }
        .nav-water-btn:hover::after {
          bottom: 0%;
        }
        
        /* Active state - always filled with water */
        .nav-water-btn-active::before {
          bottom: -10% !important;
          background: linear-gradient(180deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.2) 40%, 
            rgba(255, 255, 255, 0.3) 100%);
        }
        .nav-water-btn-active::after {
          bottom: 0% !important;
          background: linear-gradient(180deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.15) 50%, 
            rgba(255, 255, 255, 0.25) 100%);
        }
        
        /* Water bubbles inside button */
        .nav-water-btn .water-bubble {
          position: absolute;
          bottom: 0;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
        }
        .nav-water-btn:hover .water-bubble {
          animation: bubble-float-btn 1.5s ease-out infinite;
        }
        .nav-water-btn .water-bubble:nth-child(1) { left: 20%; animation-delay: 0s; }
        .nav-water-btn .water-bubble:nth-child(2) { left: 40%; animation-delay: 0.3s; width: 4px; height: 4px; }
        .nav-water-btn .water-bubble:nth-child(3) { left: 60%; animation-delay: 0.6s; }
        .nav-water-btn .water-bubble:nth-child(4) { left: 80%; animation-delay: 0.9s; width: 5px; height: 5px; }
      `}</style>

      {/* Horizontal Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <style>{`
          /* Uiverse.io button styles - Letter spacing animation */
          .primary-button {
            padding: 14px 32px;
            border-radius: 50px;
            cursor: pointer;
            border: 0;
            background-color: white;
            box-shadow: rgb(0 0 0 / 5%) 0 0 8px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            font-size: 12px;
            font-weight: bold;
            transition: all 0.5s ease;
            position: relative;
            z-index: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            color: #003366;
            overflow: hidden;
          }
          
          .primary-button.active {
            letter-spacing: 3px;
            background-color: #003366;
            color: white;
            box-shadow: rgb(0 51 102) 0px 7px 29px 0px;
          }

          .primary-button:hover {
            letter-spacing: 3px;
            background-color: #0077b6;
            color: white;
            box-shadow: rgb(0 119 182) 0px 7px 29px 0px;
          }

          .primary-button:active {
            letter-spacing: 3px;
            background-color: #003366;
            color: white;
            box-shadow: rgb(0 51 102) 0px 0px 0px 0px;
            transform: translateY(5px);
            transition: 100ms;
          }
        `}</style>

        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Logo Section */}
            <a href="#home" className="flex items-center gap-2 group flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="The Salavai Laundry" 
                className="h-24 w-auto object-contain"
              />
            </a>

            {/* Navigation Links - Single Line */}
            <div className="flex items-center gap-3 overflow-x-auto flex-1 justify-center px-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`primary-button nav-water-btn ${activeLink === link.href ? 'active nav-water-btn-active' : ''}`}
                >
                  {link.name}
                  <span className="water-bubble" style={{ left: '15%' }}></span>
                  <span className="water-bubble" style={{ left: '35%' }}></span>
                  <span className="water-bubble" style={{ left: '55%' }}></span>
                  <span className="water-bubble" style={{ left: '75%' }}></span>
                  <span className="water-bubble" style={{ left: '90%' }}></span>
                </a>
              ))}
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="primary-button active flex items-center gap-2 flex-shrink-0"
            >
              <RefreshCw size={14} className="washing-drum" style={{ animationDuration: '3s' }} />
              {t.nav.language}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.75;
      const playVideo = () => {
        video.play().catch(e => console.log('Autoplay prevented:', e));
      };
      playVideo();
      document.addEventListener('click', playVideo, { once: true });
    }
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Social Media Icons - Fixed Left Side */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 pointer-events-auto">
        <a href="https://www.facebook.com/profile.php?id=61587104255575" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg">
          <Facebook size={20} />
        </a>
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors shadow-lg">
          <MessageCircle size={20} />
        </a>
        <a href="https://www.instagram.com/the_salavai_laundry/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg">
          <Instagram size={20} />
        </a>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-none" style={{ marginTop: '0rem' }}>
        <RevealOnScroll delay={100}>
          <div className="mb-8 flex justify-center" style={{ marginTop: '3rem' }}>
            <img 
              src="/The salavai logo transparent.png" 
              alt="The Salavai Logo" 
              className="h-32 md:h-40 lg:h-48 w-auto object-contain"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-10 leading-tight drop-shadow-2xl" style={{ fontFamily: "'Arima Madurai', sans-serif", fontWeight: '900' }}>
            <span className="text-[#c62222]">Self-Income Generating Program</span>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <p className="text-lg text-slate-700 leading-relaxed mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Powered-By
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <div className="flex justify-center mb-10">
            <img 
              src="/lg logo.png" 
              alt="LG Logo" 
              className="h-16 md:h-20 lg:h-24 w-auto object-contain"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={600}>
          <style>{`
            @keyframes wash-button-spin {
              0%, 100% { transform: rotate(0deg); }
              50% { transform: rotate(180deg); }
            }
            @keyframes wash-bubble-pop {
              0% { transform: translateY(0) scale(0); opacity: 0; }
              50% { opacity: 1; }
              100% { transform: translateY(-30px) scale(1.5); opacity: 0; }
            }
            @keyframes wash-wave-flow {
              0% { transform: translateX(-100%) translateY(0); }
              50% { transform: translateX(0%) translateY(-5px); }
              100% { transform: translateX(100%) translateY(0); }
            }
            .wash-journey-btn {
              position: relative;
              overflow: hidden;
            }
            .wash-journey-btn::before {
              content: '';
              position: absolute;
              bottom: 0;
              left: -100%;
              width: 200%;
              height: 100%;
              background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,255,255,0.2) 25%, 
                rgba(255,255,255,0.4) 50%, 
                rgba(255,255,255,0.2) 75%, 
                transparent 100%);
              animation: wash-wave-flow 2s ease-in-out infinite;
            }
            .wash-journey-btn:hover::before {
              animation-duration: 0.8s;
            }
            .wash-journey-btn .bubble-deco {
              position: absolute;
              width: 8px;
              height: 8px;
              background: rgba(255,255,255,0.6);
              border-radius: 50%;
              pointer-events: none;
              opacity: 0;
            }
            .wash-journey-btn:hover .bubble-deco {
              animation: wash-bubble-pop 1.5s ease-out infinite;
            }
            .wash-journey-btn:hover .spin-icon {
              animation: wash-button-spin 1s ease-in-out;
            }
          `}</style>
        </RevealOnScroll>
      </div>
    </section>
  );
};

const About = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid md:grid-cols-2 gap-16 items-center min-h-[800px]">
          <RevealOnScroll className="relative order-2 md:order-1">
            <style>{`
              @keyframes float-gentle {
                0%, 100% {
                  transform: translateY(0px);
                }
                50% {
                  transform: translateY(-20px);
                }
              }
              @keyframes spin-slow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes glow-pulse {
                0%, 100% {
                  opacity: 0.6;
                }
                50% {
                  opacity: 1;
                }
              }
              .lg-washer-float {
                animation: float-gentle 4s ease-in-out infinite;
              }
            `}</style>

            <div className="relative flex justify-center py-20">
              {/* Animated background gradients */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-br from-cyan-400/20 via-blue-400/10 to-transparent blur-3xl" style={{ animation: 'spin-slow 20s linear infinite' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-tl from-sky-300/20 via-cyan-300/10 to-transparent blur-3xl" style={{ animation: 'spin-slow 15s linear infinite reverse' }}></div>

              {/* Floating washing machine container */}
              <div className="lg-washer-float relative">
                <img
                  src="/LG 10 kg dryer.png"
                  alt="LG Commercial Washing Machine - Professional Direct Drive Washer"
                  className="w-[500px] h-auto relative z-10"
                  style={{
                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15)) drop-shadow(0 5px 10px rgba(0, 119, 182, 0.1))'
                  }}
                />

                {/* Bottom glow - minimized */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[200px] h-8 bg-cyan-400/8 blur-2xl" style={{ animation: 'glow-pulse 3s ease-in-out infinite' }}></div>
              </div>

              {/* Ground shadow - more visible */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[380px] h-16 bg-black/30 rounded-full blur-2xl"></div>
            </div>
          </RevealOnScroll>

          <div className="order-1 md:order-2 space-y-8">
            <RevealOnScroll delay={200}>
              <h2 className="text-sm font-bold text-[#A50034] uppercase tracking-widest mb-2 font-heading">{t.about.subtitle}</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-[#003366] leading-tight mb-6 font-heading">
                {t.about.title} <span className="text-[#003366]">{t.about.tradition}</span> {t.about.meets} <span className="text-[#003366]">{t.about.innovation}</span>.
              </h3>

              <div className="space-y-6 text-lg text-[#003366] leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <p>
                  {t.about.p1}
                </p>
                <p>
                  {t.about.p2}
                </p>
                <p>
                  {t.about.p3}
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

const Vision = () => {
  const { t } = useLanguage();
  return (
    <section id="vision" className="py-20 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading text-[#003366]">{t.vision.title}</h2>
            <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed mb-4">{t.vision.p1}</p>
            <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">{t.vision.p2}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t.vision.transform,
                desc: t.vision.transformDesc,
                icon: RefreshCw
              },
              {
                title: t.vision.create,
                desc: t.vision.createDesc,
                icon: Sparkles
              },
              {
                title: t.vision.deliver,
                desc: t.vision.deliverDesc,
                icon: CheckCircle
              }
            ].map((item, idx) => (
              <Card
                key={idx}
                title={item.title}
                subtitle={item.desc}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

const WhySalavai = () => {
  const { t } = useLanguage();
  const reasons = [
    { text: t.whySalavai.reason1, icon: Sparkles },
    { text: t.whySalavai.reason2, icon: DollarSign },
    { text: t.whySalavai.reason3, icon: CheckCircle },
    { text: t.whySalavai.reason4, icon: Wrench },
    { text: t.whySalavai.reason5, icon: Waves },
    { text: t.whySalavai.reason6, icon: Shirt }
  ];

  return (
    <section id="why-salavai" className="py-20 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Heading and Points */}
          <RevealOnScroll>
            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-20">
              {/* Left Side - Content */}
              <div className="flex-1 w-full lg:w-auto">
                <h1 className="text-4xl md:text-6xl font-bold font-heading text-[#a50034] leading-tight mb-8 text-center lg:text-left" style={{ position: 'relative', zIndex: 20 }}>
                  {t.whySalavai.title}
                </h1>
                
                {/* Icon-based List */}
                <div className="space-y-2 flex-1">
                  {reasons.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-6 py-5 border-b border-gray-200 hover:bg-red-50/50 transition-all duration-300 px-4 rounded-lg group"
                    >
                      <div className="w-12 h-12 bg-white flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0 overflow-hidden rounded">
                        {i === 0 && <img src="/Social welfare-focused initiative.png" alt="Social welfare" className="w-full h-full object-cover" />}
                        {i === 1 && <img src="/low inveztment.png" alt="Low investment" className="w-full h-full object-cover" />}
                        {i === 2 && <img src="/complete support.png" alt="Complete support" className="w-full h-full object-cover" />}
                        {i === 3 && <img src="/modern machinery.png" alt="Modern machinery" className="w-full h-full object-cover" />}
                        {i === 4 && <img src="/good income opportunity.png" alt="Good income opportunity" className="w-full h-full object-cover" />}
                        {i === 5 && <img src="/family developement.png" alt="Family life improvement" className="w-full h-full object-cover" />}
                      </div>
                      <p className="text-gray-800 font-semibold text-lg flex-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Connected Round Frame Images */}
              <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-end">
                <div className="relative w-[400px] h-[500px] md:w-[450px] md:h-[550px]">
                  {/* First Image - Top */}
                  <div className="absolute top-0 right-0 group">
                    <img 
                      src="/tamil peoples.jpeg" 
                      alt="Tamil Peoples" 
                      className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover rounded-full shadow-2xl border-8 border-white group-hover:scale-105 transition-transform duration-300 relative z-10"
                    />
                    {/* Decorative ring */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-[#a50034]/20 to-[#003366]/20 rounded-full -z-10"></div>
                  </div>

                  {/* Second Image - Bottom (Overlapping) */}
                  <div className="absolute bottom-0 left-0 group">
                    <img 
                      src="/kovil page.jpeg" 
                      alt="Kovil Page" 
                      className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover rounded-full shadow-2xl border-8 border-white group-hover:scale-105 transition-transform duration-300 relative z-10"
                    />
                    {/* Decorative ring */}
                    <div className="absolute -inset-2 bg-gradient-to-br from-[#003366]/20 to-[#a50034]/20 rounded-full -z-10"></div>
                  </div>

                  {/* Connecting Chain/Link Effect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-40 bg-gradient-to-b from-[#a50034]/30 via-[#003366]/30 to-[#a50034]/30 rounded-full blur-sm"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 border-4 border-[#a50034] rounded-full bg-white shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

const Training = () => {
  const { t } = useLanguage();
  const trainingModules = [
    {
      text: t.training.module1,
      icon: Wrench,
      iconProps: { strokeWidth: 2, fill: '#003366' }
    },
    {
      text: t.training.module2,
      icon: Droplets,
      iconProps: { strokeWidth: 2, fill: '#003366' }
    },
    {
      text: t.training.module3,
      icon: Monitor,
      iconProps: { strokeWidth: 2, fill: '#003366' }
    },
    {
      text: t.training.module4,
      icon: CheckCircle,
      iconProps: { strokeWidth: 3, className: 'text-white', fill: '#003366', size: 40 }
    },
    {
      text: t.training.module5,
      icon: Star,
      iconProps: { strokeWidth: 2, fill: '#003366' }
    },
    {
      text: t.training.module6,
      icon: Sparkles,
      iconProps: { strokeWidth: 2, fill: '#003366' }
    },
    {
      text: t.training.module7,
      icon: DollarSign,
      iconProps: { strokeWidth: 3 }
    }
  ];

  return (
    <section id="training" className="py-20 bg-white relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-slate-900 pt-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading text-[#003366]">{t.training.title}</h2>
            <p className="text-[#A50034] text-lg max-w-3xl mx-auto leading-relaxed">
              {t.training.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="flex flex-wrap justify-center gap-6">
            {trainingModules.map((item, i) => (
              <TrainingCard
                key={i}
                title={`Module ${i + 1}`}
                description={item.text}
                icon={item.icon}
                iconProps={item.iconProps}
                moduleNumber={i + 1}
              />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

const WhoCanJoin = () => {
  const { t } = useLanguage();
  const categories = [
    { text: t.whoCanJoin.category1, desc: t.whoCanJoin.desc1, icon: Home },
    { text: t.whoCanJoin.category2, desc: t.whoCanJoin.desc2, icon: Star },
    { text: t.whoCanJoin.category3, desc: t.whoCanJoin.desc3, icon: Eye },
    { text: t.whoCanJoin.category4, desc: t.whoCanJoin.desc4, icon: Zap },
    { text: t.whoCanJoin.category5, desc: t.whoCanJoin.desc5, icon: DollarSign }
  ];

  return (
    <section id="who-can-join" className="py-20 relative overflow-hidden z-10">
      <style>{`
        .who-cards-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          max-width: 75rem;
          margin: 0 auto;
        }

        @media (min-width: 1024px) {
          .who-cards-container {
            gap: 2rem 3rem;
          }
        }

        @media (max-width: 767px) {
          .who-cards-container {
            gap: 1.5rem;
          }
        }

        .who-card {
          max-width: 300px;
          width: 100%;
          border-radius: 0.5rem;
          background-color: #fff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .who-card:hover {
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);
          transform: translateY(-4px);
        }

        .who-content {
          padding: 1.1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .who-image {
          width: 100%;
          height: 150px;
          object-fit: cover;
          flex-shrink: 0;
          background: linear-gradient(135deg, #d1d5db 0%, #e5e7eb 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
        }

        .who-title {
          color: #111827;
          font-size: 1.125rem;
          line-height: 1.75rem;
          font-weight: 600;
        }

        .who-desc {
          margin-top: 0.5rem;
          color: #6B7280;
          font-size: 0.875rem;
          line-height: 1.25rem;
        }

        .who-action {
          display: inline-flex;
          margin-top: 1rem;
          color: #ffffff;
          font-size: 0.875rem;
          line-height: 1.25rem;
          font-weight: 500;
          align-items: center;
          gap: 0.25rem;
          background-color: #2563eb;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .who-action span {
          transition: .3s ease;
        }

        .who-action:hover span {
          transform: translateX(4px);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading text-[#a50034]">{t.whoCanJoin.title}</h2>
            <p className="text-[#a50034] text-2xl md:text-3xl font-semibold max-w-3xl mx-auto leading-relaxed flex items-center justify-center gap-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <ArrowRight size={32} />
              {t.whoCanJoin.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="who-cards-container">
            {categories.map((item, i) => (
              <div key={i} className="who-card">
                {i === 0 ? (
                  <img 
                    src="/family.jpg" 
                    alt="Traditional dhobi families" 
                    className="who-image"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                ) : i === 1 ? (
                  <img 
                    src="/Cooking up some love in my favorite corner of the house!.jpg" 
                    alt="Women / Homemakers" 
                    className="who-image"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                ) : i === 2 ? (
                  <img 
                    src="/Serva Dharma Ashram Trust India help sick, physical challenged people_.jpg" 
                    alt="Differently-abled individuals" 
                    className="who-image"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                ) : i === 3 ? (
                  <img 
                    src="/Sahaj ties up with Techno India to skill 1 lakh rural youth.jpg" 
                    alt="Unemployed youth" 
                    className="who-image"
                    style={{ objectFit: 'cover', objectPosition: 'center center' }}
                  />
                ) : i === 4 ? (
                  <img 
                    src="/A Guide to Starting a Small Business in Mexico as an American Entrepreneur.jpg" 
                    alt="Aspiring small business owners" 
                    className="who-image"
                    style={{ objectFit: 'cover', objectPosition: 'center center' }}
                  />
                ) : (
                  <div className="who-image">
                    <item.icon size={48} />
                  </div>
                )}
                <div className="who-content">
                  <div className="who-title" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {item.text}
                  </div>
                  <div className="who-desc">
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

const Franchise = () => {
  const { t } = useLanguage();
  const franchiseItems = [
    { text: t.franchise.item1, icon: CircleDot },
    { text: t.franchise.item2, icon: Home },
    { text: t.franchise.item3, icon: Star },
    { text: t.franchise.item4, icon: Wrench },
    { text: t.franchise.item5, icon: GraduationCap },
    { text: t.franchise.item6, icon: Sparkles },
    { text: t.franchise.item7, icon: RefreshCw }
  ];

  return (
    <section id="franchise" className="py-20 relative overflow-hidden z-10" style={{
      background: '#ffffff',
      backgroundImage: 'url("/Tamil Nadu state map, administrative division of India_ Vector illustration_.jpg")',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        zIndex: 0
      }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 2 }}>
        <RevealOnScroll>
          <div className="text-center mb-16">
            <p className="text-[#c62222] text-3xl md:text-4xl font-bold max-w-3xl mx-auto leading-relaxed">
              {t.franchise.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="max-w-3xl mx-auto">
            {franchiseItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-6 py-6 border-b border-gray-200 hover:bg-blue-50/50 transition-all duration-300 px-6 rounded-lg group"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] text-white flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0 shadow-lg">
                  <item.icon size={28} strokeWidth={2.5} />
                </div>
                <p className="text-gray-800 font-semibold text-xl flex-1">{item.text}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

const CSRSupport = () => {
  const { t } = useLanguage();
  const partners = [
    { text: t.csrSupport.partner1, icon: Star, color: '#114487' },
    { text: t.csrSupport.partner2, icon: DollarSign, color: '#114487' },
    { text: t.csrSupport.partner3, icon: Home, color: '#114487' },
    { text: t.csrSupport.partner4, icon: GraduationCap, color: '#114487' }
  ];

  return (
    <section id="csr-support" className="py-20 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading text-[#047857]">{t.csrSupport.title}</h2>
            <p className="text-[#c62222] text-3xl md:text-4xl font-semibold max-w-3xl mx-auto leading-relaxed mb-8">
              {t.csrSupport.subtitle}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="flex flex-col gap-4 max-w-md mx-auto mb-12 cards">
            {partners.map((item, i) => (
              <div
                key={i}
                style={{ backgroundColor: item.color }}
                className="card flex items-center justify-center flex-col text-center h-[100px] w-full rounded-[10px] text-white cursor-pointer transition-all duration-[400ms] hover:scale-110"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={24} />
                  <p className="tip text-base font-bold">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <div className="backdrop-blur-sm p-8 rounded-2xl border-2 max-w-4xl mx-auto" style={{ backgroundColor: '#c62222', borderColor: '#c62222' }}>
            <p className="text-white text-lg text-center leading-relaxed font-medium">
              {t.csrSupport.description}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-20 relative z-10 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden grid lg:grid-cols-5 border border-slate-100">

            <div className="lg:col-span-2 bg-slate-50 p-12 text-slate-900 flex flex-col justify-between relative overflow-hidden border-r border-slate-100">
              {/* Background Image Layer */}
              <div className="absolute inset-0 opacity-20">
                <img
                  src="/LG 10 kg dryer.png"
                  alt="Background image showing professional laundry equipment setup"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-slate-100/80 to-slate-50/90"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6 font-heading text-[#003366]">{t.contact.title}</h3>
                <p className="text-slate-600 mb-10">{t.contact.subtitle}</p>

                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm"><Phone size={20} className="text-[#A50034]" /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold font-heading">{t.contact.phone}</p>
                      <span className="font-medium">+91 98765 43210</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm"><Mail size={20} className="text-[#A50034]" /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold font-heading">{t.contact.email}</p>
                      <span className="font-medium">contact@salavailaundry.com</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm"><MapPin size={20} className="text-[#A50034]" /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold font-heading">{t.contact.location}</p>
                      <span className="font-medium">{t.contact.locationValue}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="lg:col-span-3 p-12 bg-white">
              <form className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 font-heading text-[#003366]">{t.contact.formTitle}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1 font-heading">{t.contact.fullName}</label>
                    <input type="text" className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#A50034] focus:ring-4 focus:ring-[#A50034]/10 outline-none transition-all" placeholder={t.contact.fullNamePlaceholder} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1 font-heading">{t.contact.phoneNumber}</label>
                    <input type="tel" className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#A50034] focus:ring-4 focus:ring-[#A50034]/10 outline-none transition-all" placeholder={t.contact.phonePlaceholder} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 font-heading">{t.contact.locationLabel}</label>
                  <input type="text" className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#A50034] focus:ring-4 focus:ring-[#A50034]/10 outline-none transition-all" placeholder={t.contact.locationPlaceholder} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1 font-heading">{t.contact.message}</label>
                  <textarea rows="4" className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#A50034] focus:ring-4 focus:ring-[#A50034]/10 outline-none transition-all" placeholder={t.contact.messagePlaceholder}></textarea>
                </div>
                <button className="water-float-btn w-full py-5 text-white font-bold rounded-xl shadow-xl hover:shadow-[#A50034]/30 transition-all duration-300 font-heading relative overflow-hidden">
                  <style>{`
                   @keyframes water-wave-flow {
                     0% {
                       transform: translateX(-100%) translateY(0px);
                     }
                     50% {
                       transform: translateX(0%) translateY(-3px);
                     }
                     100% {
                       transform: translateX(100%) translateY(0px);
                     }
                   }
                   @keyframes gentle-bob {
                     0%, 100% {
                       transform: translateY(0px);
                     }
                     50% {
                       transform: translateY(-3px);
                     }
                   }
                   .water-float-btn {
                     background: linear-gradient(135deg, #0077b6 0%, #114487 100%);
      
                   }
                   .water-float-btn::before {
                     content: '';
                     position: absolute;
                     top: 0;
                     left: 0;
                     width: 200%;
                     height: 100%;
                     background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                     animation: water-wave-flow 3s ease-in-out infinite;
                   }
                   .water-float-btn:hover {
                     animation: gentle-bob 2s ease-in-out infinite;
                   }
                   .water-float-btn span {
                     position: relative;
                     z-index: 1;
                     color: white;
                   }
                 `}</style>
                  <span>Send Message</span>
                </button>
              </form>
            </div>

          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-white text-slate-600 py-12 border-t border-slate-200 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <Waves className="text-sky-500" />
          <span className="font-bold text-slate-900 tracking-wider font-heading">{t.hero.brand}</span>
        </div>
        <div className="text-sm">
          © {new Date().getFullYear()} {t.hero.brand}. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="antialiased text-slate-900 bg-white selection:bg-[#A50034] selection:text-white relative">
          <GlobalStyles />
          <Navbar />
          <div className="pt-20">
            <ScrollProgress />
            <Hero />
            <WhoCanJoin />
            <Franchise />
            <WhySalavai />
            <Training />
            <CSRSupport />
            <About />
            <Vision />
            <Contact />
            <Footer />
          </div>
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
