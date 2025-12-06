export const normalizeError = (e: any) => {
  const status = e?.status ?? 0;
  const title = e?.data?.title ?? e?.message ?? "Error";
  const detail = e?.data?.detail ?? e?.data?.message ?? title;
  return { status, message: detail, raw: e };
};
