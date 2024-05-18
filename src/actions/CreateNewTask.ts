"use server";

export async function CreateNewTask(values: any) {
  try {
    const response = await fetch('http://localhost:3000/api/task', {
      method: 'POST', 
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