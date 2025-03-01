"use client";
import { DeleteRequestHandler } from "@/axios/DeleteRequestHandler";
import { GetRequestHandler } from "@/axios/GetRequestHandler";
import { PatchRequestHandler } from "@/axios/PatchRequestHandler";
import { PostRequestHandler } from "@/axios/PostRequestHandler";
import { useMutation, useQuery } from "@tanstack/react-query";
export const useGetQueries = (queryKey: string, endpoint: string) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => GetRequestHandler(endpoint),
  });
};

export const usePostMutationQueries = (queryKey: string, endpoint: string) => {
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (data: unknown) => PostRequestHandler(endpoint, data),
  });
};

export const usePatchMutationQueries = (queryKey: string, endpoint: string) => {
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (data: unknown) => PatchRequestHandler(endpoint, data),
  });
};
export const useDeleteMutationQueries = (
  queryKey: string,
  endpoint: string
) => {
  return useMutation({
    mutationKey: [queryKey],
    mutationFn: (id: string) => DeleteRequestHandler(endpoint, id),
  });
};
