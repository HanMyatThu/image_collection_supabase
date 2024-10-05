"use client";

import { Header } from "@/components/header";
import { useUser } from "@/hooks/use-user";

const HomePage = () => {
  const { user } = useUser();
  console.log(user, "user");

  return (
    <div>
      <Header>Hello</Header>
    </div>
  );
};

export default HomePage;
