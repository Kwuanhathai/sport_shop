import { useEffect, useState } from "react";
import axios from 'axios'


const useGetData = (url: string) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getData = async () => {
    try {
      setLoading(true)
      setError(null)
      setData(null)

      const res: any = await axios.get(url)
      const result: any = await res?.data

      setData(result)
      console.log('Data fetched successfully')

    } catch (err: any) {
      setError(err.toString())

    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error }
};


export { useGetData }
