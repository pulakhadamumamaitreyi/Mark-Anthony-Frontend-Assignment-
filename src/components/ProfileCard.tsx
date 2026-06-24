"use client";

import { useEffect, useState } from "react";

interface User {
  name: string;
  username: string;
  email: string;
  mobile: string;
  categories: string[];
}

export default function ProfileCard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="bg-green-600 p-6 rounded-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-green-600 rounded-xl p-6 text-white h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-white rounded-full"></div>

        <div>
          <h2 className="text-2xl font-bold">
            {user.name}
          </h2>

          <p>{user.email}</p>
          <p>{user.mobile}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {user.categories?.map((category) => (
          <span
            key={category}
            className="bg-black px-3 py-1 rounded-full"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
