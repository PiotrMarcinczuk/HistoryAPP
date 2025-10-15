import axios from "axios";
import { useErrorBoundary } from "react-error-boundary";
const baseUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export default function fetchData() {
  const { showBoundary } = useErrorBoundary();
  const fetchWars = async () => {
    try {
      const response = await axiosInstance.get(
        `api/wars?populate[0]=countries&populate[1]=countries.flag&populate[2]=countries.crest&populate[3]=legendImages`
      );

      return response.data.data;
    } catch (error: any) {
      showBoundary(error);
    }
  };

  const fetchEvents = async (warId: string) => {
    // MUST USE documentId not id
    if (!warId) return;
    try {
      const response = await axiosInstance.get(
        `api/wars/${warId}?populate[0]=war_details&populate[1]=war_details.images`
      );

      return response.data.data.war_details;
    } catch (error: any) {
      if (error.response.data.data === null) return []; // no events for this war
      showBoundary(error);
    }
  };
  return { fetchWars, fetchEvents };
}
