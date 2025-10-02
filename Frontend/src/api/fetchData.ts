import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

export const fetchWars = async () => {
  try {
    const response = await axiosInstance.get(`/wars`);
    console.log("API FILE:", response.data);
    return response.data;
  } catch (error) {
    return { error: "Error fetching wars data" };
  }
};
