/** pages/api/uploadthing.ts */
import { createNextPageApiHandler } from "uploadthing/next-legacy";

import { ourFileRouter } from "~/meme-server/uploadthing";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default handler;