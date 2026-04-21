import { getContent } from "./cms";

export async function getSiteContent() {
  const content = await getContent();
  return content;
}

export async function getPageContent(pageName: string) {
  const content = await getContent();
  return content?.pages[pageName] || null;
}
