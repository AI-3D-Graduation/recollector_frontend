import { RouteObject } from "react-router-dom";
import pages from "../pages/index";

const { Home, Upload, Result, Loading, NotFound } = pages;

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/upload", element: <Upload /> },
  { path: "/loading", element: <Loading /> },
  { path: "/result", element: <Result /> },
  { path: "*", element: <NotFound /> },
];

export default routes;