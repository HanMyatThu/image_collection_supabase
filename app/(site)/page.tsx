import { Header } from "@/components/header";
// import { Loader2 } from "lucide-react";
import { PageContent } from "./_components/page-content";
import { getPublicImages } from "@/actions/get-public-images";
import { ListItem } from "@/components/common/list-item";

const HomePage = async () => {
  const images = await getPublicImages();

  return (
    <div>
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-2xl font-semibold">Welcome back</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              name="Liked songs"
              image="/images/like.jpg"
              href="/likes"
            />
          </div>
        </div>
      </Header>
      <div className="mt-4 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Images</h1>
        </div>
        <PageContent images={images} />
      </div>
    </div>
  );
};

export default HomePage;
