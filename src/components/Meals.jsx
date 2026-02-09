import ErrorPage from "./ErrorPage";
import useHttp from "./hooks/useHttp";
import MealItem from "./MealItem";

const requestConfig = {};
const Meals = () => {

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:1000/meals', requestConfig, [])

  if (isLoading) {
    return <p className="center">Fetching meals...</p>
  }

  if(error) {
    return <ErrorPage title='Failed To fetch meals!' message={error} />
  }

  return <ul id="meals">{loadedMeals.map(meal => {
    const mealsData = {
      id: meal.id,
      name: meal.name,
      price: meal.price,
      description: meal.description,
      image: `http://localhost:1000/${meal.image}`,
    }
    return <MealItem key={meal.id} data={mealsData} />
  })}</ul>;
};

export default Meals;
