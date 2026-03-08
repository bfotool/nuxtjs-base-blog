/**
 * Debounce a ref value.
 */
export function useDebounce<T>(value: Ref<T>, delayMs: number = 300): Ref<T> {
  const debounced = ref(value.value) as Ref<T>;
  let timer: ReturnType<typeof setTimeout>;

  watch(value, (newVal) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      debounced.value = newVal;
    }, delayMs);
  });

  return debounced;
}
