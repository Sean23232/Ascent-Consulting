import Hero from "@/components/home/Hero";
import JourneyRoadmap from "@/components/home/JourneyRoadmap";
import Faq from "@/components/Faq";
import {
  Challenge,
  ConsultationCTA,
  FinalCTA,
  PositioningStrip,
  ServicesGrid,
  WhoWeHelp,
  WhyAscent,
} from "@/components/home/Sections";
import { QuizTeaser } from "@/components/quiz/NextStepQuiz";
import { usePageMeta } from "@/lib/hooks";

export default function Home() {
  usePageMeta(
    "Ascent Consulting | Business Setup to Funding Preparation",
    "Explore business setup, strategic planning, and funding preparation support with Ascent Consulting. Start a conversation about your business goals and next steps."
  );

  return (
    <>
      <Hero />
      <PositioningStrip />
      <Challenge />
      <ServicesGrid />
      <JourneyRoadmap />
      <WhyAscent />
      <QuizTeaser />
      <WhoWeHelp />
      <ConsultationCTA />
      <Faq />
      <FinalCTA />
    </>
  );
}
