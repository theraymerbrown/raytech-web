import type { Metadata } from "next";
import QuizApp from "./QuizApp";

export const metadata: Metadata = {
  title: "Where does work get stuck? | RayTech Services",
  description:
    "A practical check for small businesses, churches, and nonprofits. Find what could work better—no email required to see results.",
};

export default function QuizPage() {
  return <QuizApp />;
}
