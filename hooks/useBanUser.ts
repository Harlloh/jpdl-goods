// useUserBan.js
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const useUserBan = () => {
  const [loadingBan, setLoading] = useState(false);
  const [errorBan, setError] = useState(null);

  const banUser = useCallback(async (userId:string, userToken:any) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `https://store-api-pyo1.onrender.com/user/block/${userId}`,
        {},
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      toast.success('User banned successfully');
      return response.data;
    } catch (error:any) {
      setError(error);
      toast.error('Failed to ban user');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loadingBan, errorBan, banUser };
};

export default useUserBan;
