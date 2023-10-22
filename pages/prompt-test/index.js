"use client";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const API_URL = process.env.API_URL;

export default function Page() {
  const handleSubmit = () => {
    // Call your function with the contents of the input
    yourFunction(inputValue);
  };

  const yourFunction = (inputContent) => {
    // Do something with inputContent
    console.log("User input:", inputContent);
    getGPTSetup(inputContent);
  };

  function getGPTSetup(inputText) {
    // make a post request to the server with the input from the user
    // the server will return the shader
    // setLoadingResponse(true);
    fetch(`${API_URL}/gen-setup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sentence: inputText }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("this is the JSON");
        console.log(data);
      });
  }

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md p-4 bg-white rounded-xl shadow-lg">
        <label
          htmlFor="cinematicScene"
          className="block text-gray-700 text-lg font-bold mb-2"
        >
          What would you like to see in a cinematic scene?
        </label>
        <br />
        <br />
        <input
          type="text"
          id="cinematicScene"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          placeholder="Describe the scene..."
        />
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center w-full px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-700"
        >
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
}
