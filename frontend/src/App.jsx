import { useState, useEffect } from "react";
import axios from "axios";
import RecipeDetailDrawer from "./components/recipedetails";
import Pagination from "./components/pagination";
import backgroundImage from "./assets/images/background.jpg";

const OPERATORS = ["<=", ">=", "<", ">", "="];

function buildQueryParam(value) {
  if (!value) return null;
  const op = OPERATORS.find((op) => value.startsWith(op));
  if (op) {
    return `${op}${value.slice(op.length)}`;
  }
  return value;
}

function App() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filters, setFilters] = useState({
    title: "",
    cuisine: "",
    rating: "",
    total_time: "",
    calories: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  function buildSearchQuery() {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, val]) => {
      if (val.trim() !== "") {
        const paramVal = buildQueryParam(val.trim());
        if (paramVal) params.append(key, paramVal);
      }
    });
    params.append("page", page);
    params.append("limit", limit);
    return params.toString();
  }

  useEffect(() => {
    const query = buildSearchQuery();
    const isFiltering = Object.values(filters).some((f) => f.trim() !== "");
    const url = isFiltering
      ? `http://localhost:8000/api/recipes/search?${query}`
      : `http://localhost:8000/api/recipes?page=${page}&limit=${limit}`;
    axios.get(url).then((res) => {
      setRecipes(res.data.data || []);
      setTotal(res.data.total || 0);
    });
  }, [page, limit, filters]);

  const startEntry = total === 0 ? 0 : (page - 1) * limit + 1;
  const endEntry = Math.min(startEntry + recipes.length - 1, total);

  function handleFilterChange(e, field) {
    setPage(1);
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleRowClick(recipe) {
    if (!recipe.description) {
      alert("This recipe has no description.");
      setSelectedRecipe(null);
      return;
    }
    setSelectedRecipe(recipe);
  }

  return (
    <div
      style={{
        fontFamily: '"Comic Sans MS", cursive',
        backgroundImage: `url(${backgroundImage})`,
      }}
      className="bg-cover min-h-screen w-full bg-bottom bg-no-repeat"
    >
      <div className="bg-white bg-opacity-80 shadow-lg rounded-lg max-w-6xl mx-auto p-6 backdrop-blur-md">
        <h1 className="text-4xl font-bold mb-2 text-black-800">Recipes 🍽️</h1>

        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            Showing entries {startEntry} to {endEntry} of {total}
            {showFilters && (
              <span className="ml-4">
                | Results per page:{" "}
                <select
                  value={limit}
                  onChange={(e) => {
                    setPage(1);
                    setLimit(Number(e.target.value));
                  }}
                  className="border border-gray-300 rounded-md px-2 py-1 ml-2 shadow-sm"
                >
                  {[10, 15, 20, 30, 40, 50].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </span>
            )}
          </p>

          <div>
            <label htmlFor="filterToggle" className="mr-2 font-medium cursor-pointer">
              Filters:
            </label>
            <select
              id="filterToggle"
              value={showFilters ? "on" : "off"}
              onChange={(e) => setShowFilters(e.target.value === "on")}
              className="border border-gray-300 rounded-md px-2 py-1 shadow-sm"
            >
              <option value="off">Off</option>
              <option value="on">On</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table className="table-auto w-full text-left bg-white bg-opacity-70 backdrop-blur-sm border border-gray-300 rounded-md shadow-sm">
            <thead>
              <tr className="bg-orange-300 text-black text-md">
                <th className="px-4 py-3 border border-gray-300">Title</th>
                <th className="px-4 py-3 border border-gray-300">Cuisine</th>
                <th className="px-4 py-3 border border-gray-300">Rating</th>
                <th className="px-4 py-3 border border-gray-300">Total Time</th>
                {showFilters && (
                  <th className="px-4 py-3 border border-gray-300">Calories</th>
                )}
                <th className="px-4 py-3 border border-gray-300">Serves</th>
              </tr>

              {showFilters && (
                <tr className="bg-orange-100">
                  {["title", "cuisine", "rating", "total_time", "calories"].map(
                    (field, index) =>
                      showFilters || field !== "calories" ? (
                        <th key={index} className="px-3 py-2 border border-gray-200">
                          <input
                            type="text"
                            placeholder={`Filter ${field.replace("_", " ")}`}
                            value={filters[field]}
                            onChange={(e) => handleFilterChange(e, field)}
                            className="w-full text-sm border border-gray-300 rounded-md px-2 py-1 shadow focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                          />
                        </th>
                      ) : null
                  )}
                  <th className="border border-gray-200"></th>
                </tr>
              )}
            </thead>

            <tbody>
              {recipes.length === 0 ? (
                <tr>
                  <td
                    colSpan={showFilters ? 6 : 5}
                    className="text-center py-10 text-gray-500 text-lg italic font-medium bg-gray-50 rounded"
                  >
                    🍲{" "}
                    <span className="text-2xl font-semibold text-gray-600">
                      No recipes Found
                    </span>{" "}
                    🍴 Try adjusting your filters or search criteria.
                  </td>
                </tr>
              ) : (
                recipes.map((recipe) => (
                  <tr
                    key={recipe.id}
                    className={`cursor-pointer transition-colors duration-200 ${
                      selectedRecipe?.id === recipe.id
                        ? "bg-orange-100"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => handleRowClick(recipe)}
                  >
                    <td className="px-4 py-3 border border-gray-200 truncate">{recipe.title}</td>
                    <td className="px-4 py-3 border border-gray-200">{recipe.cuisine}</td>
                    <td className="px-4 py-3 border border-gray-200">
                      <div className="flex items-center text-yellow-400">
                        {[1, 2, 3, 4, 5].map((i) => {
                          const full = recipe.rating >= i;
                          const half =
                            recipe.rating >= i - 0.5 && recipe.rating < i;
                          return (
                            <svg
                              key={i}
                              className="w-5 h-5"
                              fill={
                                full
                                  ? "currentColor"
                                  : half
                                  ? "url(#halfGradient)"
                                  : "none"
                              }
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <defs>
                                <linearGradient id="halfGradient">
                                  <stop offset="50%" stopColor="currentColor" />
                                  <stop offset="50%" stopColor="white" />
                                </linearGradient>
                              </defs>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1
                                1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37
                                2.448a1 1 0 00-.364 1.118l1.287
                                3.955c.3.921-.755 1.688-1.54
                                1.118l-3.371-2.448a1 1 0
                                00-1.175 0l-3.37 2.448c-.786.57-1.84-.197-1.54-1.118l1.287-3.955a1
                                1 0 00-.364-1.118L2.98
                                9.382c-.783-.57-.38-1.81.588-1.81h4.162a1
                                1 0 00.95-.69l1.286-3.955z"
                              />
                            </svg>
                          );
                        })}
                        <span className="text-sm text-gray-500 ml-1">
                          ({typeof recipe.rating === "number" ? recipe.rating.toFixed(1) : "N/A"})
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 border border-gray-200">{recipe.total_time}</td>
                    {showFilters && (
                      <td className="px-4 py-3 border border-gray-200">
                        {recipe.nutrients?.calories != null
                          ? recipe.nutrients.calories
                          : "N/A"}
                      </td>
                    )}
                    <td className="px-4 py-3 border border-gray-200">{recipe.serves}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          limit={limit}
          total={total}
          setPage={setPage}
          setLimit={setLimit}
        />

        {selectedRecipe && (
          <RecipeDetailDrawer
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;


