"use server";
import z from "zod";
import { formDataToObject, parseServerActionResponse } from "./utils";
import { contactFormSchema } from "./validation";
import { checkRateLimit } from "./rateLimiter";
import { prisma } from "./prisma";
import { FromDataType, ServiceStringType } from "@/types/GlobalTypes";
import { Role } from "../../prisma/client";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";

export const writeProjectTickt = async (formObject: FromDataType) => {
    try {
      const isRateLimited = await checkRateLimit("writeProjectTicket");
      if (isRateLimited.status === "ERROR") {
          return isRateLimited;
      }
      const validation = contactFormSchema.parseAsync(formObject);
      if (validation instanceof z.ZodError) {
          const fieldErrors = z.flattenError(validation).fieldErrors as Record<string, string[]>;
          const formattedErrors: Record<string, string> = {};
          Object.keys(fieldErrors).forEach((key) => {
              formattedErrors[key] = fieldErrors[key]?.[0] || "";
          });
          return parseServerActionResponse({
              status: "ERROR",
              error: Object.values(formattedErrors).join(", "),
              data: null,
          });
      }

      const { firstName, lastName, email, phoneNumber, organization, message, service } = formObject;

      // Map display values to Prisma enum types
      const serviceMapping: Record<string, ServiceStringType> = {
        "Web Development": "WEB_DEVELOPMENT",
        "Data Science": "DATA_SCIENCE", 
        "AI Solutions": "AI_SOLUTIONS",
        "Other": "OTHER"
      };

      const mappedService = serviceMapping[service] || "WEB_DEVELOPMENT";

      const result = await prisma.projectTicket.create({
        data: {
            firstName,
            lastName,
            email,
            phoneNumber,
            organization,
            message,
            service: mappedService
        }
      })

      if (!result) {
        return parseServerActionResponse({
            status: "ERROR",
            error: "Failed to create project ticket",
            data: null,
        });
      }

      return parseServerActionResponse({
        status: "SUCCESS",
        error: null,
        data: result,
      });
  } catch (error) {
    console.error(error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "An error occurred while submitting the form",
      data: null,
    });
  }
};



export const createAdminUser = async (data: FormData) => {
    try {
      const isRateLimited = await checkRateLimit("createAdminUser");
      if (isRateLimited.status === "ERROR") {
        return isRateLimited;
      }
  
      const { username, password, role } = Object.fromEntries(data.entries()) as Record<string, string>;
      if (!username || !password || !role) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "All fields are required",
          data: null,
        });
      }
  
      if (password.length < 8) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Password must be at least 8 characters long",
          data: null,
        });
      }
  
      const existingUser = await prisma.authenticatedUser.findUnique({
        where: { username }
      });
  
      if (existingUser) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Username already exists",
          data: null,
        });
      }
  
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      const newAdmin = await prisma.authenticatedUser.create({
        data: {
          username,
          passwordHash: hashedPassword,
          role: role as keyof typeof Role,
        }
      })
  
      if (!newAdmin) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Failed to create admin user",
          data: null,
        });
      }
  
      return parseServerActionResponse({
        status: "SUCCESS",
        error: "",
        data: {
          newAdmin,
        }
      });
  
    } catch (error) {
      console.error("Error creating admin user", error);
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to create admin user",
        data: null,
      });
    }
  }


export const authenticateAdmin = async (data: FormData) => {
    try {
      const isRateLimited = await checkRateLimit("authenticateAdmin");
      if (isRateLimited.status === "ERROR") {
        return isRateLimited;
      }
  
      const { username, password } = Object.fromEntries(data.entries()) as Record<string, string>;
  
      if (!username || !password) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "All fields are required",
          data: null,
        });
      }
  
      const existingUser = await prisma.authenticatedUser.findUnique({
        where: { username, isActive: true },
        select: {
          id: true,
          username: true,
          role: true,
          lastLogin: true,
          passwordHash: true,
        }
      });
  
      if (!existingUser) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Invalid username or password",
          data: null,
        });
      }
  
      const isValidPassword = await bcrypt.compare(password, existingUser.passwordHash);
      if (!isValidPassword) {
        return parseServerActionResponse({
          status: "ERROR",
          error: "Invalid username or password",
          data: null,
        });
      }
  
      const updatedUser = await prisma.authenticatedUser.update({
        where: { id: existingUser.id },
        data: {
          lastLogin: new Date(),
        }
      });
  
      if (isValidPassword) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
        const token = await new SignJWT({ id: existingUser.id })
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('8h')
          .sign(secret);
  
        (await cookies()).set('admin_session', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 8 * 60 * 60, // 8 hours
          path: "/",
        })
      }
  
      return parseServerActionResponse({
        status: "SUCCESS",
        error: "",
        data: {
          id: existingUser.id,
          username: existingUser.username,
          role: existingUser.role,
          lastLogin: existingUser.lastLogin,
        }
      });
    } catch (error) {
      console.error("Error authenticating admin", error);
      return parseServerActionResponse({
        status: "ERROR",
        error: error,
        data: null,
      });
    }
  }


export const fetchDashboardData = async () => {
  try {
    const isRateLimited = await checkRateLimit("fetchDashboardData");
    if (isRateLimited.status === "ERROR") {
      return isRateLimited;
    }

    const projectTickets = await prisma.projectTicket.findMany({
      orderBy: {
        createdAt: 'desc' // Most recent first
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        organization: true,
        message: true,
        service: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!projectTickets) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Failed to fetch dashboard data",
        data: null,
      });
    }

    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      data: {
        projectTickets,
      }
    });

  } catch (error) {
    console.error("Error fetching dashboard data", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to fetch dashboard data",
      data: null,
    });
  }
}

export const updateProjectStatus = async (id: string, status: string) => {
  try {
    const isRateLimited = await checkRateLimit("updateProjectStatus");
    if (isRateLimited.status === "ERROR") {
      return isRateLimited;
    }

    // For now, skip session verification since it's not implemented
    // const verifySession = await verifyAdminSession();
    // if (verifySession.status === "ERROR") {
    //   return verifySession;
    // }

    // Convert frontend status to backend status
    let backendStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "ARCHIVED" | "CANCELLED";
    switch (status) {
      case "UNCONFIRMED":
        backendStatus = "PENDING";
        break;
      case "CONFIRMED":
        backendStatus = "PENDING"; // Keep as PENDING until work starts
        break;
      case "IN_PROGRESS":
        backendStatus = "IN_PROGRESS";
        break;
      case "COMPLETED":
        backendStatus = "COMPLETED";
        break;
      case "CANCELLED":
        backendStatus = "CANCELLED";
        break;
      case "ARCHIVED":
        backendStatus = "ARCHIVED";
        break;
      default:
        backendStatus = "PENDING";
    }

    const projectTicket = await prisma.projectTicket.update({
      where: { id },
      data: {
        status: backendStatus,
      }
    });

    if (!projectTicket) {
      return parseServerActionResponse({
        status: "ERROR",
        error: "Project ticket not found",
        data: null,
      });
    }

    return parseServerActionResponse({
      status: "SUCCESS",
      error: "",
      data: {
        projectTicket,
      }
    });
  } catch (error) {
    console.error("Error updating project status", error);
    return parseServerActionResponse({
      status: "ERROR",
      error: "Failed to update project status",
      data: null,
    });
  }
}