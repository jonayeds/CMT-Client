"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createAssignment = async (data: FieldValues) => {
  const token = (await cookies()).get("accessToken")?.value;
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/assignment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const res = await result.json();
  return res;
};

export const getClassroomAssignments = async (classroomId: string) => {
  const token = (await cookies()).get("accessToken")?.value;
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/assignment/${classroomId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  const res = await result.json();
  return res;
};

export const geASingleAssignment = async (assignmentId: string) => {
  const token = (await cookies()).get("accessToken")?.value;
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/assignment/single-assignment/${assignmentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  const res = await result.json();
  return res;
};

export const getMyAssignmentSubmission = async (assignmentId: string) => {
  const token = (await cookies()).get("accessToken")?.value;
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/submission/my-submission/${assignmentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  const res = await result.json();
  return res;
};

export const submitAssignment = async (data: FieldValues) => {
    const token = (await cookies()).get("accessToken")?.value;
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/submission`,
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        body: JSON.stringify(data),
        }
    );
    const res = await result.json();
    return res;
}

export const getAllAssignmentSubmissions = async (assignmentId: string) => {
    const token = (await cookies()).get("accessToken")?.value;
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/submission/assignment-submissions/${assignmentId}`,
        {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
        next:{
            tags:["evaluate"]
        }
        }
    );
    const res = await result.json();
    return res;
}

export const evaluateAssignment = async (data: FieldValues, submissionId:string) => {
    const token = (await cookies()).get("accessToken")?.value;
    const result = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/submission/evaluate-submission/${submissionId}`,{
        method: "PATCH",    
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        }, 
        body: JSON.stringify(data), 
        })
        revalidateTag("evaluate")
    const res = await result.json();
    return res;
}