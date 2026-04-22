import { getContent } from "./cms";

export async function getSiteContent() {
  const content = await getContent();
  return content;
}

export async function getPageContent(pageName: string) {
  const content = await getContent();
  return content?.pages[pageName] || null;
}

export async function getServiceDetail(id: string) {
  const content = await getContent();
  return content?.serviceDetails?.[id] || null;
}

export async function getPortfolioContent() {
  const content = await getContent();
  return {
    page: content?.portfolioPage || null,
    items: content?.portfolioItems || []
  };
}

export async function getPortfolioDetail(id: string) {
  const content = await getContent();
  return content?.portfolioItems?.find((item: any) => item.id === id) || null;
}
