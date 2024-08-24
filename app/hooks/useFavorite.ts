import { SafeUser } from "../types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useLoginModel from "./useLoginModal";




interface IUserFavorite{
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({
    listingId,
    currentUser,
}: IUserFavorite) =>{

    const router = useRouter();
    const loginModel = useLoginModel();

    const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

     return list.includes(listingId);
  }, [currentUser, listingId]);


  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModel.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast.success("Successfully!");
      } catch (error: any) {
        toast.error("Something Went Wrong");
      }
    },
    [currentUser, hasFavorited, listingId, loginModel, router]
  );


  return {
    hasFavorited,
    toggleFavorite,
  };

}

export default useFavorite;