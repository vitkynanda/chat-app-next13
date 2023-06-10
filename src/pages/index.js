import { Inter } from "next/font/google";
import { useAuth } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!currentUser) router.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className} bg-c1`}
    >
      Hello This is Home
      <button onClick={handleSignOut}>Out</button>
    </main>
  );
}
