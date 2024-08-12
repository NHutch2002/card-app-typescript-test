import { server } from "../src/server"
import Prisma from "../src/db";


// Testing the get all route
describe("test get all", () => {

  beforeEach(async () => {
    // Clean the database before each test
    await Prisma.entry.deleteMany({});
  });

  it("should return all entries", async () => {

    // Insert a mock entry into the database
    const mockEntry = await Prisma.entry.create({
      data: {
        title: "test",
        description: "test",
        created_at: new Date(),
        scheduled: new Date(),
      },
    });

    const response = await server.inject({
      method: "GET",
      url: "/get/",
    });

    // Parse the Date objects to remove time component
    const responseData = JSON.parse(response.payload).map((entry: any) => ({
      ...entry,
      created_at: entry.created_at.split('T')[0],
      scheduled: entry.scheduled.split('T')[0],
    }));

    // Test for a successful response
    expect(response.statusCode).toEqual(200);

    // Test for the expected response data
    expect(responseData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: mockEntry.title,
          description: mockEntry.description,
          created_at: mockEntry.created_at.toISOString().split('T')[0],
          scheduled: mockEntry.scheduled.toISOString().split('T')[0],
        }),
      ])
    );
  });
});


// Testing the get single entry route
describe("test get single entry", () => {

  beforeEach(async () => {
    // Clean the database before each test
    await Prisma.entry.deleteMany({});
  });

  // Test for a response to getting an entry
  it("should return a single entry", async () => {
    // Mock entry to retrieve from the database
    const mockEntry = await Prisma.entry.create({
      data: {
        id: "1",
        title: "test",
        description: "test",
        created_at: new Date(),
        scheduled: new Date(),
      },
    });

    // Get single mock entry from the database
    const response = await server.inject({
      method: "GET",
      url: `/get/${mockEntry.id}`,
    });

    // Parse the Date objects to remove time component
    const responseData = {
      ...JSON.parse(response.payload),
      created_at: JSON.parse(response.payload).created_at.split('T')[0],
      scheduled: JSON.parse(response.payload).scheduled.split('T')[0],
    };

    // Test for a successful response
    expect(response.statusCode).toEqual(200);

    // Test for the expected response data
    expect(responseData).toEqual(
      expect.objectContaining({
        title: mockEntry.title,
        description: mockEntry.description,
        created_at: mockEntry.created_at.toISOString().split('T')[0],
        scheduled: mockEntry.scheduled.toISOString().split('T')[0],
      })
    );
  });

  // Test for response to getting non-existent entry
  it("should return an error for a non-existent entry", async () => {
    // Get a non-existent entry from the database
    const response = await server.inject({
      method: "GET",
      url: "/get/2",
    });

    // Test for an unsuccessful response
    expect(response.statusCode).toEqual(500);

    // Test for the expected response data
    expect(JSON.parse(response.payload)).toEqual(
      expect.objectContaining({
        msg: "Error finding entry with id 2",
      })
    );
  });
});


// Testing the post new entry route
describe("test post object", () => {

  beforeEach(async () => {
    // Clean the database before each test
    await Prisma.entry.deleteMany({});
  });

  // Test for response to posting a new entry
  it("should create a new entry", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: {
        title: "test",
        description: "test",
        created_at: new Date().toISOString(),
        scheduled: new Date().toISOString(),
      },
    });

    // Parse the Date objects to remove time component
    const responseData = {
      ...JSON.parse(response.payload),
      created_at: JSON.parse(response.payload).created_at.split('T')[0],
      scheduled: JSON.parse(response.payload).scheduled.split('T')[0],
    };

    // Test for a successful response
    expect(response.statusCode).toEqual(200);

    // Test for the expected response data
    expect(responseData).toEqual(
      expect.objectContaining({
        title: "test",
        description: "test",
        created_at: new Date().toISOString().split('T')[0],
        scheduled: new Date().toISOString().split('T')[0],
      })
    );
  });

  // Test for response to posting a faulty entry
  it("should return an error for a faulty entry", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: {
        title: "test",
        description: "test",
        created_at: "wrong format",
        scheduled: "wrong format",
      },
    });

    // Test for an unsuccessful response
    expect(response.statusCode).toEqual(500);

    // Test for the expected response data
    expect(JSON.parse(response.payload)).toEqual(
      expect.objectContaining({
        msg: "Error creating entry",
      })
    );
  });

  // Test for response to posting an entry with missing required fields
  it("should return an error for an entry with missing fields", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/create/",
      payload: {
        title: "test"
      },
    });

    // Test for an unsuccessful response
    expect(response.statusCode).toEqual(500);

    // Test for the expected response data
    expect(JSON.parse(response.payload)).toEqual(
      expect.objectContaining({
        msg: "Error creating entry",
      })
    );
  });
});


// Testing the delete entry route
describe("test delete object", () => {

  beforeEach(async () => {
    // Clean the database before each test
    await Prisma.entry.deleteMany({});
  });

  // Test for response to deleting an entry
  it("should delete a specific entry", async () => {
    // Mock entry to delete from the database
    const mockEntry = await Prisma.entry.create({
      data: {
        id: "1",
        title: "test",
        description: "test",
        created_at: new Date(),
        scheduled: new Date(),
      },
    });

    const response = await server.inject({
      method: "DELETE",
      url: `/delete/${mockEntry.id}`,
    });

    // Test for a successful response
    expect(response.statusCode).toEqual(200);

    // Test for the expected response data
    expect(JSON.parse(response.payload)).toEqual(
      expect.objectContaining({
        msg: "Deleted successfully",
      })
    );
  });

  // Test for response to deleting a non-existent entry
  it("should return an error for a non-existent entry", async () => {
    // Delete a non-existent entry from the database
    const response = await server.inject({
      method: "DELETE",
      url: "/delete/2",
    });

    // Test for an unsuccessful response
    expect(response.statusCode).toEqual(500);

    // Test for the expected response data
    expect(JSON.parse(response.payload)).toEqual(
      expect.objectContaining({
        msg: "Error deleting entry",
      })
    );
  });
});


// Testing the update entry route
describe("test update object", () => {

  beforeEach(async () => {
    // Clean the database before each test
    await Prisma.entry.deleteMany({});
  });

  // Test for response to updating an entry
  it("should update a specific entry", async () => {
    // Mock entry to update in the database
    const mockEntry = await Prisma.entry.create({
      data: {
        id: "1",
        title: "test",
        description: "test",
        created_at: new Date(),
        scheduled: new Date(),
      },
    });

    const update = await server.inject({
      method: "PUT",
      url: `/update/${mockEntry.id}`,
      payload: {
        title: "updated",
        description: "updated",
        created_at: new Date().toISOString(),
        scheduled: new Date().toISOString(),
      },
    });

    // Get the updated entry from the database
    const UpdatedEntry = await Prisma.entry.findUnique({
      where: { id: mockEntry.id },
    });
    

    // Parse the Date objects to remove time component
    const ParsedUpdatedEntry = {
      ...UpdatedEntry,
      created_at: UpdatedEntry!.created_at.toISOString().split('T')[0],
      scheduled: UpdatedEntry!.scheduled.toISOString().split('T')[0],
    };

    // Test for a successful response
    expect(update.statusCode).toEqual(200);

    // Test for the expected response data
    expect(ParsedUpdatedEntry).toEqual(
      expect.objectContaining({
        title: "updated",
        description: "updated",
        created_at: new Date().toISOString().split('T')[0],
        scheduled: new Date().toISOString().split('T')[0],
      })
    );
  });

  // Test for response to updating a non-existent entry
  it("should return an error for a non-existent entry", async () => {
    // Update a non-existent entry in the database
    const response = await server.inject({
      method: "PUT",
      url: "/update/2",
      payload: {
        title: "updated",
        description: "updated",
        created_at: new Date().toISOString(),
        scheduled: new Date().toISOString(),
      },
    });

    // Test for an unsuccessful response
    expect(response.statusCode).toEqual(500);

    // Test for the expected response data
    expect(JSON.parse(response.payload)).toEqual(
      expect.objectContaining({
        msg: "Error updating",
      })
    );
  });

  // Test for response to updating an entry with faulty fields
  it("should return an error for an entry with faulty fields", async () => {

    // Mock entry to update in the database
    const mockEntry = await Prisma.entry.create({
      data: {
        id: "1",
        title: "test",
        description: "test",
        created_at: new Date(),
        scheduled: new Date(),
      },
    });

    const response = await server.inject({
      method: "PUT",
      url: `/update/${mockEntry.id}`,
      payload: {
        title: "test",
        description: "test",
        created_at: "wrong format",
        scheduled: "wrong format",
      },
    });

    // Test for an unsuccessful response
    expect(response.statusCode).toEqual(500);

    // Test for the expected response data
    expect(JSON.parse(response.payload)).toEqual(
      expect.objectContaining({
        msg: "Error updating",
      })
    );
  });
});