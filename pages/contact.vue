<script setup lang="ts">
import type { ContactFormData } from "~/types";

useSeoMeta({
  title: "Contact",
  description: "Get in touch with the Bfotool Blog team.",
});

const api = useApi();
const toastStore = useToastStore();

const form = reactive<ContactFormData>({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const errors = reactive<Partial<ContactFormData>>({});
const submitting = ref(false);

function validate(): boolean {
  // Reset
  errors.name = undefined;
  errors.email = undefined;
  errors.subject = undefined;
  errors.message = undefined;

  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email address";
  }
  if (!form.subject.trim()) errors.subject = "Subject is required";
  if (!form.message.trim()) {
    errors.message = "Message is required";
  } else if (form.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return !errors.name && !errors.email && !errors.subject && !errors.message;
}

async function handleSubmit() {
  if (!validate()) return;

  submitting.value = true;
  try {
    const result = await api.submitContact({ ...form });
    if (result.success) {
      toastStore.addToast("success", "Message sent!", result.message);
      form.name = "";
      form.email = "";
      form.subject = "";
      form.message = "";
    }
  } catch {
    toastStore.addToast("error", "Failed to send", "Please try again later.");
  }
  submitting.value = false;
}

function clearError(field: keyof ContactFormData) {
  errors[field] = undefined;
}

function inputClass(field: keyof ContactFormData) {
  const base =
    "w-full rounded-xl border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 bg-white text-neutral-900 placeholder:text-neutral-400 dark:bg-neutral-900 dark:text-white dark:placeholder:text-neutral-500";
  return errors[field]
    ? `${base} border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-700`
    : `${base} border-neutral-200 focus:border-blue-500 focus:ring-blue-500/20 dark:border-neutral-700 dark:focus:border-blue-400`;
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6">
    <header class="text-center">
      <h1
        class="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white"
      >
        Get in Touch
      </h1>
      <p class="mx-auto mt-4 max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
        Have a question, suggestion, or want to collaborate? We'd love to hear
        from you.
      </p>
    </header>

    <div class="mt-12 grid gap-10 lg:grid-cols-[1fr_340px]">
      <!-- Form -->
      <form class="space-y-5" novalidate @submit.prevent="handleSubmit">
        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              for="name"
              class="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Name
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              :class="inputClass('name')"
              placeholder="John Doe"
              @input="clearError('name')"
            />
            <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
          </div>

          <div>
            <label
              for="email"
              class="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              :class="inputClass('email')"
              placeholder="john@example.com"
              @input="clearError('email')"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
          </div>
        </div>

        <div>
          <label
            for="subject"
            class="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Subject
          </label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            :class="inputClass('subject')"
            placeholder="What's this about?"
            @input="clearError('subject')"
          />
          <p v-if="errors.subject" class="mt-1 text-xs text-red-500">{{ errors.subject }}</p>
        </div>

        <div>
          <label
            for="message"
            class="mb-1.5 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Message
          </label>
          <textarea
            id="message"
            v-model="form.message"
            rows="6"
            :class="inputClass('message')"
            placeholder="Tell us what's on your mind..."
            @input="clearError('message')"
          />
          <p v-if="errors.message" class="mt-1 text-xs text-red-500">{{ errors.message }}</p>
        </div>

        <button
          type="submit"
          :disabled="submitting"
          class="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          <template v-if="submitting">
            <span
              class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-neutral-900/30 dark:border-t-neutral-900"
            />
            Sending...
          </template>
          <template v-else>
            <Icon name="lucide:send" size="16" />
            Send Message
          </template>
        </button>
      </form>

      <!-- Contact Info -->
      <aside class="space-y-6">
        <div class="rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
          <h3 class="mb-4 text-lg font-semibold text-neutral-900 dark:text-white">
            Contact Info
          </h3>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <Icon name="lucide:mail" size="18" class="mt-0.5 text-neutral-500" />
              <div>
                <p class="text-sm font-medium text-neutral-900 dark:text-white">Email</p>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  hello@devpulse.blog
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <Icon name="lucide:map-pin" size="18" class="mt-0.5 text-neutral-500" />
              <div>
                <p class="text-sm font-medium text-neutral-900 dark:text-white">Location</p>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  San Francisco, CA
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <Icon name="lucide:clock" size="18" class="mt-0.5 text-neutral-500" />
              <div>
                <p class="text-sm font-medium text-neutral-900 dark:text-white">
                  Response Time
                </p>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
