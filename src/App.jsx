import { useState } from 'react';
import LandingPage from './components/LandingPage';
import UploadGate from './components/UploadGate';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import ScenarioMatrix from './components/ScenarioMatrix';
import RecommendedConfig from './components/RecommendedConfig';
import GateAssessment from './components/GateAssessment';
import PhasedRoadmap from './components/PhasedRoadmap';
import RouteDemand from './components/RouteDemand';
import ResourceScaling from './components/ResourceScaling';
import StrategicCards from './components/StrategicCards';
import Footer from './components/Footer';

// Four views: 'landing' → 'upload' → 'loading' → 'dashboard'
export default function App() {
  const [view, setView] = useState('landing');

  if (view === 'landing') {
    return <LandingPage onEnter={() => setView('upload')} />;
  }

  if (view === 'upload') {
    return <UploadGate onSubmit={() => setView('loading')} />;
  }

  if (view === 'loading') {
    return <LoadingScreen onDone={() => setView('dashboard')} />;
  }

  return (
    <>
      <Header onHome={() => setView('landing')} />
      <Hero />
      <StatsBar />
      <main>
        <div className="two-col">
          <ScenarioMatrix />
          <RecommendedConfig />
        </div>
        <GateAssessment />
        <PhasedRoadmap />
        <RouteDemand />
        <ResourceScaling />
        <StrategicCards />
      </main>
      <Footer />
    </>
  );
}
