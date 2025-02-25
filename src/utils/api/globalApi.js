import fetchApi from "../strapi";

export async function fetchBannerData() {
  return await fetchApi({
    endpoint: "api/open-observe-cloud-free-tier",
    query: { pLevel: "4", status: "draft" },
  });
}
