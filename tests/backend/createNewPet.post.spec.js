import { test, expect } from "@playwright/test";

test("POST / pet - Create New Pet", async ({ request }) => {
  const response = await request.post(`https://petstore.swagger.io/v2/pet`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      id: 21,
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

  const postResponseBody = await response.json();
  console.log(postResponseBody);

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  expect(postResponseBody.id).toBe(21);
  expect(postResponseBody.category.name).toBe("Golden Retriever");
  expect(postResponseBody.tags[0].name).toBe("Yellow");
  expect(postResponseBody.status).toBe("available");
});
