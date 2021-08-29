import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const success = () => {
  const {
    query: { session_id },
  } = useRouter();
  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    fetcher
  );
  return (
    <div>
      <h1>Success your order is received</h1>
    </div>
  );
};

export default success;
