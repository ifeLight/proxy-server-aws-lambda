import { expect } from "chai";
import supertest from "supertest";
import app from "./app";

const requester = supertest(app);

describe("Proxy server", () => {
    it("should successfully visit a url", async () => {
        const response = await requester.get("/");
        expect(response.status).to.be.oneOf([200, 301, 302]);
    });
});
