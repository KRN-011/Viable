export default function getImageUrl(url: string) {
  try {
    const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

    return `${STRAPI_API_URL}${url}`;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}
