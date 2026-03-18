import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, User,  Search,  ChevronRight, Bell, Shield, Trophy, AlertTriangle } from 'lucide-react';

const AntiDopingNewsPage = () => {
     useEffect(() => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
              navbar.style.display = 'none'; // Hide navbar on mount
            }
        
            return () => {
              if (navbar) {
                navbar.style.display = ''; // Restore navbar on unmount
              }
            };
          }, []);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);

  const newsData = useMemo(() => [
    {
     
  id: 1,
  title: "New WADA Guidelines for 2024 Anti-Doping Testing Procedures",
  excerpt: "The World Anti-Doping Agency has released updated guidelines for testing procedures, including new protocols for biological passport monitoring and enhanced detection methods.",
  content: "The comprehensive update includes stricter protocols for sample collection, improved chain of custody procedures, and advanced analytical techniques for detecting performance-enhancing substances.",
  category: "guidelines",
  author: "Dr. Sarah Mitchell",
  date: "2024-12-18",
  readTime: "5 min read",
  featured: true,
  urgent: false,
  image: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=600&h=300&fit=crop",
  url: "https://www.wada-ama.org/en/athletes-support-personnel/anti-doping-process"
},
    {
      id: 2,
      title: "Major Olympic Doping Scandal: Three Athletes Suspended",
      excerpt: "International Olympic Committee announces suspension of three prominent athletes following positive test results for prohibited substances during routine testing.",
      content: "The athletes, representing different countries and sports, tested positive for various banned substances. All medals and records achieved during the affected period are under review.",
      category: "cases",
      author: "Mark Johnson",
      date: "2024-12-15",
      readTime: "3 min read",
      featured: true,
      urgent: true,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=300&fit=crop",
      url: "https://www.history.com/articles/doping-scandals-through-history-list"
    },
    {
      id: 3,
      title: "Educational Program Launch: Clean Sport Initiative 2024",
      excerpt: "New comprehensive educational program launched to promote clean sport values among young athletes and coaching staff worldwide.",
      content: "The initiative includes online courses, workshop materials, and certification programs designed to educate athletes about the importance of clean competition and the risks of doping.",
      category: "education",
      author: "Lisa Chen",
      date: "2024-12-12",
      readTime: "4 min read",
      featured: false,
      urgent: false,
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=300&fit=crop",
      url: "https://www.wada-ama.org/en/what-we-do/education-and-training/education-initiatives"
    },
    {
      id: 4,
      title: "Technology Breakthrough: AI-Powered Doping Detection System",
      excerpt: "Revolutionary artificial intelligence system developed to enhance detection accuracy and reduce testing time for prohibited substances.",
      content: "The new AI system can analyze biological samples 300% faster than traditional methods while maintaining 99.7% accuracy in detecting banned substances.",
      category: "technology",
      author: "Dr. James Wilson",
      date: "2024-12-10",
      readTime: "6 min read",
      featured: false,
      urgent: false,
    //   image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=300&fit=crop",
    image: "https://media.licdn.com/dms/image/v2/D5612AQHi2wA7pJStMQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1736237873782?e=2147483647&v=beta&t=lyTMno0QB5V886iu1owCNK4RfYhTOFu1NxX6NECmWek",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11208455/"
    },
    {
      id: 5,
      title: "Annual Anti-Doping Statistics Report Released",
      excerpt: "Comprehensive analysis of global anti-doping efforts shows significant improvements in testing coverage and violation detection rates.",
      content: "The report reveals a 25% increase in testing worldwide and a 15% improvement in detection rates, highlighting the effectiveness of enhanced monitoring programs.",
      category: "reports",
      author: "Emma Rodriguez",
      date: "2024-12-08",
      readTime: "7 min read",
      featured: false,
      urgent: false,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=300&fit=crop",
      url: "https://www.wada-ama.org/en/data-research/anti-doping-statistics"
    },
    {
      id: 6,
      title: "International Cooperation Agreement Signed",
      excerpt: "Five major sporting organizations sign landmark agreement to strengthen international cooperation in anti-doping efforts.",
      content: "The agreement establishes shared databases, coordinated testing schedules, and unified sanctions for doping violations across multiple sports.",
      category: "cooperation",
      author: "Michael Brown",
      date: "2024-12-05",
      readTime: "4 min read",
      featured: false,
      urgent: false,
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=300&fit=crop",
      url: "https://www.ftc.gov/policy/international/international-cooperation-agreements"
    }
  ], []);

  const categories = useMemo(() => [
    { id: 'all', name: 'All News', icon: Bell, count: newsData.length },
    { id: 'guidelines', name: 'Guidelines', icon: Shield, count: newsData.filter(n => n.category === 'guidelines').length },
    { id: 'cases', name: 'Cases', icon: AlertTriangle, count: newsData.filter(n => n.category === 'cases').length },
    { id: 'education', name: 'Education', icon: Trophy, count: newsData.filter(n => n.category === 'education').length },
    { id: 'technology', name: 'Technology', icon: User, count: newsData.filter(n => n.category === 'technology').length },
    { id: 'reports', name: 'Reports', icon: Calendar, count: newsData.filter(n => n.category === 'reports').length },
    { id: 'cooperation', name: 'Cooperation', icon: Shield, count: newsData.filter(n => n.category === 'cooperation').length }
  ], [newsData]);

  useEffect(() => {
    let filtered = newsData;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(news => news.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(news => 
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredNews(filtered);
  }, [selectedCategory, searchTerm, newsData]);

  const handleNewsClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const pageStyles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      color: 'white',
      padding: '60px 20px',
      textAlign: 'center'
    },
    headerTitle: {
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '16px',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    headerSubtitle: {
      fontSize: '20px',
      opacity: '0.9',
      maxWidth: '600px',
      margin: '0 auto'
    },
    mainContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px'
    },
    searchSection: {
      marginBottom: '40px'
    },
    searchContainer: {
      position: 'relative',
      maxWidth: '500px',
      margin: '0 auto'
    },
    searchInput: {
      width: '100%',
      padding: '16px 50px 16px 20px',
      fontSize: '16px',
      border: '2px solid #e5e7eb',
      borderRadius: '50px',
      outline: 'none',
      transition: 'all 0.3s',
      boxSizing: 'border-box'
    },
    searchIcon: {
      position: 'absolute',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6b7280'
    },
    categoriesSection: {
      marginBottom: '40px'
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '16px',
      marginBottom: '32px'
    },
    categoryCard: {
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s',
      textAlign: 'center',
      border: '2px solid transparent',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    categoryCardActive: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      color: 'white',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
    },
    categoryName: {
      fontSize: '14px',
      fontWeight: '600',
      marginTop: '8px'
    },
    categoryCount: {
      fontSize: '12px',
      opacity: '0.8',
      marginTop: '4px'
    },
    newsGrid: {
      display: 'grid',
      gap: '32px'
    },
    featuredNews: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
      marginBottom: '40px'
    },
    newsCard: {
      background: 'white',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    newsCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
    },
    newsImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover'
    },
    newsContent: {
      padding: '24px'
    },
    newsHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    urgentBadge: {
      background: '#ef4444',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    featuredBadge: {
      background: '#f59e0b',
      color: 'white',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    categoryBadge: {
      background: '#e5e7eb',
      color: '#374151',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500'
    },
    newsTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '12px',
      lineHeight: '1.3'
    },
    newsExcerpt: {
      color: '#6b7280',
      lineHeight: '1.6',
      marginBottom: '20px'
    },
    newsFooter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: '#9ca3af'
    },
    newsInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    regularNews: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '24px'
    },
    regularNewsCard: {
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s',
      cursor: 'pointer'
    },
    regularNewsImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover'
    },
    regularNewsContent: {
      padding: '20px'
    },
    regularNewsTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: '8px',
      lineHeight: '1.4'
    },
    regularNewsExcerpt: {
      color: '#6b7280',
      fontSize: '14px',
      lineHeight: '1.5',
      marginBottom: '16px'
    }
  };

  const featuredNews = filteredNews.filter(news => news.featured);
  const regularNews = filteredNews.filter(news => !news.featured);

  return (
    <div style={pageStyles.container}>
      {/* Header */}
      <div style={pageStyles.header}>
        <h1 style={pageStyles.headerTitle}>News & Updates</h1>
        <p style={pageStyles.headerSubtitle}>
          Stay informed with the latest developments in anti-doping efforts, guidelines, and clean sport initiatives worldwide
        </p>
      </div>

      <div style={pageStyles.mainContent}>
        {/* Search Section */}
        <div style={pageStyles.searchSection}>
          <div style={pageStyles.searchContainer}>
            <input
              type="text"
              placeholder="Search news and updates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                ...pageStyles.searchInput,
                ...(searchTerm ? { borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' } : {})
              }}
            />
            <Search size={20} style={pageStyles.searchIcon} />
          </div>
        </div>

        {/* Categories */}
        <div style={pageStyles.categoriesSection}>
          <div style={pageStyles.categoriesGrid}>
            {categories.map(category => {
              const IconComponent = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <div
                  key={category.id}
                  style={{
                    ...pageStyles.categoryCard,
                    ...(isActive ? pageStyles.categoryCardActive : {})
                  }}
                  onClick={() => setSelectedCategory(category.id)}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                >
                  <IconComponent size={24} />
                  <div style={pageStyles.categoryName}>{category.name}</div>
                  <div style={pageStyles.categoryCount}>{category.count} articles</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured News */}
        {featuredNews.length > 0 && (
          <div style={pageStyles.featuredNews}>
            {featuredNews.map(news => (
              <div
                key={news.id}
                style={pageStyles.newsCard}
                onClick={() => handleNewsClick(news.url)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                }}
              >
                <img src={news.image} alt={news.title} style={pageStyles.newsImage} />
                <div style={pageStyles.newsContent}>
                  <div style={pageStyles.newsHeader}>
                    <div style={{display: 'flex', gap: '8px'}}>
                      {news.urgent && <span style={pageStyles.urgentBadge}>URGENT</span>}
                      {news.featured && <span style={pageStyles.featuredBadge}>FEATURED</span>}
                    </div>
                    <span style={pageStyles.categoryBadge}>{news.category}</span>
                  </div>
                  <h2 style={pageStyles.newsTitle}>{news.title}</h2>
                  <p style={pageStyles.newsExcerpt}>{news.excerpt}</p>
                  <div style={pageStyles.newsFooter}>
                    <div style={pageStyles.newsInfo}>
                      <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <User size={14} />
                        {news.author}
                      </span>
                      <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <Calendar size={14} />
                        {new Date(news.date).toLocaleDateString()}
                      </span>
                      <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <Clock size={14} />
                        {news.readTime}
                      </span>
                    </div>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Regular News */}
        {regularNews.length > 0 && (
          <div style={pageStyles.regularNews}>
            {regularNews.map(news => (
              <div
                key={news.id}
                style={pageStyles.regularNewsCard}
                onClick={() => handleNewsClick(news.url)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
              >
                <img src={news.image} alt={news.title} style={pageStyles.regularNewsImage} />
                <div style={pageStyles.regularNewsContent}>
                  <div style={{...pageStyles.newsHeader, marginBottom: '12px'}}>
                    <div style={{display: 'flex', gap: '8px'}}>
                      {news.urgent && <span style={pageStyles.urgentBadge}>URGENT</span>}
                    </div>
                    <span style={pageStyles.categoryBadge}>{news.category}</span>
                  </div>
                  <h3 style={pageStyles.regularNewsTitle}>{news.title}</h3>
                  <p style={pageStyles.regularNewsExcerpt}>{news.excerpt}</p>
                  <div style={pageStyles.newsFooter}>
                    <div style={pageStyles.newsInfo}>
                      <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <User size={12} />
                        {news.author}
                      </span>
                      <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <Calendar size={12} />
                        {new Date(news.date).toLocaleDateString()}
                      </span>
                    </div>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredNews.length === 0 && (
          <div style={{textAlign: 'center', padding: '60px 20px'}}>
            <Search size={48} style={{color: '#9ca3af', marginBottom: '16px'}} />
            <h3 style={{fontSize: '24px', color: '#374151', marginBottom: '8px'}}>No articles found</h3>
            <p style={{color: '#6b7280'}}>Try adjusting your search terms or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AntiDopingNewsPage;