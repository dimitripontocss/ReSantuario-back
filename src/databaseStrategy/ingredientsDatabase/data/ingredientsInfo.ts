import foodList from "./foodInfo.json";

export async function getIngredientInfo(name: string) {
  const result = foodList.filter((food) => food.name.toString().includes(name));
  if (result.length === 0) {
    return {
      name,
      per100g: {
        kcal: 0,
        protein: 0,
        carbohydrate: 0,
        lipid: 0,
      },
    };
  } else {
    return {
      name: result[0].name,
      per100g: result[0].per100g,
    };
  }
}
