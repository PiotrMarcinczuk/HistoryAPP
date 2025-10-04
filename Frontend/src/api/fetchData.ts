import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const fetchWars = async () => {
  try {
    const response = await axiosInstance.get(`/wars`);
    return response.data.data;
  } catch (error) {
    return { error: "Error fetching wars data" };
  }
};

export const fetchEvents = async (warId: number) => {
  // MUST USE documentId not id
  try {
    const response = await axiosInstance.get(
      `/wars/${warId}?populate[0]=war_details&populate[1]=war_details.Images`
    );

    return response.data.data.war_details;
  } catch (error) {
    if (error.response.data.data === null) return []; // no events for this war
    return { error: "Error fetching events data" };
  }
};
