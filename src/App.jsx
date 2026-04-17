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

export default function App() {
  return (
    <>
      <Header />
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
