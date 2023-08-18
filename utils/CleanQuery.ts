import { ParsedUrlQuery } from 'querystring';
import { useEffect, useRef } from 'react';

export const CleanQuery = (query: {}) => {
  const newQuery = Object.fromEntries(Object.entries(query).filter(([key, value]) => value !== '' && value !== 0));

  return newQuery as ParsedUrlQuery;
};

export function usePrevious(value: any) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
