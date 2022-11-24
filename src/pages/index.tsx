import type { NextPage } from "next";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          router.push("/user");
        }}
      >
        User
      </Button>
    </>
  );
};

export default Home;
