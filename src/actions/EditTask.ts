"use server";

export async function EditTask(id: string, values: any) {
  try {
    const response = await fetch(`http://localhost:3000/api/task/${id}`, {
      method: 'PUT', 
      headers: {
          'Content-Type': 'application/json', 
      },
      body: JSON.stringify(values), 
    });

    return await response.json();
  } catch (error) {
    console.log(error)
    return null;
  }
}