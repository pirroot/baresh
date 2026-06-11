import HomeArticles from "@/components/Home/HomeArticles/HomeArticles";
import HomeCategories from "@/components/Home/HomeCategories";
import HomeProducts from "@/components/Home/HomeProducts/HomeProducts";
import HomePromise from "@/components/Home/HomePromise";
import HomeStats from "@/components/Home/HomeStats";
import TopPage from "@/components/Home/TopPage/TopPage";
export const revalidate = 3600;

export default function Home() {
  return (
    <main>
      {/* <ScrollVideo /> */}
      <TopPage />
      <HomeStats />
      <HomeCategories />
      <HomeProducts />
      <HomePromise />
      <HomeArticles />
    </main>
  );
}