import { useState, useEffect } from "react";

function RecipeDetailDrawer({ recipe, onClose }) {
  const [expandTime, setExpandTime] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Helper function to safely get value or fallback string
  const getValue = (value) => (value == null || value === "" ? "Have to update" : value);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  function handleClose() {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl p-6 z-50 overflow-y-auto
      transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
      transform will-change-transform will-change-opacity
      ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      style={{ willChange: "transform" }}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="relative group inline-block">
            <h2 className="text-xl font-bold">{getValue(recipe?.title)}</h2>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </div>
          <p className="text-gray-500">{getValue(recipe?.cuisine)}</p>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-600 hover:text-red-500 cursor-pointer"
          aria-label="Close drawer"
        >
          X
        </button>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Description:</p>
        <p>{getValue(recipe?.description)}</p>
      </div>

      <div className="mb-4">
        <p
          className="font-semibold cursor-pointer"
          onClick={() => setExpandTime(!expandTime)}
        >
          Total Time: {getValue(recipe?.total_time)} {expandTime ? "▲" : "▼"}
        </p>
        {expandTime && (
          <div className="ml-4">
            <p>Prep Time: {getValue(recipe?.prep_time)}</p>
            <p>Cook Time: {getValue(recipe?.cook_time)}</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold mb-2">Nutrition</h3>
        <table className="w-full border border-gray-300 text-sm">
          <tbody>
            <tr>
              <td className="border px-2 py-1">Calories</td>
              <td className="border px-2 py-1">{getValue(recipe?.nutrients?.calories)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Carbohydrates</td>
              <td className="border px-2 py-1">{getValue(recipe?.nutrients?.carbohydrateContent)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Cholesterol</td>
              <td className="border px-2 py-1">{getValue(recipe?.nutrients?.cholesterolContent)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Fiber</td>
              <td className="border px-2 py-1">{getValue(recipe?.nutrients?.fiberContent)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Protein</td>
              <td className="border px-2 py-1">{getValue(recipe?.nutrients?.proteinContent)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Saturated Fat</td>
              <td className="border px-2 py-1">{getValue(recipe?.nutrients?.saturatedFatContent)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Sodium</td>
              <td className="border px-2 py-1">{getValue(recipe?.nutrients?.sodiumContent)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Sugar</td>
              <td className="border px-2 py-1">{getValue(recipe?.nutrients?.sugarContent)}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Fat</td>
              <td className="border px-2 py-1">{getValue(recipe?.nutrients?.fatContent)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecipeDetailDrawer;
