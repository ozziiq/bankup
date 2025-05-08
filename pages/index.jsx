import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import styles from '../styles/home.module.css';

// Komponen-komponen terpisah
const HeroSection = () => {
  return (
    <section className={`${styles.hero} bg-indigo-50`}>
      <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Kelola Keuangan UMKM Lebih Mudah
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl"
        >
          BankUp - Solusi pencatatan keuangan otomatis sesuai kemampuan literasi Anda
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a 
            href="/assessment" 
            className={`${styles.primaryButton} bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors`}
          >
            Coba Sekarang
          </a>
          
          <button 
            onClick={() => setShowDemo(true)}
            className="bg-white hover:bg-gray-100 text-indigo-600 font-medium py-3 px-8 rounded-lg border border-indigo-600 transition-colors"
          >
            Lihat Demo
          </button>
        </motion.div>
        
        {/* Placeholder untuk ilustrasi hero */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 w-full max-w-4xl h-64 md:h-96 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl"
        >
          {/* Ilustrasi akan ditempatkan di sini */}
        </motion.div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: "📊",
      title: "Diagnosis Kemampuan Finansial",
      description: "Assesmen singkat untuk memahami level literasi keuangan Anda dan menyesuaikan pengalaman pengguna."
    },
    {
      icon: "🎚️",
      title: "Antarmuka Sesuai Level Anda",
      description: "Tampilan yang disesuaikan dengan pemahaman finansial Anda, dari dasar hingga lanjutan."
    },
    {
      icon: "🏦",
      title: "Laporan Siap Bank",
      description: "Generate laporan keuangan standar perbankan dengan satu klik untuk pengajuan pinjaman."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Mengapa Memilih BankUp?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Solusi komprehensif untuk mengelola keuangan UMKM tanpa perlu latar belakang akuntansi.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      quote: "BankUp menyederhanakan proses akuntansi saya yang sebelumnya sangat membingungkan. Sekarang saya bisa fokus pada bisnis!",
      name: "Budi Santoso",
      business: "Pemilik Kedai Kopi Budi"
    },
    {
      quote: "Antarmuka yang disesuaikan membuat saya tidak takut lagi melihat laporan keuangan. Sangat membantu untuk pemula seperti saya.",
      name: "Ani Wijaya",
      business: "Pemilik Butik Ani Collection"
    },
    {
      quote: "Laporan siap banknya mempermudah pengajuan pinjaman modal kerja. Proses di bank jauh lebih cepat sekarang.",
      name: "Rudi Hermawan",
      business: "Pemilik Warung Makan Rudi"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Apa Kata Mereka?</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm mb-8">
            <p className="text-lg text-gray-700 mb-4">"{testimonials[currentTestimonial].quote}"</p>
            <p className="font-medium text-gray-800">{testimonials[currentTestimonial].name}</p>
            <p className="text-gray-600 text-sm">{testimonials[currentTestimonial].business}</p>
          </div>
          
          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full ${currentTestimonial === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
                aria-label={`Lihat testimoni ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Pilih Paket Anda</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">One Time Purchase</h3>
            <p className="text-3xl font-bold text-gray-800 mb-4">Rp69.000</p>
            <p className="text-gray-600 mb-6">Bayar sekali, akses selamanya. Cocok untuk Anda yang ingin mencoba tanpa komitmen jangka panjang.</p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Beli Sekarang
            </button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white border-2 border-indigo-600 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow relative"
          >
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              POPULER
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Subscription</h3>
            <p className="text-3xl font-bold text-gray-800 mb-4">Rp55.000<span className="text-lg font-normal">/bulan</span></p>
            <p className="text-gray-600 mb-6">Akses semua fitur premium dengan pembayaran bulanan. Hemat 20% untuk komitmen tahunan.</p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              Langganan Sekarang
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Bagaimana BankUp menyesuaikan antarmuka dengan level literasi saya?",
      answer: "Setelah mengikuti assessment singkat, sistem kami akan menganalisis tingkat pemahaman finansial Anda dan menyesuaikan kompleksitas tampilan, istilah yang digunakan, serta panduan yang diberikan."
    },
    {
      question: "Apakah data keuangan saya aman dengan BankUp?",
      answer: "Keamanan data adalah prioritas kami. Semua data dienkripsi dan disimpan dengan standar keamanan tinggi. Kami tidak akan pernah membagikan data Anda ke pihak ketiga tanpa izin."
    },
    {
      question: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan assessment awal?",
      answer: "Assessment awal hanya membutuhkan waktu sekitar 5-7 menit. Ini akan memberi kami cukup informasi untuk memberikan pengalaman yang dipersonalisasi untuk Anda."
    },
    {
      question: "Apakah BankUp cocok untuk usaha yang sudah besar?",
      answer: "Ya! BankUp dirancang untuk skalabilitas. Mulai dari usaha mikro hingga kecil-menengah, fitur kami dapat disesuaikan dengan kompleksitas bisnis Anda."
    },
    {
      question: "Bagaimana jika saya ingin mengubah level literasi setelah assessment awal?",
      answer: "Anda dapat mengubah level literasi kapan saja melalui pengaturan akun atau mengulang assessment jika merasa pemahaman finansial Anda telah berkembang."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Pertanyaan yang Sering Diajukan</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-${index}`}
              >
                <h3 className="text-lg font-medium text-left text-gray-800">{faq.question}</h3>
                <svg 
                  className={`w-5 h-5 text-indigo-600 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div
                id={`faq-${index}`}
                className={`px-6 pb-6 bg-white ${activeIndex === index ? 'block' : 'hidden'}`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DemoModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-xl font-semibold text-gray-800">Demo BankUp</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Tutup modal demo"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {/* Embed YouTube Video - Ganti dengan ID video yang sesuai */}
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              className="w-full h-96"
              src="https://www.youtube.com/embed/VIDEO_ID_DEMO" 
              title="Demo BankUp" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="mt-6 text-center">
            <a 
              href="/assessment" 
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
            >
              Coba Sekarang
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <Head>
        <title>BankUp - Solusi Keuangan UMKM Sesuai Kemampuan Anda</title>
        <meta name="description" content="BankUp membantu UMKM mengelola keuangan dengan antarmuka yang disesuaikan dengan level literasi finansial Anda. Mulai dengan assessment singkat kami." />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Optimasi LCP */}
        <link rel="preload" href="/hero-placeholder.jpg" as="image" />
      </Head>
      
      <main className="min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <TestimonialCarousel />
        <PricingSection />
        <FAQSection />
        
        <DemoModal show={showDemo} onClose={() => setShowDemo(false)} />
      </main>
      
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">BankUp</h2>
              <p className="text-gray-400">Solusi Keuangan untuk UMKM Indonesia</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Kebijakan Privasi</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Syarat & Ketentuan</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Kontak Kami</a>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} BankUp. Seluruh hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    </>
  );
}