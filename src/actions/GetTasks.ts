"use server";

export async function GetTasks() {
  try {
    const response = await fetch(`http://localhost:3000/api/task`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    return await response.json();
  } catch (error) {
    console.log(error)
    return null;
  }
}