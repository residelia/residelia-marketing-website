/*
composable for loading and previewing data from sanity
*/
import { useMainStore } from "../stores/mainStore";

export default async function ({ query, params, livePreview = true }) {
  const mainStore = useMainStore();

  const sanityClient = mainStore.previewIsActive
    ? {
        client: "preview",
        server: false,
        initialCache: false,
      }
    : undefined;

  // // live preview: listen to changes
  // onMounted(() => {
  //   if (mainStore.previewIsActive && livePreview) {
  //     const sanity = useSanity("preview");
  //     sanity.client.listen(query, params).subscribe((event) => {
  //       setTimeout(() => {
  //         refresh();
  //       }, 900);
  //     });
  //   }
  // });

  // get data
  const { data, refresh } = await useSanityQuery(
    query,
    params,
    sanityClient
  );
  // console.log(
  //   "%cuseSanityQuery!",
  //   "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
  // );
  // console.log(data)
  return data;
}
