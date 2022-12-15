export const getQueryString = (filters?: Record<string, any>) => {
  if (filters) {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value ?? false)
    );
    return new URLSearchParams(cleanFilters).toString() ?? "";
  }
  return "";
};
