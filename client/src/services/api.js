const API_URL = 'https://aiflow-l6fc.vercel.app/api';

export const runFlow = async (inputText) => {
  try {
    // We assume the backend will run on port 5000
    const response = await fetch(`${API_URL}/run-flow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: inputText }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.result; // Expecting { result: "AI Response" } from server
  } catch (error) {
    console.error("API Error:", error);
    return "Error fetching response.";
  }
};

export const saveFlow = async (prompt, result) => {
  try {
    const response = await fetch(`${API_URL}/save-flow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, result }),
    });

    if (!response.ok) throw new Error('Failed to save');
    return await response.json(); // Returns { success: true, id: ... }
  } catch (error) {
    console.error("Save Error:", error);
    return null;
  }
};