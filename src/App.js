
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Auth from './pages/Auth';
import ResetPassword from './pages/ResetPassword';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';
import PlayerDashboard from './pages/PlayerDashboard';
import DashboardP from './pages/DashboardP';
import Quizzes from './pages/Quizzes';
import Resources from './pages/Resources';
import Athletics from './pages/Athletics';
import AthleticsArticles from './pages/AthleticsArticles';
import AthleticsAudio from './pages/AthleticsAudio';
import AthleticsVideo from './pages/AthleticsVideo';
import AthleticsStory from './pages/AthleticsStory';
import AthleticsDosDonts from './pages/AthleticsDosDonts';
import Cycling from './pages/Cycling';
import CyclingArticles from './pages/CyclingArticles';
import CyclingAudio from './pages/CyclingAudio';
import CyclingVideo from './pages/CyclingVideo';
import CyclingStory from './pages/CyclingStory';
import CyclingDosDonts from './pages/CyclingDosDonts';
import Wrestling from './pages/Wrestling';
import WrestlingArticles from './pages/WrestlingArticles';
import WrestlingAudio from './pages/WrestlingAudio';
import WrestlingVideo from './pages/WrestlingVideo';
import WrestlingStory from './pages/WrestlingStory';
import WrestlingDosDonts from './pages/WrestlingDosDonts';
import Weightlifting from './pages/Weightlifting';
import WeightliftingArticles from './pages/WeightliftingArticles';
import WeightliftingAudio from './pages/WeightliftingAudio';
import WeightliftingVideo from './pages/WeightliftingVideo';
import WeightliftingStory from './pages/WeightliftingStory';
import WeightliftingDosDonts from './pages/WeightliftingDosDonts';
import Cricket from './pages/Cricket';
import CricketArticles from './pages/CricketArticles';
import CricketAudio from './pages/CricketAudio';
import CricketVideo from './pages/CricketVideo';
import CricketStory from './pages/CricketStory';
import CricketDosDonts from './pages/CricketDosDonts';
import Boxing from './pages/Boxing';
import BoxingArticles from './pages/BoxingArticles';
import BoxingAudio from './pages/BoxingAudio';
import BoxingVideo from './pages/BoxingVideo';
import BoxingStory from './pages/BoxingStory';
import BoxingDosDonts from './pages/BoxingDosDonts';
import Football from './pages/Football';
import FootballArticles from './pages/FootballArticles';
import FootballAudio from './pages/FootballAudio';
import FootballVideo from './pages/FootballVideo';
import FootballStory from './pages/FootballStory';
import FootballDosDonts from './pages/FootballDosDonts';
import AchievementsBadges from './pages/AchievementsBadges';
import MyProgress from './pages/MyProgress';

import './App.css';
import LeaderBoard from './pages/LeaderBoard';
import Certificate from './pages/Certificate';
import AntiDopingNewsPage from './pages/AntiDopingNewsPage';
import CommunityForumPage from './pages/CommunityForumPage';



function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="auth" element={<Auth />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="quizzes" element={<Quizzes />} />
          <Route path="resources" element={<Resources />} />
           <Route path="/athletics" element={<Athletics/>} />
          <Route path="/athletics-articles" element={<AthleticsArticles/>} />
          <Route path="/athletics-audio" element={<AthleticsAudio/>} />
        <Route path="/athletics-videos" element={<AthleticsVideo/>} />
        <Route path="/athletics-stories" element={<AthleticsStory/>} />
        <Route path="/football" element={<Football/>} />
        <Route path="/football-articles" element={<FootballArticles/>} />
        <Route path="/football-audio" element={<FootballAudio/>} />
        <Route path="/football-videos" element={<FootballVideo/>} />
        <Route path="/football-stories" element={<FootballStory/>} />
        <Route path="/football-dosdonts" element={<FootballDosDonts/>} />
        <Route path="/athletics-dosdonts" element={<AthleticsDosDonts/>} />
          <Route path="/cycling" element={<Cycling/>} />
        <Route path="/cycling-articles" element={<CyclingArticles/>} />
        <Route path="/cycling-audio" element={<CyclingAudio/>} />
        <Route path="/cycling-videos" element={<CyclingVideo/>} />
        <Route path="/cycling-stories" element={<CyclingStory/>} />
        <Route path="/cycling-dosdonts" element={<CyclingDosDonts/>} />
         <Route path="/wrestling" element={<Wrestling/>} />
        <Route path="/wrestling-articles" element={<WrestlingArticles/>} />
        <Route path="/wrestling-audio" element={<WrestlingAudio/>} />
        <Route path="/wrestling-videos" element={<WrestlingVideo/>} />
        <Route path="/wrestling-stories" element={<WrestlingStory/>} />
        <Route path="/wrestling-dosdonts" element={<WrestlingDosDonts/>} />
         <Route path="/weightlifting" element={<Weightlifting/>} />
        <Route path="/weightlifting-articles" element={<WeightliftingArticles/>} />
        <Route path="/weightlifting-audio" element={<WeightliftingAudio/>} />
        <Route path="/weightlifting-videos" element={<WeightliftingVideo/>} />
        <Route path="/weightlifting-stories" element={<WeightliftingStory/>} />
        <Route path="/weightlifting-dosdonts" element={<WeightliftingDosDonts/>} />
        <Route path="/cricket" element={<Cricket/>} />
        <Route path="/cricket-articles" element={<CricketArticles/>} />
        <Route path="/cricket-audio" element={<CricketAudio/>} />
        <Route path="/cricket-videos" element={<CricketVideo/>} />
        <Route path="/cricket-stories" element={<CricketStory/>} />
        <Route path="/cricket-dosdonts" element={<CricketDosDonts/>} />
        <Route path="/boxing" element={<Boxing/>} />
        <Route path="/boxing-articles" element={<BoxingArticles/>} />
        <Route path="/boxing-audio" element={<BoxingAudio/>} />
        <Route path="/boxing-videos" element={<BoxingVideo/>} />
        <Route path="/boxing-stories" element={<BoxingStory/>} />
        <Route path="/boxing-dosdonts" element={<BoxingDosDonts/>} />
      <Route path="/achievements" element={<AchievementsBadges/>} />
      <Route path="/progress" element={<MyProgress/>} />
      <Route path="/leaderboard" element={<LeaderBoard/>} />
      <Route path="/certificates" element={<Certificate/>} />
      <Route path="/news" element={<AntiDopingNewsPage/>} />
      <Route path="/community" element={<CommunityForumPage/>} />
      
          {/* Nested routes for PlayerDashboard */}
          <Route path="player-dashboard" element={<PlayerDashboard />}>
            {/* default child route (index) renders DashboardP */}
            <Route index element={<DashboardP />} />
            {/* add other nested routes here if needed */}
          </Route>

          {/* fallback or 404 can go here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
