import type {
  Post,
  Category,
  PaginatedResponse,
  ApiResponse,
  SearchParams,
  ContactFormData,
  ContactResponse,
} from "~/types";

/**
 * Composable for all API calls.
 * Uses the Axios instance provided by the api plugin.
 */
export function useApi() {
  const { $api } = useNuxtApp();

  // ── Posts ────────────────────────────────────────

  async function getPosts(
    params: SearchParams = {}
  ): Promise<PaginatedResponse<Post>> {
    const { data } = await $api.get<PaginatedResponse<Post>>("/posts", {
      params: {
        page: params.page || 1,
        pageSize: params.pageSize || 6,
        category: params.category,
        tag: params.tag,
        query: params.query,
        sortBy: params.sortBy || "date",
        sortOrder: params.sortOrder || "desc",
      },
    });
    return data;
  }

  async function getPostBySlug(slug: string): Promise<Post> {
    const { data } = await $api.get<ApiResponse<Post>>(`/posts/${slug}`);
    return data.data;
  }

  async function getFeaturedPosts(): Promise<Post[]> {
    const { data } = await $api.get<ApiResponse<Post[]>>("/posts/featured");
    return data.data;
  }

  async function getRelatedPosts(
    currentSlug: string,
    categorySlug: string,
    limit: number = 3
  ): Promise<Post[]> {
    const response = await getPosts({
      category: categorySlug,
      pageSize: limit + 1,
    });
    return response.data
      .filter((p) => p.slug !== currentSlug)
      .slice(0, limit);
  }

  // ── Categories ──────────────────────────────────

  async function getCategories(): Promise<Category[]> {
    const { data } = await $api.get<ApiResponse<Category[]>>("/categories");
    return data.data;
  }

  // ── Contact ─────────────────────────────────────

  async function submitContact(
    formData: ContactFormData
  ): Promise<ContactResponse> {
    const { data } = await $api.post<ApiResponse<ContactResponse>>(
      "/contact",
      formData
    );
    return data.data;
  }

  return {
    getPosts,
    getPostBySlug,
    getFeaturedPosts,
    getRelatedPosts,
    getCategories,
    submitContact,
  };
}
