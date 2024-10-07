import { Header } from "@/components/header";
// import { Loader2 } from "lucide-react";
import { PageContent } from "./_components/page-content";
import { ListItem } from "@/components/common/list-item";
import { getImages } from "@/actions/images";
import { createServerComponentClient } from "@/lib/supabase/server";
import { getLikeImages } from "@/actions/favourites";

export const revalidate = 0;

const HomePage = async () => {
  const supabase = createServerComponentClient();

  const images = await getImages();
  const favImages = await getLikeImages();
  const { data: user } = await supabase.auth.getUser();

  const favImageIds: string[] = favImages.map((image) => image.id);

  return (
    <div>
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-xl font-semibold mt-8">
            Your Favourite Images
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              name="Favourite Images"
              images={favImages}
              href="/likes"
            />
          </div>
        </div>
      </Header>
      <div className="mt-4 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-semibold">Newest Images</h1>
        </div>
        <PageContent
          favImageIds={favImageIds}
          images={images}
          userId={user.user?.id}
        />
      </div>
    </div>
  );
};

export default HomePage;
