import  { useState, useMemo,useEffect } from 'react';
import { 
  MessageSquare, 
  Users, 
  ThumbsUp, 
  Reply, 
  Search, 
   
  Plus, 
  Pin, 
  Clock, 
  Eye, 
  Award, 
  Shield, 
  BookOpen, 
  HelpCircle, 
  AlertTriangle,
  Star
 
} from 'lucide-react';

const CommunityForumPage = () => {
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
  const [sortBy, setSortBy] = useState('recent');

  const forumData = useMemo(() => [
    {
      id: 1,
      title: "Understanding the new WADA code changes for 2024",
      content: "Can someone explain the key changes in the updated WADA code? I'm particularly confused about the new thresholds for certain substances.",
      category: "guidelines",
      author: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        role: "Athlete",
        reputation: 245
      },
      stats: {
        replies: 23,
        likes: 45,
        views: 312
      },
      tags: ["WADA", "Guidelines", "2024"],
      isPinned: true,
      isAnswered: true,
      lastActivity: "2024-12-19T10:30:00Z",
      createdAt: "2024-12-15T14:20:00Z"
    },
    {
      id: 2,
      title: "My experience with random drug testing - AMA",
      content: "I've been through multiple random drug tests as a professional athlete. Happy to share my experience and answer questions about the process.",
      category: "experiences",
      author: {
        name: "Maria Rodriguez",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c2c2?w=100&h=100&fit=crop&crop=face",
        role: "Professional Athlete",
        reputation: 892
      },
      stats: {
        replies: 67,
        likes: 134,
        views: 1245
      },
      tags: ["Testing", "Experience", "AMA"],
      isPinned: false,
      isAnswered: false,
      lastActivity: "2024-12-19T09:15:00Z",
      createdAt: "2024-12-18T16:45:00Z"
    },
    {
      id: 3,
      title: "Legal supplements for endurance sports?",
      content: "Looking for recommendations on legal supplements that can help with endurance training. What are your go-to options that are guaranteed clean?",
      category: "supplements",
      author: {
        name: "James Wilson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        role: "Amateur Athlete",
        reputation: 156
      },
      stats: {
        replies: 34,
        likes: 28,
        views: 567
      },
      tags: ["Supplements", "Endurance", "Legal"],
      isPinned: false,
      isAnswered: true,
      lastActivity: "2024-12-19T08:45:00Z",
      createdAt: "2024-12-17T11:30:00Z"
    },
    {
      id: 4,
      title: "Accidentally took banned medication - what should I do?",
      content: "I took a prescription medication without realizing it contained a banned substance. I haven't competed yet but have a competition next week. Need urgent advice!",
      category: "urgent",
      author: {
        name: "Sarah Kim",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        role: "Student Athlete",
        reputation: 89
      },
      stats: {
        replies: 12,
        likes: 8,
        views: 234
      },
      tags: ["Urgent", "Medication", "TUE"],
      isPinned: false,
      isAnswered: true,
      lastActivity: "2024-12-19T07:20:00Z",
      createdAt: "2024-12-19T06:10:00Z"
    },
    {
      id: 5,
      title: "Clean sport education programs in schools",
      content: "Has anyone implemented clean sport education in their local schools? Looking for resources and best practices to start a program.",
      category: "education",
      author: {
        name: "Coach Thompson",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
        role: "Coach",
        reputation: 567
      },
      stats: {
        replies: 19,
        likes: 42,
        views: 387
      },
      tags: ["Education", "Schools", "Youth"],
      isPinned: false,
      isAnswered: false,
      lastActivity: "2024-12-18T20:30:00Z",
      createdAt: "2024-12-16T13:15:00Z"
    },
    {
      id: 6,
      title: "Recovery methods that don't violate anti-doping rules",
      content: "What are some effective recovery methods that are completely within anti-doping guidelines? Looking for both traditional and modern approaches.",
      category: "recovery",
      author: {
        name: "Mike Foster",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        role: "Athlete",
        reputation: 298
      },
      stats: {
        replies: 28,
        likes: 35,
        views: 445
      },
      tags: ["Recovery", "Training", "Legal Methods"],
      isPinned: false,
      isAnswered: true,
      lastActivity: "2024-12-18T15:45:00Z",
      createdAt: "2024-12-14T09:20:00Z"
    }
  ], []);

  const categories = useMemo(() => [
    { id: 'all', name: 'All Topics', icon: MessageSquare, count: forumData.length, color: '#3b82f6' },
    { id: 'guidelines', name: 'Guidelines & Rules', icon: Shield, count: forumData.filter(p => p.category === 'guidelines').length, color: '#10b981' },
    { id: 'experiences', name: 'Experiences', icon: Users, count: forumData.filter(p => p.category === 'experiences').length, color: '#8b5cf6' },
    { id: 'supplements', name: 'Supplements', icon: BookOpen, count: forumData.filter(p => p.category === 'supplements').length, color: '#f59e0b' },
    { id: 'urgent', name: 'Urgent Help', icon: AlertTriangle, count: forumData.filter(p => p.category === 'urgent').length, color: '#ef4444' },
    { id: 'education', name: 'Education', icon: Award, count: forumData.filter(p => p.category === 'education').length, color: '#06b6d4' },
    { id: 'recovery', name: 'Recovery', icon: HelpCircle, count: forumData.filter(p => p.category === 'recovery').length, color: '#84cc16' }
  ], [forumData]);

  const filteredPosts = useMemo(() => {
    let filtered = forumData;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Sort posts
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      switch (sortBy) {
        case 'popular':
          return (b.stats.likes + b.stats.replies) - (a.stats.likes + a.stats.replies);
        case 'mostReplies':
          return b.stats.replies - a.stats.replies;
        case 'recent':
        default:
          return new Date(b.lastActivity) - new Date(a.lastActivity);
      }
    });
    
    return filtered;
  }, [forumData, selectedCategory, searchTerm, sortBy]);

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Professional Athlete': return '#10b981';
      case 'Coach': return '#3b82f6';
      case 'Student Athlete': return '#8b5cf6';
      case 'Amateur Athlete': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const pageStyles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      color: 'white',
      padding: '40px 20px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    headerPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
    },
    headerTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '12px',
      position: 'relative',
      zIndex: 1
    },
    headerSubtitle: {
      fontSize: '18px',
      opacity: 0.9,
      position: 'relative',
      zIndex: 1
    },
    mainContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '32px 20px'
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      flexWrap: 'wrap',
      gap: '16px'
    },
    searchContainer: {
      position: 'relative',
      minWidth: '300px'
    },
    searchInput: {
      width: '100%',
      padding: '12px 40px 12px 16px',
      fontSize: '14px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      outline: 'none',
      transition: 'all 0.2s',
      boxSizing: 'border-box'
    },
    searchIcon: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#64748b'
    },
    controls: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center'
    },
    select: {
      padding: '8px 12px',
      border: '2px solid #e2e8f0',
      borderRadius: '6px',
      background: 'white',
      fontSize: '14px',
      outline: 'none'
    },
    newPostBtn: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s'
    },
    content: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr',
      gap: '32px',
      alignItems: 'start'
    },
    sidebar: {
      background: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      position: 'sticky',
      top: '20px'
    },
    sidebarTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px',
      color: '#1e293b'
    },
    categoryList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    categoryItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: '14px'
    },
    categoryItemActive: {
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      color: '#1e293b',
      fontWeight: '600'
    },
    postsContainer: {
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    },
    postItem: {
      padding: '24px',
      borderBottom: '1px solid #f1f5f9',
      transition: 'all 0.2s',
      cursor: 'pointer'
    },
    postHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px',
      marginBottom: '16px'
    },
    avatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    postMeta: {
      flex: 1
    },
    postTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#1e293b',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    pinnedIcon: {
      color: '#f59e0b'
    },
    answeredBadge: {
      background: '#10b981',
      color: 'white',
      padding: '2px 8px',
      borderRadius: '12px',
      fontSize: '10px',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    authorInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '13px',
      color: '#64748b',
      marginBottom: '8px'
    },
    roleTag: {
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: '600',
      textTransform: 'uppercase'
    },
    postContent: {
      color: '#475569',
      lineHeight: '1.6',
      marginBottom: '16px'
    },
    postTags: {
      display: 'flex',
      gap: '6px',
      marginBottom: '16px',
      flexWrap: 'wrap'
    },
    tag: {
      background: '#f1f5f9',
      color: '#475569',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: '500'
    },
    postStats: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    statsLeft: {
      display: 'flex',
      gap: '16px',
      fontSize: '13px',
      color: '#64748b'
    },
    statItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    lastActivity: {
      fontSize: '12px',
      color: '#94a3b8'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#64748b'
    }
  };

  return (
    <div style={pageStyles.container}>
      {/* Header */}
      <div style={pageStyles.header}>
        <div style={pageStyles.headerPattern}></div>
        <h1 style={pageStyles.headerTitle}>Community Forum</h1>
        <p style={pageStyles.headerSubtitle}>
          Connect with fellow athletes, share experiences, and get expert advice on clean sport
        </p>
      </div>

      <div style={pageStyles.mainContent}>
        {/* Top Bar */}
        <div style={pageStyles.topBar}>
          <div style={pageStyles.searchContainer}>
            <input
              type="text"
              placeholder="Search discussions, topics, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                ...pageStyles.searchInput,
                ...(searchTerm ? { borderColor: '#3b82f6', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)' } : {})
              }}
            />
            <Search size={18} style={pageStyles.searchIcon} />
          </div>

          <div style={pageStyles.controls}>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={pageStyles.select}
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="mostReplies">Most Replies</option>
            </select>

            <button 
              style={pageStyles.newPostBtn}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <Plus size={16} />
              New Discussion
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={pageStyles.content}>
          {/* Sidebar */}
          <div style={pageStyles.sidebar}>
            <h3 style={pageStyles.sidebarTitle}>Categories</h3>
            <div style={pageStyles.categoryList}>
              {categories.map(category => {
                const IconComponent = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <div
                    key={category.id}
                    style={{
                      ...pageStyles.categoryItem,
                      ...(isActive ? pageStyles.categoryItemActive : {}),
                      color: isActive ? category.color : '#64748b'
                    }}
                    onClick={() => setSelectedCategory(category.id)}
                    onMouseOver={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = '#f8fafc';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <IconComponent size={18} />
                    <span style={{ flex: 1 }}>{category.name}</span>
                    <span style={{ 
                      background: isActive ? category.color : '#e2e8f0',
                      color: isActive ? 'white' : '#64748b',
                      padding: '2px 6px',
                      borderRadius: '10px',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}>
                      {category.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Posts */}
          <div style={pageStyles.postsContainer}>
            {filteredPosts.length === 0 ? (
              <div style={pageStyles.emptyState}>
                <MessageSquare size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No discussions found</h3>
                <p>Try adjusting your search terms or browse different categories</p>
              </div>
            ) : (
              filteredPosts.map((post, index) => (
                <div
                  key={post.id}
                  style={{
                    ...pageStyles.postItem,
                    ...(index === filteredPosts.length - 1 ? { borderBottom: 'none' } : {})
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <div style={pageStyles.postHeader}>
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      style={pageStyles.avatar}
                    />
                    <div style={pageStyles.postMeta}>
                      <div style={pageStyles.postTitle}>
                        {post.isPinned && <Pin size={16} style={pageStyles.pinnedIcon} />}
                        {post.title}
                        {post.isAnswered && (
                          <span style={pageStyles.answeredBadge}>Answered</span>
                        )}
                      </div>
                      <div style={pageStyles.authorInfo}>
                        <span style={{ fontWeight: '600', color: '#1e293b' }}>
                          {post.author.name}
                        </span>
                        <span 
                          style={{
                            ...pageStyles.roleTag,
                            background: getRoleColor(post.author.role),
                            color: 'white'
                          }}
                        >
                          {post.author.role}
                        </span>
                        <Star size={12} />
                        <span>{post.author.reputation}</span>
                      </div>
                    </div>
                  </div>

                  <div style={pageStyles.postContent}>
                    {post.content}
                  </div>

                  <div style={pageStyles.postTags}>
                    {post.tags.map(tag => (
                      <span key={tag} style={pageStyles.tag}>#{tag}</span>
                    ))}
                  </div>

                  <div style={pageStyles.postStats}>
                    <div style={pageStyles.statsLeft}>
                      <div style={pageStyles.statItem}>
                        <Reply size={14} />
                        <span>{post.stats.replies} replies</span>
                      </div>
                      <div style={pageStyles.statItem}>
                        <ThumbsUp size={14} />
                        <span>{post.stats.likes} likes</span>
                      </div>
                      <div style={pageStyles.statItem}>
                        <Eye size={14} />
                        <span>{post.stats.views} views</span>
                      </div>
                    </div>
                    <div style={pageStyles.lastActivity}>
                      <Clock size={12} style={{ marginRight: '4px' }} />
                      Last activity {getTimeAgo(post.lastActivity)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForumPage;