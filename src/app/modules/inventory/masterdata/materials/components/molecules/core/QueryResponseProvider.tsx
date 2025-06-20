/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  createResponseContext,
  initialQueryResponse,
  initialQueryState,
  PaginationState,
  QUERIES,
  stringifyRequestQuery,
  WithChildren,
} from '@metronic/helpers';
import { getUsers } from './_requests';
import { Materials } from './_models';
import { useQueryRequest } from './QueryRequestProvider';

const QueryResponseContext = createResponseContext<Materials>(initialQueryResponse);

const QueryResponseProvider: FC<WithChildren> = ({ children }) => {
  const { state } = useQueryRequest();
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state));
  const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state]);

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery]);

  const { isFetching, refetch, data: response } = useQuery({
    queryKey: [`${QUERIES.USERS_LIST}-${query}`],
    queryFn: () => getUsers(query),
    refetchOnWindowFocus: false,
  });

  // Transform the response data to match the expected type
  const transformedResponse = useMemo(() => {
    if (!response) {
      return undefined;
    }

    return {
      ...response,
      data: response.data?.map((item) => ({
        ...item,
        // Map properties from `ParentMaterials` to `Materials` if needed
        photo: '', // Add default or mapped value
        description: '', // Add default or mapped value
        material_name: item.name, // Map `name` to `material_name`
        brand_name: '', // Add default or mapped value
        set_default: '', // Add default or mapped value
      })) as Materials[],
    };
  }, [response]);

  return (
    <QueryResponseContext.Provider
      value={{ isLoading: isFetching, refetch, response: transformedResponse, query }}
    >
      {children}
    </QueryResponseContext.Provider>
  );
};

const useQueryResponse = () => useContext(QueryResponseContext);

const useQueryResponseData = () => {
  const { response } = useQueryResponse();
  if (!response) {
    return [];
  }

  return response?.data || [];
};

const useQueryResponsePagination = () => {
  const defaultPaginationState: PaginationState = {
    links: [],
    ...initialQueryState,
  };

  const { response } = useQueryResponse();
  if (!response || !response.payload || !response.payload.pagination) {
    return defaultPaginationState;
  }

  return response.payload.pagination;
};

const useQueryResponseLoading = (): boolean => {
  const { isLoading } = useQueryResponse();
  return isLoading;
};

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  useQueryResponseLoading,
};