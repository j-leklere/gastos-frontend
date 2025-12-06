import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { normalizeError } from "./normalizeError";
import { View, ActivityIndicator, Text, Pressable } from "react-native";
import { queryClient } from "./queryClient";

const Fallback = ({ error, resetErrorBoundary }: any) => {
  const n = normalizeError(error);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Ocurrió un error</Text>
      <Text style={{ opacity: 0.8, marginBottom: 16 }}>{n.message}</Text>
      <Pressable
        onPress={resetErrorBoundary}
        style={{ padding: 12, backgroundColor: "#333", borderRadius: 8 }}
      >
        <Text style={{ color: "#fff" }}>Reintentar</Text>
      </Pressable>
    </View>
  );
};

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary FallbackComponent={Fallback}>
      <Suspense
        fallback={
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <ActivityIndicator />
          </View>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  </QueryClientProvider>
);
