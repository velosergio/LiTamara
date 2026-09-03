import CrawlableContent from "./components/CrawlableContent";
import HomeExperience from "./components/HomeExperience";
import JsonLd from "./components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <CrawlableContent />
      <HomeExperience />
    </>
  );
}
