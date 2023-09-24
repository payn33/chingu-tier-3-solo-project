import select from "@inquirer/select";
import { formattedGeocodeRes } from "../types";

const cliSelect = async (
  message: "Please select a location you would like to display",
  options: formattedGeocodeRes
): Promise<{
  lat: string;
  lng: string;
  location: {
    city?: string;
    state?: string;
    country?: string;
    description: string;
  };
}> => {
  const choices = options.map((ctx, idx) => {
    const {
      location: { city, state, country, description: des },
    } = ctx;

    const name = `${city ? city + "," : ""}${state ? state + "," : ""}${
      country ? country : ""
    }`;

    const value = idx;
    const description = des;

    return { name: !name ? "unknown" : name, value, description };
  });

  const answer = await select<number>({
    message,
    choices,
  });

  return {
    lat: options[answer].lat,
    lng: options[answer].lng,
    location: { ...options[answer].location },
  };
};

export default cliSelect;
