"use client";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import type { Database } from "../types/supabase";

type ExampleRow = Database["public"]["Tables"]["example_table"]["Row"];

export default function ExampleDataFetch() {
  const [data, setData] = useState<ExampleRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Simple query to fetch all rows from example_table
        const { data: exampleData, error } = await supabase
          .from("example_table")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setData(exampleData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Example Data from Supabase</h2>

      {loading && <p className="text-gray-500">Loading data...</p>}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {data && data.length === 0 && (
        <p className="text-gray-500">No data found in example_table.</p>
      )}

      {data && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b text-left">ID</th>
                <th className="px-6 py-3 border-b text-left">Name</th>
                <th className="px-6 py-3 border-b text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">{row.id}</td>
                  <td className="px-6 py-4 border-b">{row.name}</td>
                  <td className="px-6 py-4 border-b">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
