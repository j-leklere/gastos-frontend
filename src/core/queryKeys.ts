export const qk = {
  movements: {
    all: ["movements"] as const,
    list: (f: any) => ["movements", "list", f] as const,
    byId: (id: string) => ["movements", "byId", id] as const
  }
};
