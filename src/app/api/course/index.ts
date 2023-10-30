import SPARKED_PROCESS_CODES from "app/shared/processCodes";
import { BSON } from "mongodb";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { dbClient } from "../lib/db";
import { dbCollections } from "../lib/db/collections";
import { p_fetchCoursesWithMetaData } from "./pipelines";

export default async function fetchCourses_(request: Request) {
  const schema = zfd.formData({
    limit: zfd.numeric(),
    skip: zfd.numeric(),
    withMetaData: z.boolean().optional(),
  });
  const formBody = await request.json();

  const { limit, skip, withMetaData } = schema.parse(formBody);

  try {
    const db = await dbClient();

    if (!db) {
      const response = {
        isError: true,
        code: SPARKED_PROCESS_CODES.DB_CONNECTION_FAILED,
      };
      return new Response(JSON.stringify(response), {
        status: 200,
      });
    }

    let courses = [];

    if (withMetaData) {
      courses = await db
        .collection(dbCollections.courses.name)
        .aggregate(p_fetchCoursesWithMetaData({ query: {} }))
        .toArray();
    } else {
      courses = await db
        .collection(dbCollections.courses.name)
        .find(
          {},
          {
            limit,
            skip,
          }
        )
        .toArray();
    }

    const response = {
      isError: false,
      courses,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    const resp = {
      isError: true,
      code: SPARKED_PROCESS_CODES.UNKOWN_ERROR,
    };

    return new Response(JSON.stringify(resp), {
      status: 200,
    });
  }
}

export async function fetchCourseById_(request: Request) {
  const schema = zfd.formData({
    courseId: zfd.text(),
    withMetaData: z.boolean(),
  });
  const formBody = await request.json();

  const { courseId, withMetaData } = schema.parse(formBody);

  try {
    const db = await dbClient();

    if (!db) {
      const response = {
        isError: true,
        code: SPARKED_PROCESS_CODES.DB_CONNECTION_FAILED,
      };
      return new Response(JSON.stringify(response), {
        status: 200,
      });
    }

    let course;

    if (withMetaData) {
      course = await db
        .collection(dbCollections.courses.name)
        .aggregate(
          p_fetchCoursesWithMetaData({
            query: {
              _id: new BSON.ObjectId(courseId),
            },
          })
        )
        .toArray();

      course = course.length ? course[0] : null;
    } else {
      course = await db
        .collection(dbCollections.courses.name)
        .findOne({ _id: new BSON.ObjectId(courseId) });
    }

    const response = {
      isError: false,
      course,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    const resp = {
      isError: true,
      code: SPARKED_PROCESS_CODES.UNKOWN_ERROR,
    };

    return new Response(JSON.stringify(resp), {
      status: 200,
    });
  }
}

export async function deleteCourse_(request: Request) {
  const schema = zfd.formData({
    courseIds: zfd.repeatableOfType(zfd.text()),
  });
  const formBody = await request.json();

  const { courseIds } = schema.parse(formBody);

  try {
    const db = await dbClient();

    if (!db) {
      const response = {
        isError: true,
        code: SPARKED_PROCESS_CODES.DB_CONNECTION_FAILED,
      };
      return new Response(JSON.stringify(response), {
        status: 200,
      });
    }

    const results = await db
      .collection(dbCollections.courses.name)
      .deleteMany({
        _id: {
          $in: courseIds.map((i) => new BSON.ObjectId(i)),
        },
      });

    const response = {
      isError: false,
      results,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    const resp = {
      isError: true,
      code: SPARKED_PROCESS_CODES.UNKOWN_ERROR,
    };

    return new Response(JSON.stringify(resp), {
      status: 200,
    });
  }
}

export async function findCourseByName_(request: Request) {
  const schema = zfd.formData({
    name: zfd.text(),
    skip: zfd.numeric(),
    limit: zfd.numeric(),
    withMetaData: z.boolean(),
  });
  const formBody = await request.json();

  const { name, limit, skip, withMetaData } = schema.parse(formBody);

  try {
    const db = await dbClient();

    if (!db) {
      const response = {
        isError: true,
        code: SPARKED_PROCESS_CODES.DB_CONNECTION_FAILED,
      };
      return new Response(JSON.stringify(response), {
        status: 200,
      });
    }
    const regexPattern = new RegExp(name, "i");

    let courses = null;

    if (withMetaData) {
      courses = await db
        .collection(dbCollections.courses.name)
        .aggregate(
          p_fetchCoursesWithMetaData({
            query: {
              name: { $regex: regexPattern },
            },
          })
        )
        .toArray();
    } else {
      courses = await db
        .collection(dbCollections.courses.name)
        .find({
          name: { $regex: regexPattern },
        })
        .toArray();
    }

    const response = {
      isError: false,
      courses,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    const resp = {
      isError: true,
      code: SPARKED_PROCESS_CODES.UNKOWN_ERROR,
    };

    return new Response(JSON.stringify(resp), {
      status: 200,
    });
  }
}
