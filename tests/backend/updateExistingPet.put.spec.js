import { test, expect } from "@playwright/test";

test("PUT / pet - Update an Existing Pet", async ({ request }) => {
  const response = await request.post(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id: 23,
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

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const putResponse = await request.put(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id: 23,
      category: {
        id: 0,
        name: "Golden Retriever Update",
      },
      name: "Rea",
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "Yellow Update",
        },
      ],
      status: "available update",
    },
  });

  const putResponseBody = await putResponse.json();

  expect(putResponse.ok()).toBeTruthy();
  expect(putResponse.status()).toBe(200);
  expect(putResponseBody.id).toBe(23);
  expect(putResponseBody.category.name).toBe("Golden Retriever Update");
  expect(putResponseBody.tags[0].name).toBe("Yellow Update");
  expect(putResponseBody.status).toBe("available update");
});
