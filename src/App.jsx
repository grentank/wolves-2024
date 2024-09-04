import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import NotesPage from "./components/pages/NotesPage";
import NoteInfoPage from "./components/pages/NoteInfoPage";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <MainPage />,
        },
        {
          path: "/notes",
          element: <NotesPage />,
        },
        {
          path: "/notes/:noteId",
          element: <NoteInfoPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
