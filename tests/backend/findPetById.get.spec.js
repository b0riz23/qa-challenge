import { test, expect } from "@playwright/test";

test("GET / pet/{petId} - Find Pet by ID", async ({ request }) => {
  const response = await request.post(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id: 22,
      category: {
        id: 0,
        name: "Golden Retriever",
      },
      name: "Rea",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "Yellow",
        },
      ],
      status: "available",
    },
  });

  const responseBody = await response.json();

  const petId = responseBody.id;

  const getResponse = await request.get(
    `https://petstore.swagger.io/v2/pet/${petId}`
  );

  const getResponseBody = await getResponse.json();
  console.log(getResponseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  expect(responseBody.id).toBe(22);
  expect(responseBody.category.name).toBe("Golden Retriever");
  expect(responseBody.tags[0].name).toBe("Yellow");
  expect(responseBody.status).toBe("available");
});
