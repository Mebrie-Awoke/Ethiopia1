export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000";

const handleResponse = async (response) => {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text}`);
  }
  return response.json();
};

export async function fetchHealth() {
  const response = await fetch(`${API_BASE_URL}/health`);
  return handleResponse(response);
}

export async function fetchCategories() {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return handleResponse(response);
}

export async function fetchArticles(page = 1, size = 20) {
  const response = await fetch(`${API_BASE_URL}/articles?page=${page}&size=${size}`);
  return handleResponse(response);
}

export async function fetchArticleById(articleId) {
  const response = await fetch(`${API_BASE_URL}/articles/${articleId}`);
  return handleResponse(response);
}

export async function searchArticles(query, page = 1, size = 20) {
  const url = new URL(`${API_BASE_URL}/articles/search`);
  url.searchParams.set("q", query);
  url.searchParams.set("page", page);
  url.searchParams.set("size", size);
  const response = await fetch(url.toString());
  return handleResponse(response);
}

export async function fetchArticleBySlug(slug) {
  const normalized = slug.trim().replace(/[-_]/g, " ");
  const results = await searchArticles(normalized, 1, 1);
  return Array.isArray(results) && results.length > 0 ? results[0] : null;
}
