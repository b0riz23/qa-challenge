import { test, expect } from "@playwright/test";

test("DELETE / pet/{petId} - Delete Pet", async ({ request }) => {
  const response = await request.post(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id: 24,
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

  const deleteResponse = await request.delete(
    `https://petstore.swagger.io/v2/pet/${petId}`
  );

  expect(deleteResponse.status()).toBe(200);

  const getResponse = await request.get(
    `https://petstore.swagger.io/v2/pet/${petId}`
  );

  expect(getResponse.status()).toBe(404);
});
