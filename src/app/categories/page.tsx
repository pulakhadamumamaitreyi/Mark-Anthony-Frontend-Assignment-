"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";

const categoriesList = [
  {
    id: 1,
    name: "Action",
    color: "bg-red-500",
  },
  {
    id: 2,
    name: "Comedy",
    color: "bg-yellow-500",
  },
  {
    id: 3,
    name: "Drama",
    color: "bg-blue-500",
  },
  {
    id: 4,
    name: "Thriller",
    color: "bg-purple-500",
  },
  {
    id: 5,
    name: "Sports",
    color: "bg-green-500",
  },
  {
    id: 6,
    name: "Music",
    color: "bg-pink-500",
  },
  {
    id: 7,
    name: "Romance",
    color: "bg-rose-500",
  },
  {
    id: 8,
    name: "Documentary",
    color: "bg-cyan-500",
  },
  {
    id: 9,
    name: "Science",
    color: "bg-orange-500",
  },
];

export default function CategoriesPage() {
  const router = useRouter();

  const { user, setCategories } = useUserStore();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser && !user.name) {
      router.push("/register");
    }
  }, [router, user]);

  const handleCategoryClick = (category: string) => {
    setError("");

    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleContinue = () => {
    if (selectedCategories.length < 3) {
      setError("Please select at least 3 categories");
      return;
    }

    setCategories(selectedCategories);

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...parsedUser,
          categories: selectedCategories,
        })
      );
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-3 text-green-400">
          Super App
        </h1>

        <h2 className="text-3xl font-semibold mb-2">
          Choose your entertainment category
        </h2>

        <p className="text-gray-400 mb-8">
          Minimum 3 categories required
        </p>

        {selectedCategories.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-8">
            {selectedCategories.map((item) => (
              <span
                key={item}
                className="bg-green-500 px-4 py-2 rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {categoriesList.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className={`
                ${category.color}
                h-36
                rounded-xl
                cursor-pointer
                p-5
                transition-all
                duration-300
                hover:scale-105
                border-4
                ${
                  selectedCategories.includes(category.name)
                    ? "border-white"
                    : "border-transparent"
                }
              `}
            >
              <h3 className="text-2xl font-bold">
                {category.name}
              </h3>
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-500 mt-6 font-semibold">
            {error}
          </p>
        )}

        <button
          onClick={handleContinue}
          className="mt-8 bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold"
        >
          Continue
        </button>
      </div>
    </main>
  );
}
