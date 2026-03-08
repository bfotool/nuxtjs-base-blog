import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { mockPosts } from "./posts";
import { mockCategories } from "./categories";
import { mockAuthors } from "./authors";
import type {
  PaginatedResponse,
  ApiResponse,
  Post,
  Category,
  ContactResponse,
} from "~/types";
import { delay } from "~/utils";

const MIN_DELAY = 200;
const MAX_DELAY = 600;

function randomDelay() {
  return Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY)) + MIN_DELAY;
}

/**
 * Install mock interceptors on an Axios instance.
 * All requests are intercepted and resolved with fake data + simulated delay.
 */
export function installMockInterceptors(instance: AxiosInstance): void {
  instance.interceptors.request.use(async (config) => {
    const url = config.url || "";
    const params = config.params || {};

    await delay(randomDelay());

    // ── GET /posts (paginated, filterable) ──
    if (url === "/posts" && config.method === "get") {
      const page = Number(params.page) || 1;
      const pageSize = Number(params.pageSize) || 6;
      const categorySlug = params.category as string | undefined;
      const tag = params.tag as string | undefined;
      const query = (params.query as string | undefined)?.toLowerCase();
      const sortBy = (params.sortBy as string) || "date";
      const sortOrder = (params.sortOrder as string) || "desc";

      let filtered = [...mockPosts];

      if (categorySlug) {
        filtered = filtered.filter((p) => p.category.slug === categorySlug);
      }
      if (tag) {
        filtered = filtered.filter((p) =>
          p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
        );
      }
      if (query) {
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.excerpt.toLowerCase().includes(query) ||
            p.tags.some((t) => t.toLowerCase().includes(query))
        );
      }

      filtered.sort((a, b) => {
        let cmp = 0;
        switch (sortBy) {
          case "title":
            cmp = a.title.localeCompare(b.title);
            break;
          case "readingTime":
            cmp = a.readingTime - b.readingTime;
            break;
          default:
            cmp =
              new Date(a.publishedAt).getTime() -
              new Date(b.publishedAt).getTime();
        }
        return sortOrder === "asc" ? cmp : -cmp;
      });

      const total = filtered.length;
      const totalPages = Math.ceil(total / pageSize);
      const start = (page - 1) * pageSize;
      const data = filtered.slice(start, start + pageSize);

      const response: PaginatedResponse<Post> = {
        data,
        pagination: { page, pageSize, total, totalPages },
      };
      return Promise.reject({ __MOCK__: true, data: response, status: 200 });
    }

    // ── GET /posts/featured ──
    if (url === "/posts/featured" && config.method === "get") {
      const response: ApiResponse<Post[]> = {
        data: mockPosts.filter((p) => p.featured),
      };
      return Promise.reject({ __MOCK__: true, data: response, status: 200 });
    }

    // ── GET /posts/:slug ──
    const postMatch = url.match(/^\/posts\/(.+)$/);
    if (postMatch && config.method === "get") {
      const slug = postMatch[1];
      const post = mockPosts.find((p) => p.slug === slug);
      if (!post) {
        return Promise.reject({
          __MOCK__: true,
          data: { message: "Post not found" },
          status: 404,
        });
      }
      const response: ApiResponse<Post> = { data: post };
      return Promise.reject({ __MOCK__: true, data: response, status: 200 });
    }

    // ── GET /categories ──
    if (url === "/categories" && config.method === "get") {
      const response: ApiResponse<Category[]> = { data: mockCategories };
      return Promise.reject({ __MOCK__: true, data: response, status: 200 });
    }

    // ── POST /contact ──
    if (url === "/contact" && config.method === "post") {
      const response: ApiResponse<ContactResponse> = {
        data: {
          success: true,
          message:
            "Thank you for your message! We'll get back to you within 24 hours.",
        },
      };
      return Promise.reject({ __MOCK__: true, data: response, status: 200 });
    }

    // ── GET /authors ──
    if (url === "/authors" && config.method === "get") {
      const response: ApiResponse<typeof mockAuthors> = {
        data: mockAuthors,
      };
      return Promise.reject({ __MOCK__: true, data: response, status: 200 });
    }

    // Fallback
    return Promise.reject({
      __MOCK__: true,
      data: { message: `Mock not found for ${config.method} ${url}` },
      status: 404,
    });
  });

  // Convert mock rejections into resolved responses
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.__MOCK__) {
        return Promise.resolve({
          data: error.data,
          status: error.status,
          statusText: "OK",
          headers: {},
          config: {} as InternalAxiosRequestConfig,
        });
      }
      return Promise.reject(error);
    }
  );
}
