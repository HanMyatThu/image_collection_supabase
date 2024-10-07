import { Header } from "@/components/header";
import { Content } from "./_components/content";
import { createServerComponentClient } from "@/lib/supabase/server";
import { getImagesByUserId } from "@/actions/images";

export const revalidate = 0;

const ImagesPage = async () => {
  const supabase = createServerComponentClient();
  const images = await getImagesByUserId();
  const { data: user } = await supabase.auth.getUser();

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header user={user.user}>
        <div className="mt-20">
          <p className="hidden md:block font-semibold text-md">Manage Images</p>
        </div>
      </Header>
      <Content images={images} />
    </div>
  );
};

export default ImagesPage;
