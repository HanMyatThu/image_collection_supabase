import { Header } from "@/components/header";
import { SearchInput } from "@/components/common/search-input";
import { SearchContent } from "./_components/search-content";
import { getImageByTitle } from "@/actions/images";
import { createServerComponentClient } from "@/lib/supabase/server";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const SearchPage = async ({ searchParams }: SearchProps) => {
  const supabase = createServerComponentClient();
  const images = await getImageByTitle(searchParams.title);
  const { data: user } = await supabase.auth.getUser();

  return (
    <div className="rounded-lg w-full overflow-hidden overflow-y-auto">
      <Header user={user.user} className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-4 mt-6">
          <h1 className="text-white text-2xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent images={images} />
    </div>
  );
};

export default SearchPage;
