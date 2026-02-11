import { test } from "../../src/api/api-request-fixture";
import { ProductService } from "../../src/api/services/product.service.js";
import { expect } from "@playwright/test";

test.describe("Products API flow", () => {
    test(
        "Should get list of products",
        { tag: "@api" },
        async ({ apiRequest }) => {
            const productService = new ProductService();
            let res = await productService.getProducts(apiRequest);

            expect(res.length).toBeGreaterThan(0);

            // Write the list of users
            // fileHelper.writeFile(
            //     `${process.cwd()}/data/api-res/list-of-users.json`,
            //     `${JSON.stringify(userData, undefined, 4)}`,
            // );
        },
    );
});

/**
 * POST Call
 * var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://reqres.in/api/users',
  'headers': {
    'x-api-key': 'reqres-free-v1',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": "Alex",
    "job": "Thomas",
    "id": "124",
    "createdAt": "2025-10-06T01:35:49.877Z"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
 */

/**
 * GET Call
 * var request = require('request');
var options = {
  'method': 'GET',✅
  'url': 'https://reqres.in/api/users?page=2', ✅
  'headers': {
    'x-api-key': 'reqres-free-v1'✅
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
 */
