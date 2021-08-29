import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const success = () => {
  const {
    query: { session_id },
  } = useRouter();
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    () => `api/checkout_sessions/${session_id}`,
    fetcher
  );
  useEffect(() => {
    console.log('successfull');
  }, [data]);
  return (
    <div>
      <h1>Success your order is received</h1>
    </div>
  );
};

export default success;
