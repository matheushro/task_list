"use server";

export async function DeleteTask(id: string) {
  try {
    const response = await fetch(`http://localhost:3000/api/task/${id}`, {
      method: 'DELETE',
      cache: 'no-store'
    });

    return await response.json();
  } catch (error) {
    console.log(error)
    return null;
  }
}