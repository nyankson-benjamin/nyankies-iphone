export async function fetchCityData(): Promise<void> {
  const response = await fetch(
    "https://countriesnow.space/api/v0.1/countries/cities",
    {
      method: "POST",
      body: JSON.stringify({
        country: "ghana",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data.data;
}
