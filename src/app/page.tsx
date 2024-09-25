import {recipes} from "@/lib/data"
import { db } from "@/server/db";
import Hero from "./_components/Hero";

const Home = async () => {

 
  return (
    <main className="">
      <Hero />
    </main>
  );
}

export default Home