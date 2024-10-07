import Image from "next/image";

import { Header } from "@/components/header";
import { Content } from "./_components/content";
import { getLikeImages } from "@/actions/favourites";

export const revalidate = 0;

const FavouritePage = async () => {
  const likeImages = await getLikeImages();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative h-32 w-32 lg:h-44 lg:w-44">
              <Image
                src="/images/like.webp"
                fill
                alt="Playlist"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Favourite</p>
              <h1 className="text-white text-2xl sm:text-3xl lg:text-3xl font-bold">
                Your favourite images
              </h1>
            </div>
          </div>
        </div>
      </Header>
      <Content images={likeImages} />
    </div>
  );
};

export default FavouritePage;
